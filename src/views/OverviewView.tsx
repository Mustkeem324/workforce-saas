import React from 'react';
import { 
  Palette, 
  Type, 
  Grid, 
  Zap, 
  Layers, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Radio,
  Calendar,
  IndianRupee,
  PieChart,
  Bot,
  Command,
  Rocket
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export interface OverviewProps {
  onNavigateTab: (tabId: string) => void;
  onCopyTokens?: () => void;
}

export const OverviewView: React.FC<OverviewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[var(--bg-surface-raised)] via-[var(--bg-surface-overlay)] to-[var(--ink-950)] p-8 md:p-12 border border-[var(--border-default)] overflow-hidden shadow-[var(--shadow-4)]">
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-[var(--accent-500)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <Badge variant="accent" dot>DESIGN SYSTEM VERIFIED</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">PLUS JAKARTA SANS + JETBRAINS MONO</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            Synkron AI — Next-Gen Workforce OS
          </h1>

          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            Obsidian Charcoal (<code className="font-mono text-[var(--accent-500)] font-semibold">#0B0F19</code>), Warm Copper Accent (<code className="font-mono text-[var(--accent-500)] font-semibold">#E05A47</code>), 4px Grid, Tabular Numerics for financial accuracy, Day-1 Dark mode, and full mobile responsiveness.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="accent" size="lg" onClick={() => onNavigateTab('phase12')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Employee Self-Service Hub
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Design Tokens & Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card elevation={2} className="space-y-3 cursor-pointer hover:border-[var(--accent-500)]/50 transition-colors" onClick={() => onNavigateTab('colors')}>
          <div className="flex items-center justify-between">
            <Palette className="w-6 h-6 text-rose-400" />
            <Badge variant="neutral">TOKEN</Badge>
          </div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">Color System & Themes</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Dual-calibrated light and dark mode palette variables with contrast ratios.</p>
        </Card>

        <Card elevation={2} className="space-y-3 cursor-pointer hover:border-[var(--accent-500)]/50 transition-colors" onClick={() => onNavigateTab('typography')}>
          <div className="flex items-center justify-between">
            <Type className="w-6 h-6 text-sky-400" />
            <Badge variant="neutral">TOKEN</Badge>
          </div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">Typography & Hierarchy</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Plus Jakarta Sans UI font stack paired with JetBrains Mono for financial figures.</p>
        </Card>

        <Card elevation={2} className="space-y-3 cursor-pointer hover:border-[var(--accent-500)]/50 transition-colors" onClick={() => onNavigateTab('spacing')}>
          <div className="flex items-center justify-between">
            <Grid className="w-6 h-6 text-emerald-400" />
            <Badge variant="neutral">GRID</Badge>
          </div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">Spacing & Elevation</h3>
          <p className="text-xs text-[var(--text-tertiary)]">4px baseline grid scale paired with 4-tier dark mode shadow elevation rules.</p>
        </Card>
      </div>
    </div>
  );
};
