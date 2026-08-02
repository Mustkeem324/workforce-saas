import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Tenant-ID');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

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

  CREATE TABLE IF NOT EXISTS attendance_punches (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    location TEXT NOT NULL,
    type TEXT CHECK(type IN ('IN', 'OUT')),
    geofence_status TEXT CHECK(geofence_status IN ('VERIFIED', 'OUT_OF_BOUNDS'))
  );

  CREATE TABLE IF NOT EXISTS shifts (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    day_index INTEGER NOT NULL,
    shift_type TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    hours REAL NOT NULL,
    has_conflict INTEGER DEFAULT 0,
    conflict_reason TEXT
  );

  CREATE TABLE IF NOT EXISTS payroll_runs (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    disbursal_id TEXT NOT NULL,
    total_gross REAL NOT NULL,
    total_net REAL NOT NULL,
    total_deductions REAL NOT NULL,
    employee_count INTEGER NOT NULL,
    currency TEXT DEFAULT 'INR',
    cycle TEXT NOT NULL,
    ai_anomalies_count INTEGER DEFAULT 0,
    disbursal_status TEXT CHECK(disbursal_status IN ('DRAFT', 'VALIDATED', 'FINALIZED')),
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

  CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT CHECK(status IN ('Published', 'Draft')),
    author TEXT NOT NULL,
    published_at TEXT NOT NULL
  );
`);

// Seed SQLite Initial Data if Empty
const seedTenant = db.prepare('SELECT count(*) as count FROM tenants').get() as { count: number };
if (seedTenant.count === 0) {
  db.exec(`
    INSERT INTO tenants (id, name, slug) VALUES ('t-01', 'Apex Logistics Fleet India', 'apex-logistics-india');

    INSERT INTO attendance_punches (id, tenant_id, employee_id, employee_name, timestamp, location, type, geofence_status) VALUES
    ('pn-1', 't-01', 'emp-101', 'Alex Rivera', datetime('now'), 'Mumbai Logistics Hub', 'IN', 'VERIFIED'),
    ('pn-2', 't-01', 'emp-102', 'Jordan Chen', datetime('now'), 'Mumbai Logistics Hub', 'IN', 'VERIFIED');

    INSERT INTO payroll_runs (id, tenant_id, disbursal_id, total_gross, total_net, total_deductions, employee_count, currency, cycle, ai_anomalies_count, disbursal_status) VALUES
    ('pay-1', 't-01', 'PAY-2026-0802-9481', 178420.50, 142736.40, 35684.10, 184, 'INR', 'July 20 - August 02, 2026', 0, 'FINALIZED');

    INSERT INTO audit_logs (id, tenant_id, actor, action, target, diff_before, diff_after) VALUES
    ('aud-1', 't-01', 'Alex Rivera (Admin)', 'PAYROLL_FINALIZED', 'PAY-2026-0802-9481', '{"status":"DRAFT"}', '{"status":"FINALIZED"}');

    INSERT INTO blog_posts (id, title, slug, category, summary, content, status, author, published_at) VALUES
    ('post-1', 'Building an AI-Native Workforce SaaS for India Enterprise', 'ai-native-workforce-saas-architecture', 'Workforce Management', 'A deep dive into designing a zero-lag attendance and payroll platform for multi-location enterprises in India.', 'Full retrospective blueprint detailing design-first constraints, guarded payroll flows, and offline-first IndexedDB sync.', 'Published', 'Alex Rivera (VP Engineering)', '2026-08-02'),
    ('post-2', 'Why We Enforced Tabular Numerics for Payroll UI', 'tabular-numerics-payroll-design', 'Engineering', 'Preventing number jiggling in high-stakes financial tables using JetBrains Mono and font-variant-numeric.', 'Detailed font discipline guidelines for monetary values, hourly rates, and payroll ledgers.', 'Published', 'Sarah Chen (Lead Product Designer)', '2026-07-28');
  `);
}

// REST API Endpoints backed by SQLite

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OPERATIONAL',
    currency: 'INR (₹)',
    dbEngine: 'SQLite3 (better-sqlite3)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: 'v2.8.0-enterprise-inr'
  });
});

// Attendance API
app.get('/api/v1/attendance/punches', (req: Request, res: Response) => {
  const punches = db.prepare('SELECT * FROM attendance_punches ORDER BY timestamp DESC').all();
  res.json({ status: 'success', count: punches.length, data: punches });
});

app.post('/api/v1/attendance/punch', (req: Request, res: Response) => {
  const { employeeId, employeeName, location, type } = req.body;
  const punchId = `pn-${Date.now()}`;
  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT INTO attendance_punches (id, tenant_id, employee_id, employee_name, timestamp, location, type, geofence_status)
    VALUES (?, 't-01', ?, ?, ?, ?, ?, 'VERIFIED')
  `);
  insert.run(punchId, employeeId || 'emp-9481', employeeName || 'Alex Rivera', now, location || 'Mumbai Logistics Hub', type || 'IN');

  const newPunch = { id: punchId, tenant_id: 't-01', employee_id: employeeId || 'emp-9481', employee_name: employeeName || 'Alex Rivera', timestamp: now, location: location || 'Mumbai Logistics Hub', type: type || 'IN', geofence_status: 'VERIFIED' };

  broadcastWebSocket({ event: 'PUNCH_CREATED', data: newPunch });

  res.status(201).json({ status: 'success', data: newPunch });
});

// Payroll Disbursal API
app.get('/api/v1/payroll/runs/latest', (req: Request, res: Response) => {
  const latestRun = db.prepare('SELECT * FROM payroll_runs ORDER BY created_at DESC LIMIT 1').get();
  res.json({ status: 'success', data: latestRun });
});

// Audit Trail API
app.get('/api/v1/audit/logs', (req: Request, res: Response) => {
  const logs = db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC').all();
  res.json({ status: 'success', count: logs.length, data: logs });
});

// Blog & CMS Admin API
app.get('/api/v1/blog/posts', (req: Request, res: Response) => {
  const posts = db.prepare('SELECT * FROM blog_posts ORDER BY published_at DESC').all();
  res.json({ status: 'success', count: posts.length, data: posts });
});

app.post('/api/v1/blog/posts', (req: Request, res: Response) => {
  const { title, category, summary, content, status, author } = req.body;
  const postId = `post-${Date.now()}`;
  const slug = (title || 'new-article').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const publishedAt = new Date().toISOString().split('T')[0];

  const insert = db.prepare(`
    INSERT INTO blog_posts (id, title, slug, category, summary, content, status, author, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(postId, title || 'New Article', slug, category || 'Workforce Management', summary || 'Article summary.', content || 'Article content body.', status || 'Draft', author || 'Editorial Team', publishedAt);

  const newPost = { id: postId, title, slug, category, summary, content, status, author, published_at: publishedAt };
  res.status(201).json({ status: 'success', data: newPost });
});

// HTTP & WebSocket Server Setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  ws.send(JSON.stringify({ event: 'CONNECTED', message: 'Workforce SQLite Realtime Engine Active (INR Currency)' }));

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

server.listen(PORT, () => {
  console.log(`⚡ Workforce SaaS Enterprise SQLite Backend listening on port ${PORT} (INR ₹ Edition)`);
});
