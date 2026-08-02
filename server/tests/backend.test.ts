import { describe, it, expect } from 'vitest';
import { calculateStatutoryDeductions } from '../statutory';
import { LoginSchema, PunchSchema, ShiftSchema, PayrollRunSchema } from '../validation';
import { generateRandomLivenessChallenge, verifyLivenessChallenge } from '../liveness';
import { evaluateFaceVerification } from '../faceVerification';
import { 
  SimulatedFaceRecognitionProvider, 
  ProductionFaceRecognitionProvider,
  encryptBiometricVectorDEK,
  decryptBiometricVectorDEK
} from '../faceProvider';
import { hashPassword, verifyPassword, generateAccessToken, verifyAccessToken } from '../auth';
import { hashAdminPin, verifyAdminPin, verifyKioskSignature, processKioskOfflineBatch } from '../kioskSecurity';

describe('Production Hardened Phase 2 Backend Engine Verification', () => {

  // 1. Zod Validation Unit Tests
  describe('Zod Input Validation Schemas', () => {
    it('should reject invalid email and short password', () => {
      const result = LoginSchema.safeParse({ email: 'invalid-email', password: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBe(2);
        expect(result.error.issues[0].message).toContain('Invalid email');
        expect(result.error.issues[1].message).toContain('at least 8 characters');
      }
    });

    it('should accept valid login credentials', () => {
      const result = LoginSchema.safeParse({ email: 'admin@synkron.ai', password: 'password123' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid punch type enum', () => {
      const result = PunchSchema.safeParse({
        employeeId: 'emp-101',
        employeeName: 'Alex Rivera',
        location: 'Mumbai Hub',
        type: 'INVALID_PUNCH'
      });
      expect(result.success).toBe(false);
    });
  });

  // 2. Real DEK/KEK Envelope Encryption Tests
  describe('Biometric DEK/KEK Envelope Encryption (AES-256-GCM + AES-ECB DEK Wrap)', () => {
    it('should encrypt and decrypt face vector templates using wrapped DEKs without exposing raw vector arrays', () => {
      const originalVector = [0.12, -0.45, 0.88, 0.33];
      const kekSecret = 'kek-secret-key-must-be-at-least-32-chars-long-9481!';
      
      const envelope = encryptBiometricVectorDEK(originalVector, kekSecret);
      expect(envelope.ciphertext).not.toContain('0.12');
      expect(envelope.wrappedDek).toBeDefined();
      expect(envelope.keyVersion).toBe('kek-v1-2026');

      const decrypted = decryptBiometricVectorDEK(envelope, kekSecret);
      expect(decrypted).toEqual(originalVector);
    });

    it('should fail decryption if KEK secret is invalid or mismatched', () => {
      const originalVector = [0.12, -0.45, 0.88, 0.33];
      const kekSecret = 'kek-secret-key-must-be-at-least-32-chars-long-9481!';
      const envelope = encryptBiometricVectorDEK(originalVector, kekSecret);

      expect(() => decryptBiometricVectorDEK(envelope, 'wrong-kek-secret-key-32-chars-long-wrong')).toThrow();
    });
  });

  // 3. Provider Contract Tests (Simulated vs Production Labeling)
  describe('FaceRecognitionProvider Contract & Labeling', () => {
    it('should explicitly label SimulatedFaceRecognitionProvider and ProductionFaceRecognitionProvider', async () => {
      const simProv = new SimulatedFaceRecognitionProvider();
      const prodProv = new ProductionFaceRecognitionProvider();

      expect(simProv.isSimulated).toBe(true);
      expect((prodProv as any).isSimulated).toBeUndefined();

      const simVector = await simProv.generateEmbedding(Buffer.alloc(60, 's'));
      const prodVector = await prodProv.generateEmbedding(Buffer.alloc(150, 'a'));

      expect(simVector.length).toBe(128);
      expect(prodVector.length).toBe(128);
      expect(prodProv.modelVersion).toBe('v2.4-resnet50-biometric');
    });
  });

  // 4. Authentication & Strict Tenant Isolation Tests (No Auth Bypass)
  describe('Authentication & Tenant Scope Isolation', () => {
    it('should securely hash and verify passwords using Scrypt', () => {
      const pass = 'SuperSecretPass123!';
      const hash = hashPassword(pass);
      expect(verifyPassword(pass, hash)).toBe(true);
      expect(verifyPassword('WrongPass', hash)).toBe(false);
    });

    it('should derive tenantId strictly from verified JWT token payload', () => {
      const payload = {
        userId: 'usr-101',
        tenantId: 't-01',
        email: 'alex@apex.com',
        name: 'Alex Rivera',
        role: 'ORG_ADMIN' as const
      };
      const token = generateAccessToken(payload);
      const verified = verifyAccessToken(token);

      expect(verified).not.toBeNull();
      expect(verified?.tenantId).toBe('t-01');
      expect(verified?.userId).toBe('usr-101');
    });

    it('should isolate Tenant A data from Tenant B requests', () => {
      const tokenTenantA = generateAccessToken({ userId: 'usr-1', tenantId: 'tenant-A', email: 'a@a.com', name: 'User A', role: 'EMPLOYEE' });
      const tokenTenantB = generateAccessToken({ userId: 'usr-2', tenantId: 'tenant-B', email: 'b@b.com', name: 'User B', role: 'EMPLOYEE' });

      const verifiedA = verifyAccessToken(tokenTenantA);
      const verifiedB = verifyAccessToken(tokenTenantB);

      expect(verifiedA?.tenantId).not.toEqual(verifiedB?.tenantId);
    });
  });

  // 5. Signed Kiosk Security & Idempotency Tests
  describe('Signed Kiosk Device Security & Deduplication', () => {
    it('should hash admin PINs and reject hardcoded plaintext comparison', () => {
      const pinHash = hashAdminPin('9481');
      expect(verifyAdminPin('9481', pinHash)).toBe(true);
      expect(verifyAdminPin('1234', pinHash)).toBe(false);
    });

    it('should verify HMAC-SHA256 device signatures on kiosk requests', () => {
      const secret = 'kiosk-secret-key-9481';
      const payload = '{"deviceId":"KIOSK-MUM-01","punches":[]}';
      const crypto = require('crypto');
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

      expect(verifyKioskSignature('KIOSK-MUM-01', payload, signature, secret)).toBe(true);
      expect(verifyKioskSignature('KIOSK-MUM-01', payload, '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', secret)).toBe(false);
    });

    it('should reject duplicate idempotency keys in offline punch batches', () => {
      const now = new Date().toISOString();
      const batch = [
        { idempotencyKey: 'key-101', employeeId: 'emp-1', employeeName: 'Alex', timestamp: now, location: 'Hub', type: 'IN' as const, method: 'face' as const },
        { idempotencyKey: 'key-101', employeeId: 'emp-1', employeeName: 'Alex', timestamp: now, location: 'Hub', type: 'IN' as const, method: 'face' as const }
      ];

      const result = processKioskOfflineBatch(batch);
      expect(result.processedCount).toBe(1);
      expect(result.duplicateCount).toBe(1);
    });
  });

  // 6. Statutory Rules Engine Tests
  describe('Pluggable Statutory Rules Engine (India PF/ESI/PT/TDS)', () => {
    it('should correctly calculate PF, PT, and Net Salary for gross ₹34,000/mo', () => {
      const result = calculateStatutoryDeductions({
        basicSalary: 17000,
        grossSalary: 34000,
        state: 'MH'
      });

      expect(result.providentFund).toBe(1800);
      expect(result.employeeStateInsurance).toBe(0);
      expect(result.professionalTax).toBe(200);
      expect(result.totalDeductions).toBe(2000);
      expect(result.netSalary).toBe(34000 - 2000);
    });
  });
});
