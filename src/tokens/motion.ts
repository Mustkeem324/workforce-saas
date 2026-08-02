export interface MotionToken {
  name: string;
  duration: string;
  durationMs: number;
  easing: string;
  useCase: string;
  framerConfig: object;
}

export const MOTION_TOKENS: MotionToken[] = [
  {
    name: 'Micro Motion',
    duration: '150ms',
    durationMs: 150,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    useCase: 'Button hover state, active press scale (0.97), checkmark toggles, focus ring pop',
    framerConfig: { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
  },
  {
    name: 'Panel Transition',
    duration: '250ms',
    durationMs: 250,
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    useCase: 'Slide-over drawers, modal entry/exit, accordion collapse, tab switching content fade',
    framerConfig: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }
  },
  {
    name: 'Spring Curve',
    duration: 'Spring physics',
    durationMs: 300,
    easing: 'stiffness: 400, damping: 28',
    useCase: 'Drag-and-drop shift blocks, toast popup rebound, dynamic re-ordering of workforce lists',
    framerConfig: { type: 'spring', stiffness: 400, damping: 28 }
  }
];
