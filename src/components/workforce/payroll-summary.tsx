import React from 'react';
import { DollarSign, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';

export const PayrollSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Metric 1 */}
      <Card elevation={1} hoverable className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">ESTIMATED PAYROLL</span>
          <div className="p-2 rounded-lg bg-[var(--accent-50)] dark:bg-[rgba(224,90,71,0.15)] text-[var(--accent-500)]">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
            $142,850.40
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--success-text)] font-semibold mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% vs last pay period</span>
          </div>
        </div>
      </Card>

      {/* Metric 2 */}
      <Card elevation={1} hoverable className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">ACTIVE WORKFORCE</span>
          <div className="p-2 rounded-lg bg-[var(--bg-element-hover)] text-[var(--text-primary)]">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
            184 / 190
          </div>
          <div className="text-xs text-[var(--text-tertiary)] mt-1">
            96.8% shift compliance rate
          </div>
        </div>
      </Card>

      {/* Metric 3 */}
      <Card elevation={1} hoverable className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">TOTAL SHIFT HOURS</span>
          <div className="p-2 rounded-lg bg-[var(--info-bg)] text-[var(--info-solid)]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
            3,480.50 hrs
          </div>
          <div className="text-xs text-[var(--text-tertiary)] mt-1">
            Avg 37.8 hrs per employee
          </div>
        </div>
      </Card>

      {/* Metric 4 */}
      <Card elevation={1} hoverable className="flex flex-col justify-between border-l-4 border-l-[var(--warning-solid)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--warning-text)]">OVERTIME RISK</span>
          <div className="p-2 rounded-lg bg-[var(--warning-bg)] text-[var(--warning-solid)]">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-extrabold font-mono tabular-nums text-[var(--warning-text)]">
            142.25 hrs
          </div>
          <div className="text-xs text-[var(--warning-text)] font-medium mt-1">
            12 employees exceeding 40h cap
          </div>
        </div>
      </Card>
    </div>
  );
};
