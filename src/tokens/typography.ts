export interface TypeScale {
  name: string;
  sizePx: number;
  sizeRem: string;
  lineHeight: string;
  weight: string;
  tracking: string;
  useCase: string;
  sample: string;
}

export const UI_TYPE_SCALE: TypeScale[] = [
  { name: 'Display 1', sizePx: 36, sizeRem: '2.25rem', lineHeight: '1.2', weight: '700 (Bold)', tracking: '-0.025em', useCase: 'Main Dashboard Headings, Welcome Banners', sample: 'Workforce Operations Hub' },
  { name: 'Title 1', sizePx: 28, sizeRem: '1.75rem', lineHeight: '1.25', weight: '700 (Bold)', tracking: '-0.02em', useCase: 'Section Headers, Modal Title', sample: 'Payroll Processing & Approval' },
  { name: 'Title 2', sizePx: 22, sizeRem: '1.375rem', lineHeight: '1.3', weight: '600 (SemiBold)', tracking: '-0.015em', useCase: 'Widget Titles, Card Headers', sample: 'Weekly Schedule Overview' },
  { name: 'Subtitle', sizePx: 18, sizeRem: '1.125rem', lineHeight: '1.4', weight: '600 (SemiBold)', tracking: '-0.01em', useCase: 'Sub-headers, Drawer Section Header', sample: 'Employee Shift Details' },
  { name: 'Body Regular', sizePx: 14, sizeRem: '0.875rem', lineHeight: '1.5', weight: '400 / 500', tracking: '0em', useCase: 'Body Text, Table Cell Values, Form Labels', sample: 'Shift scheduled for 08:00 AM to 04:30 PM with 30 min break.' },
  { name: 'Body Small', sizePx: 12, sizeRem: '0.75rem', lineHeight: '1.5', weight: '500 (Medium)', tracking: '0.01em', useCase: 'Secondary Meta Info, Badges, Table Headers', sample: 'LAST PUNCH: 14:02 PM • APPROVED BY MANAGER' },
  { name: 'Micro / Caption', sizePx: 10, sizeRem: '0.625rem', lineHeight: '1.4', weight: '600 (SemiBold)', tracking: '0.05em', useCase: 'Uppercase Tags, Status Indicators', sample: 'COMPLIANCE AUDITED' },
];

export const NUMERIC_TABULAR_SAMPLES = [
  { employee: 'Alex Rivera (Senior Tech)', rate: '$48.50', hours: '40.00 hrs', overtime: '04.50 hrs', gross: '$2,267.25', status: 'Paid' },
  { employee: 'Jordan Chen (Shift Lead)', rate: '$52.00', hours: '38.50 hrs', overtime: '00.00 hrs', gross: '$2,002.00', status: 'Approved' },
  { employee: 'Morgan Smith (Dispatch)', rate: '$36.25', hours: '42.75 hrs', overtime: '02.75 hrs', gross: '$1,699.22', status: 'Pending' },
];
