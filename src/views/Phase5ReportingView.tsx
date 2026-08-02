import React from 'react';
import { PieChart, Calendar, CreditCard, BarChart2 } from 'lucide-react';
import { LeaveHeatmapTimeline } from '../components/phase5/LeaveHeatmapTimeline';
import { CustomReportBuilder } from '../components/phase5/CustomReportBuilder';
import { LoansLedgerTimeline } from '../components/phase5/LoansLedgerTimeline';
import { Badge } from '../components/ui/badge';

export const Phase5ReportingView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">LEAVE & REPORTING ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">14-DAY HEATMAP & PIVOT BUILDER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Leave, Loans & Pivot Reports</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            14-day leave heatmap with coverage alerts, Metabase-style drag-fields report builder, and employee loans ledger amortization curve.
          </p>
        </div>
      </div>

      {/* 14-Day Team Leave Heatmap & Coverage Density Alerts */}
      <LeaveHeatmapTimeline />

      {/* Metabase-Style Drag-Fields Report Builder */}
      <CustomReportBuilder />

      {/* Employee Loans Ledger Amortization Curve */}
      <LoansLedgerTimeline />
    </div>
  );
};
