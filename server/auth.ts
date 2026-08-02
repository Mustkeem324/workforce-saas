import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface AuthenticatedUser {
  userId: string;
  tenantId: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ORG_ADMIN' | 'HR_MANAGER' | 'PAYROLL_MANAGER' | 'EMPLOYEE';
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET;

if (NODE_ENV === 'production' && (!JWT_SECRET || JWT_SECRET.length < 32)) {
  console.error('FATAL_SECURITY_ERROR: JWT_SECRET environment variable must be explicitly defined and at least 32 characters long in production mode.');
  process.exit(1);
}

const EFFECTIVE_JWT_SECRET = JWT_SECRET || 'dev-secret-key-must-be-at-least-32-chars-long-9481!';

/**
 * Secure Scrypt Password Hashing
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
}

/**
 * JWT Access Token Generation & Verification
 */
export function generateAccessToken(payload: AuthenticatedUser): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url');
  const signature = crypto.createHmac('sha256', EFFECTIVE_JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyAccessToken(token: string): AuthenticatedUser | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', EFFECTIVE_JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expectedSignature) return null;

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

  return {
    userId: payload.userId,
    tenantId: payload.tenantId,
    email: payload.email,
    name: payload.name,
    role: payload.role
  };
}

/**
 * Public Unauthenticated Routes Allowlist
 */
const PUBLIC_ROUTES = [
  '/api/health',
  '/metrics',
  '/api/v1/auth/login',
  '/api/v1/auth/signup',
  '/api/v1/auth/forgot-password'
];

/**
 * Strict Session Middleware (NO AUTHENTICATION BYPASS FALLBACK)
 * Derives Tenant Scope strictly from verified JWT token.
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Allow unauthenticated access to public routes
  if (PUBLIC_ROUTES.includes(req.path)) {
    next();
    return;
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    res.status(401).json({
      status: 'error',
      code: 401,
      reasonCode: 'AUTHENTICATION_REQUIRED',
      message: 'Access denied. Valid Bearer authentication token is required.'
    });
    return;
  }

  const verified = verifyAccessToken(token);
  if (!verified) {
    res.status(401).json({
      status: 'error',
      code: 401,
      reasonCode: 'INVALID_TOKEN',
      message: 'Access denied. Invalid or expired session token.'
    });
    return;
  }

  // Derive tenant identity strictly from authenticated JWT token payload (never unauthenticated X-Tenant-ID header)
  (req as any).user = verified;
  (req as any).tenantId = verified.tenantId;
  next();
}
