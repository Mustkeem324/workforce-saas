import React, { useState } from 'react';
import { DollarSign, Check, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export interface PricingROIProps {
  onLaunchApp: () => void;
}

export const PricingROISection: React.FC<PricingROIProps> = ({ onLaunchApp }) => {
  const [headcount, setHeadcount] = useState<number>(85);

  const pricePerUser = 4.00;
  const monthlyCost = headcount * pricePerUser;
  
  // ROI Math
  const hoursSavedPerWeek = Math.round(headcount * 0.18);
  const overtimePreventedMonthly = Math.round(headcount * 28.50);
  const netMonthlyValue = overtimePreventedMonthly + (hoursSavedPerWeek * 4 * 45); // $45/hr manager labor rate
  const roiMultiplier = (netMonthlyValue / Math.max(1, monthlyCost)).toFixed(1);

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="accent">INTERACTIVE ROI CALCULATOR</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Predictable Pricing. Unmatched ROI.
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Calculate your team's projected monthly labor savings before starting a trial.
        </p>
      </div>

      {/* Interactive Headcount Slider & Live ROI Dashboard */}
      <Card elevation={2} className="p-8 border-2 border-[var(--border-accent)]/40 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-bold text-sm text-[var(--text-primary)]">
            <span>Select Workforce Headcount:</span>
            <span className="font-mono text-xl text-[var(--accent-500)]">{headcount} Active Employees</span>
          </div>

          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={headcount}
            onChange={e => setHeadcount(parseInt(e.target.value))}
            className="w-full h-3 bg-[var(--bg-canvas)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-500)]"
          />

          <div className="flex justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
            <span>10 Employees</span>
            <span>250 Employees</span>
            <span>500+ Employees</span>
          </div>
        </div>

        {/* Live ROI Metrics Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--border-subtle)] font-mono tabular-nums">
          <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1 text-center">
            <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">MONTHLY INVESTMENT</span>
            <div className="text-3xl font-extrabold text-[var(--text-primary)]">${monthlyCost.toFixed(2)}</div>
            <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">$4.00 / user / month</span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1 text-center">
            <span className="text-xs text-emerald-400 font-sans font-semibold">PROJECTED SAVINGS</span>
            <div className="text-3xl font-extrabold text-emerald-400">${netMonthlyValue.toLocaleString('en-US')}/mo</div>
            <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Hours Saved + Overtime Prevented</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--accent-500)] to-[var(--ink-900)] text-white space-y-1 text-center shadow-[var(--shadow-accent-glow)]">
            <span className="text-xs opacity-90 font-sans font-bold">ESTIMATED ROI MULTIPLIER</span>
            <div className="text-3xl font-black">{roiMultiplier}x ROI</div>
            <span className="text-[10px] opacity-80 font-sans block">Payback in &lt; 14 days</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <Button variant="accent" size="lg" onClick={onLaunchApp}>
            Start 14-Day Unlimited Free Trial
          </Button>
        </div>
      </Card>
    </div>
  );
};
