import React from 'react';
import { Sparkles, AlertTriangle, Cpu, TrendingDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const ProactiveAnomalyDigest: React.FC = () => {
  return (
    <Card elevation={2} className="relative overflow-hidden border-2 border-[var(--border-accent)]/50 bg-gradient-to-br from-[var(--bg-surface-raised)] via-[var(--bg-canvas)] to-[var(--bg-surface-raised)] space-y-4">
      {/* Subtle Glow Background Watermark */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[var(--accent-500)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[var(--accent-500)] text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Daily AI Workforce Anomaly Digest</h3>
              <Badge variant="accent" dot>PROACTIVE SURFACED</Badge>
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">Generated Aug 2, 2026 • Real-time System Synthesis</p>
          </div>
        </div>

        <span className="text-xs font-mono text-[var(--accent-500)] font-bold">3 CRITICAL INSIGHTS DETECTED</span>
      </div>

      {/* Proactive Digest Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Insight 1: Overtime Risk */}
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-2">
          <div className="flex items-center justify-between font-bold text-rose-400">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              OVERTIME RISK BREACH
            </span>
            <span className="font-mono text-[10px] bg-rose-500/20 px-2 py-0.5 rounded">HIGH SEVERITY</span>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            3 employees in Logistics (*Taylor Reed*, *Jordan Chen*) are projected to exceed the 40h cap by Friday.
          </p>
          <div className="pt-2">
            <Button variant="destructive" size="sm" className="text-[10px] py-1 h-auto w-full">
              Cap Shift Hours Automatically
            </Button>
          </div>
        </div>

        {/* Insight 2: Hardware Sync Buffer */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center justify-between font-bold text-amber-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              HARDWARE LATENCY ALERT
            </span>
            <span className="font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">14 LOGS BUFFERED</span>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Kiosk #03 (Dallas Facility) ping latency reached 84s with 14 un-synced offline punches.
          </p>
          <div className="pt-2">
            <Button variant="secondary" size="sm" className="text-[10px] py-1 h-auto w-full">
              Force Hardware Re-sync
            </Button>
          </div>
        </div>

        {/* Insight 3: Cost Savings Opportunity */}
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
          <div className="flex items-center justify-between font-bold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              COST OPTIMIZATION
            </span>
            <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">+$2,240 SAVINGS</span>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Re-allocating 2 weekend shifts to part-time roster eliminates $2,240 in overtime wages.
          </p>
          <div className="pt-2">
            <Button variant="accent" size="sm" className="text-[10px] py-1 h-auto w-full">
              Apply AI Shift Swap
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
