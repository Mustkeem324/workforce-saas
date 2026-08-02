import React from 'react';
import { Users, HeartPulse, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface CohortRow {
  cohortName: string;
  headcount: number;
  m1: number;
  m3: number;
  m6: number;
  m12: number;
}

const COHORT_DATA: CohortRow[] = [
  { cohortName: 'Q1 2026 Cohort', headcount: 42, m1: 98, m3: 92, m6: 88, m12: 84 },
  { cohortName: 'Q2 2026 Cohort', headcount: 38, m1: 100, m3: 95, m6: 91, m12: 86 },
  { cohortName: 'Q3 2026 Cohort', headcount: 54, m1: 96, m3: 88, m6: 78, m12: 72 },
  { cohortName: 'Q4 2026 Cohort', headcount: 28, m1: 96, m3: 92, m6: 89, m12: 85 }
];

export const CohortRetentionGrid: React.FC = () => {
  const getHeatmapBg = (val: number) => {
    if (val >= 92) return 'bg-emerald-600 text-white font-bold';
    if (val >= 85) return 'bg-emerald-500/30 text-emerald-300 font-semibold';
    if (val >= 78) return 'bg-amber-500/30 text-amber-300 font-semibold';
    return 'bg-rose-500/30 text-rose-300 font-bold';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Heatmap Employee Cohort Retention Matrix</h2>
            <Badge variant="accent">AMPLITUDE-STYLE HR ANALYTICS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Track employee retention cohorts over 12 months with product-analytics style heatmap visualization.
          </p>
        </div>
      </div>

      {/* Cohort Heatmap Grid */}
      <Card elevation={2} className="overflow-hidden p-0">
        <table className="w-full text-left text-xs border-collapse font-mono tabular-nums">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] uppercase tracking-wider font-semibold text-[var(--text-secondary)] font-sans">
              <th className="py-4 px-4">Hire Cohort</th>
              <th className="py-4 px-4 text-right">Initial Headcount</th>
              <th className="py-4 px-4 text-center">Month 1</th>
              <th className="py-4 px-4 text-center">Month 3</th>
              <th className="py-4 px-4 text-center">Month 6</th>
              <th className="py-4 px-4 text-center">Month 12</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {COHORT_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                <td className="py-4 px-4 font-sans font-bold text-[var(--text-primary)]">{row.cohortName}</td>
                <td className="py-4 px-4 text-right font-bold text-[var(--text-primary)]">{row.headcount} Staff</td>
                <td className="py-4 px-4 text-center"><span className={`px-3 py-1.5 rounded-lg block ${getHeatmapBg(row.m1)}`}>{row.m1}%</span></td>
                <td className="py-4 px-4 text-center"><span className={`px-3 py-1.5 rounded-lg block ${getHeatmapBg(row.m3)}`}>{row.m3}%</span></td>
                <td className="py-4 px-4 text-center"><span className={`px-3 py-1.5 rounded-lg block ${getHeatmapBg(row.m6)}`}>{row.m6}%</span></td>
                <td className="py-4 px-4 text-center"><span className={`px-3 py-1.5 rounded-lg block ${getHeatmapBg(row.m12)}`}>{row.m12}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
