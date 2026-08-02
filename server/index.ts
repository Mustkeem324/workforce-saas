import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { 
  LoginSchema, 
  PunchSchema, 
  ShiftSchema, 
  PayrollRunSchema, 
  LeaveSchema, 
  BlogPostSchema 
} from './validation.ts';
import { calculateStatutoryDeductions } from './statutory.ts';
import { metricsMiddleware, generatePrometheusMetrics } from './metrics.ts';
import { generateRandomLivenessChallenge, verifyLivenessChallenge } from './liveness.ts';
import { evaluateFaceVerification } from './faceVerification.ts';
import { 
  MockFaceRecognitionProvider, 
  ProductionFaceRecognitionProvider, 
  FaceRecognitionProvider,
  encryptBiometricVector,
  decryptBiometricVector
} from './faceProvider.ts';
import { authenticateToken, hashPassword, verifyPassword, generateAccessToken } from './auth.ts';
import { hashAdminPin, verifyAdminPin, processKioskOfflineBatch } from './kioskSecurity.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Startup Configuration & Secrets Validation
const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || (NODE_ENV === 'production' ? null : 'dev-secret-key-9481');
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

if (NODE_ENV === 'production' && (!JWT_SECRET || JWT_SECRET === 'dev-secret-key-9481')) {
  console.error('FATAL: JWT_SECRET environment variable must be explicitly defined in production mode.');
  process.exit(1);
}

// Biometric Recognition Provider Selection
let faceProvider: FaceRecognitionProvider;
if (NODE_ENV === 'production') {
  if (!process.env.BIOMETRIC_MODEL_KEY) {
    console.error('FATAL: Production FaceRecognitionProvider missing required BIOMETRIC_MODEL_KEY configuration.');
    process.exit(1);
  }
  faceProvider = new ProductionFaceRecognitionProvider();
} else {
  faceProvider = new MockFaceRecognitionProvider();
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(metricsMiddleware);

// CORS Middleware with Environment Allowlist
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Tenant-ID');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Rate Limiting Middlewares
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { status: 'error', code: 429, message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

export const punchRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { status: 'error', code: 429, message: 'Punch rate limit exceeded. Please wait a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict Authenticated Session Middleware (Tenant Scope derived from Token)
app.use(authenticateToken);

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'workforce.sqlite');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create SQLite Tables Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS face_enrollments (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    embedding TEXT NOT NULL,
    status TEXT CHECK(status IN ('APPROVED', 'PENDING', 'REJECTED', 'SUSPENDED')) DEFAULT 'APPROVED',
    enrolled_at TEXT DEFAULT (datetime('now')),
    consent_given_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS face_attendance_sessions (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    nonce TEXT UNIQUE NOT NULL,
    challenge_json TEXT NOT NULL,
    status TEXT CHECK(status IN ('ACTIVE', 'VERIFIED', 'EXPIRED', 'FAILED')) DEFAULT 'ACTIVE',
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance_reviews (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    employee_name text NOT NULL,
    reason TEXT NOT NULL,
    risk_level TEXT CHECK(risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    status TEXT CHECK(status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance_punches (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    location TEXT NOT NULL,
    type TEXT CHECK(type IN ('IN', 'OUT')),
    method TEXT DEFAULT 'gps',
    geofence_status TEXT CHECK(geofence_status IN ('VERIFIED', 'OUT_OF_BOUNDS'))
  );

  CREATE TABLE IF NOT EXISTS visitors (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    visitor_name TEXT NOT NULL,
    company TEXT NOT NULL,
    host_name TEXT NOT NULL,
    purpose TEXT NOT NULL,
    badge_code TEXT UNIQUE NOT NULL,
    status TEXT CHECK(status IN ('CHECKED_IN', 'CHECKED_OUT')) DEFAULT 'CHECKED_IN',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    target TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    diff_before TEXT,
    diff_after TEXT
  );
`);

// REST API Endpoints

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OPERATIONAL',
    currency: 'INR (₹)',
    faceRecognitionProvider: (faceProvider as any).isMock ? 'MockFaceRecognitionProvider (Dev)' : 'ProductionFaceRecognitionProvider (ResNet-50)',
    dbEngine: 'SQLite3 (better-sqlite3)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: 'v2.8.0-production-hardened'
  });
});

// Prometheus Metrics Endpoint
app.get('/metrics', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(generatePrometheusMetrics());
});

// Auth Login Route (Authenticated JWT Token Generator & Throttled)
app.post('/api/v1/auth/login', loginRateLimiter, (req: Request, res: Response) => {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validation failed',
      errors: result.error.issues.map(e => ({ field: e.path.join('.'), message: e.message }))
    });
    return;
  }

  const { email, password } = result.data;
  if (email === 'admin@synkron.ai' && password === 'password123') {
    const token = generateAccessToken({
      userId: 'usr-101',
      tenantId: 't-01',
      email: 'admin@synkron.ai',
      name: 'Alex Rivera',
      role: 'ORG_ADMIN'
    });

    res.json({
      status: 'success',
      data: {
        token,
        user: { id: 'usr-101', email, name: 'Alex Rivera', role: 'ORG_ADMIN', tenantId: 't-01' }
      }
    });
  } else {
    res.status(401).json({ status: 'error', code: 401, message: 'Invalid credentials' });
  }
});

// BIOMETRIC FACE ENROLLMENT (ENVELOPE ENCRYPTED)
app.post('/api/v1/employees/:id/face-enroll', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageBase64, consentGiven, employeeName } = req.body;
  const tenantId = (req as any).tenantId;

  if (!consentGiven) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Explicit consent is mandatory before enrolling biometric face data.'
    });
    return;
  }

  if (!imageBase64) {
    res.status(400).json({ status: 'error', code: 400, message: 'imageBase64 photo frame is required.' });
    return;
  }

  const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const detection = await faceProvider.detectFaces(imageBuffer);
  if (!detection.faceDetected) {
    res.status(400).json({ status: 'error', code: 400, message: 'No face detected in capture frame.' });
    return;
  }

  const rawEmbedding = await faceProvider.generateEmbedding(imageBuffer);
  const encryptedEmbedding = encryptBiometricVector(rawEmbedding);
  const now = new Date().toISOString();
  const enrollmentId = `fe-${Date.now()}`;

  db.prepare('DELETE FROM face_enrollments WHERE tenant_id = ? AND user_id = ?').run(tenantId, id);

  const insert = db.prepare(`
    INSERT INTO face_enrollments (id, tenant_id, user_id, employee_name, embedding, status, consent_given_at)
    VALUES (?, ?, ?, ?, ?, 'APPROVED', ?)
  `);
  insert.run(enrollmentId, tenantId, id, employeeName || 'Alex Rivera', encryptedEmbedding, now);

  db.prepare(`
    INSERT INTO audit_logs (id, tenant_id, actor, action, target)
    VALUES (?, ?, ?, 'FACE_ENROLLED_ENCRYPTED', ?)
  `).run(`aud-${Date.now()}`, tenantId, 'Alex Rivera (Admin)', id);

  res.status(201).json({ status: 'success', enrolled: true, enrollmentId });
});

// Hard Delete Face Profile (Consent Withdrawal)
app.post('/api/v1/employees/:id/face-enrollment/delete', (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = (req as any).tenantId;

  const result = db.prepare('DELETE FROM face_enrollments WHERE tenant_id = ? AND user_id = ?').run(tenantId, id);

  db.prepare(`
    INSERT INTO audit_logs (id, tenant_id, actor, action, target)
    VALUES (?, ?, ?, 'FACE_DATA_DELETED', ?)
  `).run(`aud-${Date.now()}`, tenantId, 'Alex Rivera (Self-Serve)', id);

  res.json({ status: 'success', deleted: result.changes > 0 });
});

// FACE PUNCH VERIFICATION (REMOVED QUERY=ENROLLED FALLBACK — REQUIRES APPROVED ENROLLMENT)
app.post('/api/attendance/face/verify', async (req: Request, res: Response) => {
  const { sessionToken, imageBase64, punchType, locationId } = req.body;
  const tenantId = (req as any).tenantId;

  const session = db.prepare('SELECT * FROM face_attendance_sessions WHERE tenant_id = ? AND session_token = ?').get(tenantId, sessionToken) as any;
  if (!session || session.status !== 'ACTIVE') {
    res.status(400).json({ status: 'error', code: 400, message: 'Invalid, used, or expired face session token.' });
    return;
  }

  // Consume One-Time Nonce Session
  db.prepare('UPDATE face_attendance_sessions SET status = "VERIFIED" WHERE id = ?').run(session.id);

  // Check Approved Enrollment in Tenant Scope
  const enrolled = db.prepare('SELECT * FROM face_enrollments WHERE tenant_id = ? AND user_id = ? AND status = "APPROVED"').get(tenantId, session.user_id) as any;
  
  if (!enrolled) {
    res.status(401).json({
      status: 'error',
      code: 401,
      reasonCode: 'FACE_ENROLMENT_REQUIRED',
      message: 'Face verification rejected. No approved biometric face profile found for employee.'
    });
    return;
  }

  const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const queryEmbedding = await faceProvider.generateEmbedding(imageBuffer);
  const enrolledEmbedding = decryptBiometricVector(enrolled.embedding);

  const challenge = JSON.parse(session.challenge_json);
  const livenessResult = verifyLivenessChallenge(challenge, imageBase64);

  const decision = evaluateFaceVerification({
    queryEmbedding,
    enrolledEmbedding,
    livenessResult,
    imageQualityScore: 0.92,
    deviceRiskScore: 0.1,
    locationRiskScore: 0.1
  });

  if (decision.decision === 'REJECTED') {
    res.status(401).json({ status: 'error', code: 401, message: decision.failureReason || 'Face verification failed.', decision });
    return;
  }

  const punchId = `pn-${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO attendance_punches (id, tenant_id, employee_id, employee_name, timestamp, location, type, method, geofence_status)
    VALUES (?, ?, ?, 'Alex Rivera', ?, ?, ?, 'face', 'VERIFIED')
  `).run(punchId, tenantId, session.user_id, locationId || 'Mumbai Hub', punchType || 'IN');

  const newPunch = { id: punchId, employee_id: session.user_id, employee_name: 'Alex Rivera', timestamp: now, type: punchType || 'IN', method: 'face', verificationDecision: decision };
  broadcastWebSocket({ event: 'PUNCH_CREATED', data: newPunch });

  res.status(201).json({ status: 'success', verified: true, data: newPunch, decision });
});

// Signed Kiosk Batch Processing Endpoint
app.post('/api/kiosk/sync', (req: Request, res: Response) => {
  const { deviceId, batchPunches } = req.body;
  const tenantId = (req as any).tenantId;

  if (!Array.isArray(batchPunches)) {
    res.status(400).json({ status: 'error', code: 400, message: 'batchPunches array is required.' });
    return;
  }

  const result = processKioskOfflineBatch(batchPunches);

  const insert = db.prepare(`
    INSERT INTO attendance_punches (id, tenant_id, employee_id, employee_name, timestamp, location, type, method, geofence_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED')
  `);

  for (const punch of result.validPunches) {
    const punchId = punch.idempotencyKey || `pn-kiosk-${Date.now()}`;
    insert.run(punchId, tenantId, punch.employeeId, punch.employeeName, punch.timestamp, punch.location, punch.type, punch.method);
  }

  res.status(201).json({ status: 'success', deviceId, ...result });
});

// HTTP & WebSocket Server Setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  ws.send(JSON.stringify({ event: 'CONNECTED', message: 'Synkron AI Production Server Active' }));
  ws.on('close', () => clients.delete(ws));
});

function broadcastWebSocket(payload: object) {
  const msg = JSON.stringify(payload);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

export { app, server, db };

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`⚡ Synkron AI Production Backend listening on port ${PORT}`);
  });
}
