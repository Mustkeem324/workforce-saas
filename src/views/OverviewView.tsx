import React from 'react';
import { 
  Palette, 
  Type, 
  Grid, 
  Zap, 
  Layers, 
  Briefcase, 
  CheckCircle2, 
  Download, 
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
  onCopyTokens: () => void;
}

export const OverviewView: React.FC<OverviewProps> = ({ onNavigateTab, onCopyTokens }) => {
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
            <Button variant="outline" size="lg" onClick={onCopyTokens} leftIcon={<Download className="w-4 h-4" />}>
              Export CSS Tokens
            </Button>
          </div>
        </div>
      </div>

      {/* System Architecture Checklist */}
      <Card elevation={2} className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Synkron AI Architectural Verification</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Design system standards and multi-tenant backend engine</p>
          </div>
          <Badge variant="success">100% CONFORMANT</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tabular Numerics Discipline</span>
            </div>
            <p className="text-[var(--text-tertiary)] font-sans">
              All currency figures, hourly rates, and attendance times enforce <code className="text-[var(--accent-500)]">font-variant-numeric: tabular-nums</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Express + SQLite3 Persistent Engine</span>
            </div>
            <p className="text-[var(--text-tertiary)] font-sans">
              Node.js Express backend listening on port 5000 backed by WAL-journaled SQLite database.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
