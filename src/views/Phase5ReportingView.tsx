import React, { useState } from 'react';
import { Calendar, SlidersHorizontal, CreditCard } from 'lucide-react';
import { LeaveHeatmapTimeline } from '../components/phase5/LeaveHeatmapTimeline';
import { CustomReportBuilder } from '../components/phase5/CustomReportBuilder';
import { LoansLedgerTimeline } from '../components/phase5/LoansLedgerTimeline';
import { Badge } from '../components/ui/badge';

export const Phase5ReportingView: React.FC = () => {
  const [subTab, setSubTab] = useState<'leave' | 'reports' | 'loans'>('leave');

  const subTabs = [
    { id: 'leave', label: '1. Leave Heatmap & Timeline', icon: <Calendar className="w-4 h-4" />, desc: 'Team leave heatmap with density overlap alerts' },
    { id: 'reports', label: '2. Pivot Report Builder', icon: <SlidersHorizontal className="w-4 h-4" />, desc: 'Metabase-style drag-fields report builder' },
    { id: 'loans', label: '3. Loans Ledger & Timeline', icon: <CreditCard className="w-4 h-4" />, desc: 'Running balance amortization curve & transactions' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 5 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">LEAVE, LOANS & PIVOT REPORTING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 5 — Leave, Loans & Custom Reporting Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            14-day team leave heatmap, Metabase-style drag-fields pivot report builder, and employee loans ledger curve.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] p-2 rounded-2xl shadow-xs">
        {subTabs.map(tab => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                ${isActive 
                  ? 'bg-[var(--accent-500)] text-white shadow-[var(--shadow-accent-glow)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] hover:text-[var(--text-primary)]'}
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-view Viewport */}
      <div>
        {subTab === 'leave' && <LeaveHeatmapTimeline />}
        {subTab === 'reports' && <CustomReportBuilder />}
        {subTab === 'loans' && <LoansLedgerTimeline />}
      </div>
    </div>
  );
};
