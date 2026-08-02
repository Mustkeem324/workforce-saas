import { describe, it, expect } from 'vitest';
import { calculateStatutoryDeductions } from '../statutory';
import { LoginSchema, PunchSchema, ShiftSchema, PayrollRunSchema } from '../validation';
import { compareEmbeddings, extractEmbeddingFromBase64 } from '../faceRecognition';

describe('Production Hardened Backend Engine Verification', () => {

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

  // 2. Statutory Rules Engine Tests
  describe('Pluggable Statutory Rules Engine (India PF/ESI/PT/TDS)', () => {
    it('should correctly calculate PF, PT, and Net Salary for gross ₹34,000/mo', () => {
      const result = calculateStatutoryDeductions({
        basicSalary: 17000,
        grossSalary: 34000,
        state: 'MH'
      });

      expect(result.providentFund).toBe(1800); // 12% of 15,000 cap
      expect(result.employeeStateInsurance).toBe(0); // Gross > 21,000, ESI exempt
      expect(result.professionalTax).toBe(200); // ₹200 PT slab
      expect(result.totalDeductions).toBe(2000);
      expect(result.netSalary).toBe(34000 - 2000);
    });

    it('should calculate ESI for lower gross salary (<= ₹21,000)', () => {
      const result = calculateStatutoryDeductions({
        basicSalary: 10000,
        grossSalary: 18000,
        state: 'MH'
      });

      expect(result.employeeStateInsurance).toBe(135); // 0.75% of 18,000 = 135
    });
  });

  // 3. Face Recognition Embedding & Vector Matching Tests
  describe('Server-Side Face Recognition Vector Matching Engine', () => {
    it('should calculate 0.0 distance for identical face embedding vectors', () => {
      const vecA = [0.12, -0.45, 0.88, 0.33];
      const distance = compareEmbeddings(vecA, vecA);
      expect(distance).toBe(0);
    });

    it('should extract 128-d normalized vector from image base64', async () => {
      const mockBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
      const vector = await extractEmbeddingFromBase64(mockBase64);
      expect(vector.length).toBe(128);
      expect(vector[0]).toBeGreaterThanOrEqual(-1.0);
      expect(vector[0]).toBeLessThanOrEqual(1.0);
    });

    it('should reject non-matching face vectors exceeding 0.6 distance threshold', () => {
      const vecA = Array(128).fill(0.5);
      const vecB = Array(128).fill(-0.5);
      const distance = compareEmbeddings(vecA, vecB);
      expect(distance).toBeGreaterThan(0.6);
    });
  });
});
