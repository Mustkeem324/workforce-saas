export interface SpacingToken {
  name: string;
  pixel: number;
  rem: string;
  useCase: string;
}

export const SPACING_GRID: SpacingToken[] = [
  { name: 'space-1', pixel: 4, rem: '0.25rem', useCase: 'Micro gap, badge inner padding, dot offsets' },
  { name: 'space-2', pixel: 8, rem: '0.5rem', useCase: 'Small button padding, input internal gap, icon gap' },
  { name: 'space-3', pixel: 12, rem: '0.75rem', useCase: 'Standard input padding, card header gap, list item spacing' },
  { name: 'space-4', pixel: 16, rem: '1rem', useCase: 'Card inner padding, standard component layout gap' },
  { name: 'space-5', pixel: 20, rem: '1.25rem', useCase: 'Modal body padding, table section padding' },
  { name: 'space-6', pixel: 24, rem: '1.5rem', useCase: 'Dashboard card padding, section gap' },
  { name: 'space-8', pixel: 32, rem: '2rem', useCase: 'Page section layout spacing, hero banner padding' },
  { name: 'space-10', pixel: 40, rem: '2.5rem', useCase: 'Large section gap, empty state spacing' },
  { name: 'space-12', pixel: 48, rem: '3rem', useCase: 'Major container padding, modal header spacing' },
  { name: 'space-16', pixel: 64, rem: '4rem', useCase: 'Page layout outer margin, landing hero gap' },
];
