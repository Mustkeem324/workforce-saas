import React, { useState } from 'react';
import { ArrowUpDown, AlertCircle, CheckCircle2, ShieldAlert, Filter, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface EmployeeCycleDiff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastCyclePay: number;
  thisCyclePay: number;
  deltaAmount: number;
  deltaPercent: number;
  isOutlier: boolean;
  outlierReason?: string;
  dismissed?: boolean;
}

const SAMPLE_DIFF_DATA: EmployeeCycleDiff[] = [
  {
    id: 'd1',
    name: 'Taylor Reed',
    role: 'Logistics Specialist',
    avatar: 'TR',
    lastCyclePay: 1118.00,
    thisCyclePay: 2058.00,
    deltaAmount: 940.00,
    deltaPercent: 84.08,
    isOutlier: true,
    outlierReason: '18.0 hrs overtime spike without pre-authorization'
  },
  {
    id: 'd2',
    name: 'Jordan Chen',
    role: 'Shift Operations Lead',
    avatar: 'JC',
    lastCyclePay: 1516.00,
    thisCyclePay: 2002.00,
    deltaAmount: 486.00,
    deltaPercent: 32.06,
    isOutlier: true,
    outlierReason: 'Weekend emergency response shift premium'
  },
  {
    id: 'd3',
    name: 'Alex Rivera',
    role: 'Senior Tech Lead',
    avatar: 'AR',
    lastCyclePay: 2267.25,
    thisCyclePay: 2267.25,
    deltaAmount: 0.00,
    deltaPercent: 0.00,
    isOutlier: false
  },
  {
    id: 'd4',
    name: 'Morgan Smith',
    role: 'Dispatch Coordinator',
    avatar: 'MS',
    lastCyclePay: 1750.00,
    thisCyclePay: 1699.22,
    deltaAmount: -50.78,
    deltaPercent: -2.90,
    isOutlier: false
  },
  {
    id: 'd5',
    name: 'Elena Rostova',
    role: 'Quality Inspector',
    avatar: 'ER',
    lastCyclePay: 1680.00,
    thisCyclePay: 1755.60,
    deltaAmount: 75.60,
    deltaPercent: 4.50,
    isOutlier: false
  }
];

export const PayrollCycleDiffView: React.FC = () => {
  const [diffData, setDiffData] = useState<EmployeeCycleDiff[]>(SAMPLE_DIFF_DATA);
  const [sortField, setSortField] = useState<'deltaPercent' | 'thisCyclePay'>('deltaPercent');
  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDismissOutlier = (id: string) => {
    setDiffData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, dismissed: true };
      }
      return item;
    }));
  };

  const sortedData = [...diffData]
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.role.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const mult = sortAsc ? 1 : -1;
      return (a[sortField] - b[sortField]) * mult;
    });

  const pendingOutliers = diffData.filter(d => d.isOutlier && !d.dismissed);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Cycle-Over-Cycle Payout Delta Inspector</h2>
            <Badge variant="accent">TABULAR NUMERICS DISCIPLINE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Compares current vs last pay cycle deltas per employee. Flagged outliers require explicit supervisor dismissal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search employee..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-48"
          />

          <Badge variant={pendingOutliers.length > 0 ? 'danger' : 'success'}>
            {pendingOutliers.length} Outliers Requiring Sign-off
          </Badge>
        </div>
      </div>

      {/* Comparison Table */}
      <Card elevation={2} className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4 text-right">Last Cycle</th>
                <th 
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => { setSortField('thisCyclePay'); setSortAsc(!sortAsc); }}
                >
                  This Cycle ↕
                </th>
                <th className="py-3.5 px-4 text-right">Dollar Delta ($)</th>
                <th 
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => { setSortField('deltaPercent'); setSortAsc(!sortAsc); }}
                >
                  % Variance ↕
                </th>
                <th className="py-3.5 px-4 text-center">Outlier Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono tabular-nums">
              {sortedData.map(row => {
                const isPositive = row.deltaAmount > 0;
                const isNegative = row.deltaAmount < 0;

                return (
                  <tr 
                    key={row.id} 
                    className={`hover:bg-[var(--bg-element-hover)]/70 transition-colors ${
                      row.isOutlier && !row.dismissed ? 'bg-rose-500/10' : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-500)]/15 text-[var(--accent-500)] font-bold text-xs flex items-center justify-center shrink-0">
                          {row.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)]">{row.name}</div>
                          <div className="text-xs text-[var(--text-tertiary)] font-normal">{row.role}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right text-[var(--text-tertiary)]">
                      ${row.lastCyclePay.toFixed(2)}
                    </td>

                    <td className="py-4 px-4 text-right font-bold text-[var(--text-primary)]">
                      ${row.thisCyclePay.toFixed(2)}
                    </td>

                    <td className={`py-4 px-4 text-right font-bold ${isPositive ? 'text-emerald-400' : isNegative ? 'text-rose-400' : 'text-[var(--text-tertiary)]'}`}>
                      {isPositive ? `+$${row.deltaAmount.toFixed(2)}` : `$${row.deltaAmount.toFixed(2)}`}
                    </td>

                    <td className={`py-4 px-4 text-right font-bold ${row.deltaPercent > 20 ? 'text-rose-400' : isPositive ? 'text-emerald-400' : 'text-[var(--text-tertiary)]'}`}>
                      {row.deltaPercent > 0 ? `+${row.deltaPercent.toFixed(2)}%` : `${row.deltaPercent.toFixed(2)}%`}
                    </td>

                    <td className="py-4 px-4 text-center font-sans">
                      {row.isOutlier ? (
                        row.dismissed ? (
                          <Badge variant="success">AUDITED & APPROVED</Badge>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-[10px] font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/40 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              OUTLIER FLAG
                            </span>
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => handleDismissOutlier(row.id)}
                              className="text-[10px] py-0.5 px-2 h-auto"
                            >
                              Sign-Off
                            </Button>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-[var(--text-tertiary)]">Normal Range</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
