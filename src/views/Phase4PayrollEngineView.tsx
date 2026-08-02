import React, { useState } from 'react';
import { DollarSign, Lock, ArrowUpDown, FileText } from 'lucide-react';
import { PayrollRunWizard } from '../components/phase4/PayrollRunWizard';
import { PayrollCycleDiffView } from '../components/phase4/PayrollCycleDiffView';
import { BrandedPayslipPreview } from '../components/phase4/BrandedPayslipPreview';
import { Badge } from '../components/ui/badge';

export const Phase4PayrollEngineView: React.FC = () => {
  const [subTab, setSubTab] = useState<'wizard' | 'diff' | 'payslip'>('wizard');

  const subTabs = [
    { id: 'wizard', label: '1. Guarded Payroll Run Wizard', icon: <Lock className="w-4 h-4" />, desc: 'Multi-step disbursal flow with AI anomaly flags' },
    { id: 'diff', label: '2. Cycle Payout Delta Inspector', icon: <ArrowUpDown className="w-4 h-4" />, desc: 'This-cycle vs last-cycle diff & outlier sign-off' },
    { id: 'payslip', label: '3. Branded Payslip Studio', icon: <FileText className="w-4 h-4" />, desc: 'High-grade printable employee earnings statement' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 4 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">PAYROLL ENGINE & MONETARY DISBURSAL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 4 — Advanced Payroll Engine & Disbursal Pipeline</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Guarded multi-step wizard, AI outlier validation, cycle-over-cycle delta inspector, and branded payslips with strict tabular numeric alignment.
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
        {subTab === 'wizard' && <PayrollRunWizard />}
        {subTab === 'diff' && <PayrollCycleDiffView />}
        {subTab === 'payslip' && <BrandedPayslipPreview />}
      </div>
    </div>
  );
};
