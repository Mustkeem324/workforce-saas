import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, MapPin, DollarSign, Users, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface LocationMetricRow {
  id: string;
  name: string;
  region: string;
  attendanceRate: number; // e.g. 98.4%
  overtimeCost: number; // e.g. 1420.50
  headcount: number;
  trend: 'up' | 'down';
  sparkline: number[];
}

const COMPARISON_DATA: LocationMetricRow[] = [
  { id: 'c1', name: 'Austin Distribution Hub', region: 'Texas Cluster', attendanceRate: 98.4, overtimeCost: 1420.50, headcount: 184, trend: 'up', sparkline: [92, 94, 95, 98.4] },
  { id: 'c2', name: 'Dallas Field Facility', region: 'Texas Cluster', attendanceRate: 94.2, overtimeCost: 2850.00, headcount: 42, trend: 'down', sparkline: [98, 96, 95, 94.2] },
  { id: 'c3', name: 'Houston Freight Terminal', region: 'Texas Cluster', attendanceRate: 91.0, overtimeCost: 4850.25, headcount: 68, trend: 'down', sparkline: [94, 93, 92, 91.0] },
  { id: 'c4', name: 'Phoenix Distribution Center', region: 'Western Cluster', attendanceRate: 97.8, overtimeCost: 890.00, headcount: 64, trend: 'up', sparkline: [95, 96, 97, 97.8] }
];

export const CrossLocationComparisonDashboard: React.FC = () => {
  const [metricsData, setMetricsData] = useState<LocationMetricRow[]>(COMPARISON_DATA);
  const [sortField, setSortField] = useState<'attendanceRate' | 'overtimeCost' | 'headcount'>('attendanceRate');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedMetrics = [...metricsData].sort((a, b) => {
    const mult = sortAsc ? 1 : -1;
    return (a[sortField] - b[sortField]) * mult;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Cross-Location Comparison Matrix</h2>
            <Badge variant="accent">SPARKLINE TRENDS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Side-by-side metric cards (Attendance %, Overtime Expense, Headcount) sortable by any column.
          </p>
        </div>
      </div>

      {/* Side-by-Side Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono tabular-nums">
        {metricsData.map(loc => (
          <Card key={loc.id} elevation={1} className="space-y-3 hover:border-[var(--border-accent)] transition-all">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-xs text-[var(--text-primary)] truncate">{loc.name}</span>
              {loc.trend === 'up' ? (
                <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +2.4%
                </span>
              ) : (
                <span className="text-rose-400 text-[10px] font-bold flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> -1.8%
                </span>
              )}
            </div>

            <div>
              <div className="text-2xl font-extrabold text-emerald-400">{loc.attendanceRate}%</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans">Attendance Rate</span>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between text-xs font-sans">
              <span className="text-[var(--text-tertiary)]">OT Expense:</span>
              <span className="font-bold text-rose-400 font-mono">${loc.overtimeCost.toFixed(2)}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Sortable Comparison Table */}
      <Card elevation={2} className="overflow-hidden p-0">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              <th className="py-3 px-4">Facility Location</th>
              <th 
                className="py-3 px-4 text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                onClick={() => { setSortField('attendanceRate'); setSortAsc(!sortAsc); }}
              >
                Attendance Rate (%) ↕
              </th>
              <th 
                className="py-3 px-4 text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                onClick={() => { setSortField('overtimeCost'); setSortAsc(!sortAsc); }}
              >
                Overtime Expense ($) ↕
              </th>
              <th 
                className="py-3 px-4 text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                onClick={() => { setSortField('headcount'); setSortAsc(!sortAsc); }}
              >
                Headcount ↕
              </th>
              <th className="py-3 px-4 text-center">4-Week Sparkline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] font-mono tabular-nums">
            {sortedMetrics.map(m => (
              <tr key={m.id} className="hover:bg-[var(--bg-element-hover)]/70 transition-colors">
                <td className="py-4 px-4 font-sans font-bold text-[var(--text-primary)]">{m.name}</td>
                <td className="py-4 px-4 text-right font-bold text-emerald-400">{m.attendanceRate}%</td>
                <td className="py-4 px-4 text-right font-bold text-rose-400">${m.overtimeCost.toFixed(2)}</td>
                <td className="py-4 px-4 text-right font-bold text-[var(--text-primary)]">{m.headcount}</td>
                <td className="py-4 px-4 text-center font-sans">
                  {/* SVG Sparkline */}
                  <div className="flex items-center justify-center">
                    <svg className="w-24 h-6 overflow-visible">
                      <polyline
                        fill="none"
                        stroke={m.trend === 'up' ? '#10B981' : '#EF4444'}
                        strokeWidth="2"
                        points={m.sparkline.map((val, i) => `${i * 28 + 4},${24 - (val - 90) * 2}`).join(' ')}
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
