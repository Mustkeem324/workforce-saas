export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  role: string;
  darkHex?: string;
}

export const INK_PALETTE: ColorToken[] = [
  { name: 'Ink 950', variable: '--ink-950', hex: '#06090E', role: 'Deepest Obsidian Dark Canvas Background' },
  { name: 'Ink 900', variable: '--ink-900', hex: '#0B0F19', role: 'Primary Dark Surface / Text in Light Mode' },
  { name: 'Ink 850', variable: '--ink-850', hex: '#111726', role: 'Dark Surface Overlay & Card Background' },
  { name: 'Ink 800', variable: '--ink-800', hex: '#172033', role: 'Dark Element Hover / Secondary Raised' },
  { name: 'Ink 700', variable: '--ink-700', hex: '#24304A', role: 'Dark Border Strong / Subtitle Text' },
  { name: 'Ink 600', variable: '--ink-600', hex: '#374667', role: 'Muted Text Light / Secondary Dark Border' },
  { name: 'Ink 500', variable: '--ink-500', hex: '#526388', role: 'Tertiary Placeholder Text' },
  { name: 'Ink 400', variable: '--ink-400', hex: '#788AA8', role: 'Disabled Icons & Subtle Controls' },
  { name: 'Ink 200', variable: '--ink-200', hex: '#C7D4E6', role: 'Light Mode Subtle Border' },
  { name: 'Ink 50',  variable: '--ink-50',  hex: '#F4F7FC', role: 'Light Canvas Background' },
];

export const ACCENT_PALETTE: ColorToken[] = [
  { name: 'Accent 900', variable: '--accent-900', hex: '#7C2214', role: 'Deep Warm Copper Active Press' },
  { name: 'Accent 700', variable: '--accent-700', hex: '#C23A23', role: 'Warm Terracotta Dark Mode Hover' },
  { name: 'Accent 500', variable: '--accent-500', hex: '#E05A47', role: 'Primary Warm Accent Brand Identity' },
  { name: 'Accent 400', variable: '--accent-400', hex: '#F07E6D', role: 'Dark Mode Primary Accent Highlight' },
  { name: 'Accent 200', variable: '--accent-200', hex: '#FACCC5', role: 'Light Accent Subtle Pill Background' },
  { name: 'Accent 50',  variable: '--accent-50',  hex: '#FFF5F3', role: 'Accent Surface Tint' },
];

export const SEMANTIC_PALETTE: ColorToken[] = [
  { name: 'Success Solid', variable: '--success-solid', hex: '#059669', darkHex: '#10B981', role: 'Approved Shifts, Paid Payroll, Active Status' },
  { name: 'Warning Solid', variable: '--warning-solid', hex: '#D97706', darkHex: '#F59E0B', role: 'Overtime Warning, Pending Approval, Unfilled Shift' },
  { name: 'Danger Solid',  variable: '--danger-solid',  hex: '#DC2626', darkHex: '#EF4444', role: 'Compliance Breach, Late Punch-In, Missed Break' },
  { name: 'Info Solid',    variable: '--info-solid',    hex: '#0891B2', darkHex: '#06B6D4', role: 'System Note, Shift Change Request, Schedule Notice' },
];

export const SYSTEM_SURFACES = [
  { token: '--bg-canvas', light: '#F8FAFC', dark: '#070A0F', desc: 'Main viewport page background' },
  { token: '--bg-surface-raised', light: '#FFFFFF', dark: '#0F1726', desc: 'Cards, Table Containers, Form Panels' },
  { token: '--bg-surface-overlay', light: '#FFFFFF', dark: '#151F32', desc: 'Modals, Slide-over Drawers, Dropdowns' },
  { token: '--border-subtle', light: '#E2E8F0', dark: '#1E293B', desc: 'Grid lines, Divider rules' },
  { token: '--border-default', light: '#CBD5E1', dark: '#334155', desc: 'Input field outlines, Card borders' },
  { token: '--text-primary', light: '#0B0F19', dark: '#F1F5F9', desc: 'Headings, Table Data, Primary Labels' },
];
