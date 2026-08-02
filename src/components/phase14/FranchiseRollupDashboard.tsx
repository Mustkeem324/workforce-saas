import React, { useState } from 'react';
import { Building2, IndianRupee, Users, ArrowUpRight, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface FranchiseLocation {
  id: string;
  name: string;
  locationCode: string;
  activeRoster: number;
  monthlyPayroll: number;
  complianceRate: number;
}

const FRANCHISE_LOCATIONS: FranchiseLocation[] = [
  { id: 'fl-1', name: 'Mumbai Logistics Hub', locationCode: 'MUM-01', activeRoster: 184, monthlyPayroll: 2845000.00, complianceRate: 98.4 },
  { id: 'fl-2', name: 'Delhi NCR Fulfillment Center', locationCode: 'DEL-02', activeRoster: 142, monthlyPayroll: 2190000.00, complianceRate: 96.2 },
  { id: 'fl-3', name: 'Bengaluru Tech Logistics', locationCode: 'BLR-03', activeRoster: 96, monthlyPayroll: 1540000.00, complianceRate: 100.0 }
];

export const FranchiseRollupDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Parent Account Rollup Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Franchise Parent-Child Aggregated Rollup</h2>
            <Badge variant="accent">PARENT ACCOUNT SCOPE (INR ₹)</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Aggregated metrics across all franchise child locations with permission-aware data isolation.
          </p>
        </div>
      </div>

      {/* Aggregate Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono tabular-nums">
        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">TOTAL COMBINED ROSTER</span>
          <div className="text-2xl font-black text-[var(--text-primary)]">422 Employees</div>
        </Card>
        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">AGGREGATED MONTHLY PAYROLL</span>
          <div className="text-2xl font-black text-emerald-400">₹65,75,000.00</div>
        </Card>
        <Card elevation={1} className="p-5 space-y-2">
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">BLENDED COMPLIANCE RATE</span>
          <div className="text-2xl font-black text-cyan-400">98.2%</div>
        </Card>
      </div>

      {/* Location Cards */}
      <div className="space-y-3">
        {FRANCHISE_LOCATIONS.map(loc => (
          <Card key={loc.id} elevation={1} className="p-5 flex flex-wrap items-center justify-between gap-4 font-mono tabular-nums">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-[var(--text-primary)]">{loc.name}</h4>
                <Badge variant="neutral">{loc.locationCode}</Badge>
              </div>
              <span className="text-xs text-[var(--text-tertiary)] font-sans">{loc.activeRoster} Active Employees</span>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">MONTHLY PAYROLL</span>
                <span className="font-bold text-emerald-400 text-sm">₹{loc.monthlyPayroll.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">COMPLIANCE</span>
                <span className="font-bold text-cyan-400">{loc.complianceRate}%</span>
              </div>
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Drill Down
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
