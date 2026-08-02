export interface ShadowToken {
  level: string;
  name: string;
  variable: string;
  description: string;
  lightCSS: string;
  darkCSS: string;
}

export const ELEVATION_TOKENS: ShadowToken[] = [
  {
    level: 'Shadow 1',
    name: 'Flat / Card Elevation',
    variable: '--shadow-1',
    description: 'Used for subtle surface separation (dashboard cards, table row containers, persistent panels).',
    lightCSS: '0 1px 2px 0 rgba(11, 15, 25, 0.05)',
    darkCSS: '0 1px 2px 0 rgba(0, 0, 0, 0.4)'
  },
  {
    level: 'Shadow 2',
    name: 'Floating Surface / Dropdown',
    variable: '--shadow-2',
    description: 'Used for interactive dropdown menus, select popovers, autocomplete panels, hover cards.',
    lightCSS: '0 4px 12px -2px rgba(11, 15, 25, 0.08), 0 2px 4px -1px rgba(11, 15, 25, 0.04)',
    darkCSS: '0 4px 14px -2px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
  },
  {
    level: 'Shadow 3',
    name: 'Modal / Slide-Over Sheet',
    variable: '--shadow-3',
    description: 'Used for primary overlays requiring deep focus (confirmation dialogs, shift editor sheet).',
    lightCSS: '0 16px 32px -8px rgba(11, 15, 25, 0.14), 0 6px 12px -4px rgba(11, 15, 25, 0.06)',
    darkCSS: '0 16px 36px -8px rgba(0, 0, 0, 0.65), 0 6px 12px -4px rgba(0, 0, 0, 0.4)'
  },
  {
    level: 'Shadow 4',
    name: 'Active Drag / Toast Alert',
    variable: '--shadow-4',
    description: 'Used for floating system toasts and active shift card drag items elevated above all UI.',
    lightCSS: '0 24px 48px -12px rgba(11, 15, 25, 0.22), 0 0 0 1px rgba(11, 15, 25, 0.05)',
    darkCSS: '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)'
  },
  {
    level: 'Accent Glow',
    name: 'Warm Focus Highlight',
    variable: '--shadow-accent-glow',
    description: 'Emitted around active buttons, selected shift slots, or active clock-in status.',
    lightCSS: '0 0 20px -2px rgba(224, 90, 71, 0.28)',
    darkCSS: '0 0 25px -2px rgba(240, 126, 109, 0.35)'
  }
];
