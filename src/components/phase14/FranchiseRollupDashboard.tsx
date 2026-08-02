import React, { useState } from 'react';
import { Building2, ShieldCheck, Lock, Users, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface FranchiseOutlet {
  id: string;
  name: string;
  owner: string;
  headcount: number;
  monthlyLaborSpend: number;
  attendanceRate: number;
}

const FRANCHISE_OUTLETS: FranchiseOutlet[] = [
  { id: 'f-1', name: 'Franchise Outlet #1 (Austin)', owner: 'Apex Texas Holdings LLC', headcount: 184, monthlyLaborSpend: 184500.00, attendanceRate: 98.4 },
  { id: 'f-2', name: 'Franchise Outlet #2 (Dallas)', owner: 'LoneStar Franchise Partners', headcount: 42, monthlyLaborSpend: 42800.00, attendanceRate: 94.2 },
  { id: 'f-3', name: 'Franchise Outlet #3 (Houston)', owner: 'Gulf Logistics Group', headcount: 68, monthlyLaborSpend: 68200.00, attendanceRate: 91.0 }
];

export const FranchiseRollupDashboard: React.FC = () => {
  const [viewRole, setViewRole] = useState<'parent' | 'franchisee'>('parent');

  const totalCorporateSpend = FRANCHISE_OUTLETS.reduce((sum, f) => sum + f.monthlyLaborSpend, 0);
  const totalCorporateHeadcount = FRANCHISE_OUTLETS.reduce((sum, f) => sum + f.headcount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Franchise Parent-Child Rollup Dashboard</h2>
            <Badge variant="accent">PERMISSION-AWARE UI</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Corporate HQ parent account sees aggregated metrics; franchisee accounts see strictly isolated local data.
          </p>
        </div>

        {/* Interactive Role Switcher Toggle */}
        <div className="flex items-center gap-2 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-1.5 rounded-xl text-xs font-mono">
          <button
            onClick={() => setViewRole('parent')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewRole === 'parent' ? 'bg-[var(--accent-500)] text-white shadow-xs' : 'text-[var(--text-secondary)]'}`}
          >
            Corporate HQ Parent View
          </button>
          <button
            onClick={() => setViewRole('franchisee')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewRole === 'franchisee' ? 'bg-[var(--accent-500)] text-white shadow-xs' : 'text-[var(--text-secondary)]'}`}
          >
            Single Franchisee View
          </button>
        </div>
      </div>

      {viewRole === 'parent' ? (
        /* CORPORATE HQ PARENT AGGREGATED ROLLUP VIEW */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono tabular-nums">
            <Card elevation={1} className="space-y-1">
              <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">TOTAL AGGREGATED LABOR SPEND</span>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">${totalCorporateSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">3 Franchise Outlets Combined</span>
            </Card>

            <Card elevation={1} className="space-y-1">
              <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">TOTAL FRANCHISE HEADCOUNT</span>
              <div className="text-2xl font-extrabold text-[var(--accent-500)]">{totalCorporateHeadcount} Staff</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Consolidated Roster</span>
            </Card>

            <Card elevation={1} className="space-y-1">
              <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">AVERAGE ATTENDANCE RATE</span>
              <div className="text-2xl font-extrabold text-emerald-400">94.5%</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Across All Outlets</span>
            </Card>
          </div>

          <Card elevation={2} className="overflow-hidden p-0">
            <div className="p-4 border-b border-[var(--border-subtle)] font-sans font-bold text-sm text-[var(--text-primary)]">
              Franchise Outlet Drill-Down Matrix
            </div>
            <table className="w-full text-left text-xs border-collapse font-mono tabular-nums">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] uppercase tracking-wider font-semibold text-[var(--text-secondary)] font-sans">
                  <th className="py-3.5 px-4">Franchise Outlet</th>
                  <th className="py-3.5 px-4">Entity Owner</th>
                  <th className="py-3.5 px-4 text-right">Headcount</th>
                  <th className="py-3.5 px-4 text-right">Monthly Labor Spend</th>
                  <th className="py-3.5 px-4 text-center">Attendance Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {FRANCHISE_OUTLETS.map(f => (
                  <tr key={f.id} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-[var(--text-primary)]">{f.name}</td>
                    <td className="py-3.5 px-4 font-sans text-[var(--text-tertiary)]">{f.owner}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[var(--text-primary)]">{f.headcount}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-400">${f.monthlyLaborSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-[var(--accent-500)]">{f.attendanceRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        /* SINGLE FRANCHISEE ISOLATED OUTLET VIEW */
        <div className="space-y-6">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between font-sans">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Franchisee Scoped View:</strong> Logged in as <em>LoneStar Franchise Partners (Dallas Outlet #2)</em>. Corporate HQ and sibling outlet data are strictly isolated.
              </span>
            </div>
            <Badge variant="warning">ISOLATED TENANT</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono tabular-nums">
            <Card elevation={2} className="space-y-2">
              <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">YOUR OUTLET LABOR SPEND</span>
              <div className="text-3xl font-extrabold text-[var(--text-primary)]">$42,800.00</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Dallas Outlet #2 Only</span>
            </Card>

            <Card elevation={2} className="space-y-2">
              <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">LOCAL OUTLET HEADCOUNT</span>
              <div className="text-3xl font-extrabold text-emerald-400">42 Employees</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">100% Isolated Local Roster</span>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
