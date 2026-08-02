export interface StatutoryDeductionsInput {
  basicSalary: number;
  grossSalary: number;
  state: string;
}

export interface StatutoryDeductionsOutput {
  providentFund: number;      // PF (12% of basic up to statutory ceiling)
  employeeStateInsurance: number; // ESI (0.75% of gross if gross <= 21000)
  professionalTax: number;    // PT (State slab rates)
  taxDeductionAtSource: number; // TDS (Estimated income tax withholding)
  totalDeductions: number;
  netSalary: number;
}

/**
 * Pluggable Statutory Rules Engine
 * Calculates statutory deductions according to Indian labor laws (PF, ESI, PT, TDS).
 */
export function calculateStatutoryDeductions(input: StatutoryDeductionsInput): StatutoryDeductionsOutput {
  const { basicSalary, grossSalary, state } = input;

  // 1. Provident Fund (PF): 12% of Basic (Capped at ₹1,800/mo for statutory basic ceiling of ₹15,000)
  const pfWageBase = Math.min(basicSalary, 15000);
  const providentFund = Math.round(pfWageBase * 0.12 * 100) / 100;

  // 2. Employee State Insurance (ESI): 0.75% of Gross if Gross <= ₹21,000/mo
  let employeeStateInsurance = 0;
  if (grossSalary <= 21000) {
    employeeStateInsurance = Math.round(grossSalary * 0.0075 * 100) / 100;
  }

  // 3. Professional Tax (PT): State-level slabs (Default Maharashtra/Karnataka slab)
  let professionalTax = 0;
  if (grossSalary > 10000) {
    professionalTax = 200; // Standard ₹200/month slab
  } else if (grossSalary > 7500) {
    professionalTax = 175;
  }

  // 4. Tax Deduction at Source (TDS): Simplified Slab Estimate
  let taxDeductionAtSource = 0;
  const annualGross = grossSalary * 12;
  if (annualGross > 1000000) {
    taxDeductionAtSource = Math.round((grossSalary * 0.15) * 100) / 100;
  } else if (annualGross > 500000) {
    taxDeductionAtSource = Math.round((grossSalary * 0.10) * 100) / 100;
  }

  const totalDeductions = Math.round((providentFund + employeeStateInsurance + professionalTax + taxDeductionAtSource) * 100) / 100;
  const netSalary = Math.round((grossSalary - totalDeductions) * 100) / 100;

  return {
    providentFund,
    employeeStateInsurance,
    professionalTax,
    taxDeductionAtSource,
    totalDeductions,
    netSalary
  };
}
