import React, { useState } from 'react';
import { TrendingDown, TrendingUp, ShieldCheck, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';

export const CrossTenantBenchmarkWidget: React.FC = () => {
  const [optIn, setOptIn] = useState(true);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Anonymized Vertical Benchmark Insights</h2>
            <Badge variant="accent">CROSS-TENANT BENCHMARKS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Compare overtime ratio, attendance rates, and retention against 100+ anonymized tenants in Logistics & Distribution.
          </p>
        </div>

        {/* Explicit Privacy Opt-In Toggle */}
        <div className="flex items-center gap-3 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-2.5 rounded-xl font-mono text-xs">
          <span className="text-[var(--text-secondary)] font-sans font-bold">Anonymized Data Sharing Opt-In:</span>
          <Switch checked={optIn} onChange={setOptIn} />
        </div>
      </div>

      {/* Legal & Privacy Review Flag Item Notice */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Legal & Privacy Notice:</strong> Benchmark data uses differential privacy (k-anonymity = 50). No tenant PII or employee records are exposed.
          </span>
        </div>
        <Badge variant="accent">PRIVACY VERIFIED</Badge>
      </div>

      {optIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono tabular-nums">
          {/* Benchmark 1: Overtime Spend Ratio */}
          <Card elevation={2} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-sans">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Overtime Expense Ratio vs Vertical Average</h3>
              <Badge variant="success">1.6% BELOW AVG</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans">
                <span>Your Facility:</span>
                <span className="font-bold text-emerald-400 font-mono">4.2% Overtime Ratio</span>
              </div>
              <div className="flex justify-between text-xs font-sans text-[var(--text-tertiary)]">
                <span>Logistics & Distribution Vertical Avg:</span>
                <span className="font-bold font-mono">5.8% Overtime Ratio</span>
              </div>

              <div className="w-full bg-[var(--bg-canvas)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)] flex">
                <div className="bg-emerald-500 h-full w-[42%]" />
                <div className="bg-amber-500/40 h-full w-[16%]" />
              </div>
            </div>
            <p className="text-[11px] font-sans text-emerald-400 font-bold">
              ✓ Excellent performance! Your overtime ratio is 1.6% lower than industry peers.
            </p>
          </Card>

          {/* Benchmark 2: Employee Turnover Rate */}
          <Card elevation={2} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-sans">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">90-Day Turnover Rate vs Vertical Average</h3>
              <Badge variant="success">4.2% BETTER RETENTION</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans">
                <span>Your Facility:</span>
                <span className="font-bold text-emerald-400 font-mono">8.2% Annual Turnover</span>
              </div>
              <div className="flex justify-between text-xs font-sans text-[var(--text-tertiary)]">
                <span>Logistics & Distribution Vertical Avg:</span>
                <span className="font-bold font-mono">12.4% Annual Turnover</span>
              </div>

              <div className="w-full bg-[var(--bg-canvas)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)] flex">
                <div className="bg-emerald-500 h-full w-[65%]" />
                <div className="bg-rose-500/40 h-full w-[35%]" />
              </div>
            </div>
            <p className="text-[11px] font-sans text-emerald-400 font-bold">
              ✓ Strong retention hook! Your 90-day retention is in the top 15th percentile of your vertical.
            </p>
          </Card>
        </div>
      ) : (
        <Card elevation={2} className="p-8 text-center space-y-3">
          <Lock className="w-8 h-8 text-[var(--text-tertiary)] mx-auto" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">Benchmarking Disabled</h3>
          <p className="text-xs text-[var(--text-tertiary)] max-w-sm mx-auto">
            Enable anonymized data sharing above to unlock industry vertical comparisons against 100+ peer tenants.
          </p>
        </Card>
      )}
    </div>
  );
};
