import React from 'react';
import { IndianRupee, Download, TrendingUp, TrendingDown, Users, ShieldAlert, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const ExecutiveCfoDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Executive CFO Summary Dashboard</h2>
            <Badge variant="accent font-mono">INR ₹ CURRENCY</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Single-screen CFO view aggregating labor cost trends, overtime spend, and statutory liabilities with 1-tap PDF export.
          </p>
        </div>

        <Button variant="accent" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Export Executive Board Deck (PDF)
        </Button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono tabular-nums">
        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">TOTAL MONTHLY LABOR SPEND</span>
          <div className="text-2xl font-black text-[var(--text-primary)]">₹28,45,000.00</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3.2% vs previous month</span>
          </div>
        </Card>

        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">UNAPPROVED OVERTIME SPEND</span>
          <div className="text-2xl font-black text-rose-400">₹3,40,800.00</div>
          <div className="flex items-center gap-1 text-xs text-rose-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>+14.8% budget overrun</span>
          </div>
        </Card>

        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">STATUTORY TAX & PF LIABILITY</span>
          <div className="text-2xl font-black text-amber-400">₹7,69,720.00</div>
          <div className="text-[11px] font-sans text-[var(--text-tertiary)]">Due Aug 15, 2026</div>
        </Card>

        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">EFFECTIVE HOURLY LABOR COST</span>
          <div className="text-2xl font-black text-cyan-400">₹482.50 / hr</div>
          <div className="text-[11px] font-sans text-[var(--text-tertiary)]">Blended workforce rate</div>
        </Card>
      </div>
    </div>
  );
};
