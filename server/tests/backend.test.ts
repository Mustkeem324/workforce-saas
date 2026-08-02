import { describe, it, expect } from 'vitest';
import { calculateStatutoryDeductions } from '../statutory';
import { LoginSchema, PunchSchema, ShiftSchema, PayrollRunSchema } from '../validation';

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
});
