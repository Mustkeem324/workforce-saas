import React from 'react';
import { Download, TrendingUp, TrendingDown, DollarSign, Users, ShieldCheck, HeartPulse, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const ExecutiveCfoDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Executive CFO Single-Screen Summary</h2>
            <Badge variant="accent">FOUNDER & CFO SUITE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Dense, scannable weekly executive report—print & export ready without chart bloat.
          </p>
        </div>

        <Button variant="accent" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Export Executive Brief (PDF)
        </Button>
      </div>

      {/* 4 Core Executive Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono tabular-nums">
        <Card elevation={1} className="space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-xs font-sans text-[var(--text-tertiary)]">
            <span>TOTAL MONTHLY LABOR SPEND</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5"><TrendingDown className="w-3 h-3" /> -2.4%</span>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-primary)]">$142,736.40</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">$4,210 under monthly budget</span>
        </Card>

        <Card elevation={1} className="space-y-2 border-l-4 border-l-[var(--accent-500)]">
          <div className="flex items-center justify-between text-xs font-sans text-[var(--text-tertiary)]">
            <span>OVERTIME SPEND RATIO</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5"><TrendingDown className="w-3 h-3" /> -1.1%</span>
          </div>
          <div className="text-2xl font-extrabold text-[var(--accent-500)]">4.2%</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Target &lt; 5.0% (Cap Compliant)</span>
        </Card>

        <Card elevation={1} className="space-y-2 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between text-xs font-sans text-[var(--text-tertiary)]">
            <span>RETENTION STABILITY</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +1.2%</span>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-primary)]">88.4%</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Cohort 90-day retention</span>
        </Card>

        <Card elevation={1} className="space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-xs font-sans text-[var(--text-tertiary)]">
            <span>COMPLIANCE HEALTH</span>
            <Badge variant="success">94% OK</Badge>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">94.0%</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">1 Tax filing due in 8 days</span>
        </Card>
      </div>

      {/* Dense Scannable Executive Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation={2} className="space-y-3 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
            Labor Cost Allocations by Department
          </h3>
          <div className="space-y-2 font-mono tabular-nums">
            <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-canvas)]">
              <span className="font-sans font-bold text-[var(--text-primary)]">Warehouse & Logistics</span>
              <span className="font-bold text-emerald-400">$64,280.00 (45%)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-canvas)]">
              <span className="font-sans font-bold text-[var(--text-primary)]">Shift Operations</span>
              <span className="font-bold text-[var(--text-primary)]">$42,810.00 (30%)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-canvas)]">
              <span className="font-sans font-bold text-[var(--text-primary)]">Quality Assurance & Fleet</span>
              <span className="font-bold text-[var(--text-primary)]">$35,646.40 (25%)</span>
            </div>
          </div>
        </Card>

        <Card elevation={2} className="space-y-3 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
            Executive Synthesis & AI Takeaways
          </h3>
          <div className="space-y-2 leading-relaxed text-[var(--text-secondary)]">
            <p className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              ✓ Overall labor spend decreased by $3,420 due to AI weekend shift optimization.
            </p>
            <p className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              ⚠ State Payroll Tax Return due in 8 days for Dallas Facility.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
