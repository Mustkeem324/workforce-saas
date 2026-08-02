import React, { useState } from 'react';
import { IndianRupee, ShieldAlert, Sparkles, FileText, Lock } from 'lucide-react';
import { PayrollRunWizard } from '../components/phase4/PayrollRunWizard';
import { PayrollCycleDiffView } from '../components/phase4/PayrollCycleDiffView';
import { BrandedPayslipPreview } from '../components/phase4/BrandedPayslipPreview';
import { MobilePayrollWizard } from '../components/mobile/MobilePayrollWizard';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export const Phase4PayrollEngineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'diff' | 'payslip'>('wizard');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">GUARDED PAYROLL ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono font-bold">MONETARY DISBURSAL & AI ANOMALY FLAGS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Guarded Payroll Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Guarded 5-step payroll disbursal wizard with mandatory AI anomaly sign-offs, cycle-over-cycle payout delta inspector, and branded payslip studio.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'wizard' ? 'bg-[var(--accent-500)] text-white shadow-xs' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
          >
            Disbursal Wizard
          </button>
          <button
            onClick={() => setActiveTab('diff')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'diff' ? 'bg-[var(--accent-500)] text-white shadow-xs' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
          >
            Cycle Delta Inspector
          </button>
          <button
            onClick={() => setActiveTab('payslip')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'payslip' ? 'bg-[var(--accent-500)] text-white shadow-xs' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
          >
            Branded Payslip Studio
          </button>
        </div>
      </div>

      {/* Tab 1: Guarded 5-Step Payroll Disbursal Wizard */}
      {activeTab === 'wizard' && (
        <>
          <div className="block md:hidden">
            <Card elevation={2} className="p-4 mb-4 border-l-4 border-l-[var(--accent-500)]">
              <span className="text-xs font-bold text-[var(--accent-500)] font-mono uppercase">MOBILE PAYROLL APPROVAL</span>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">Mobile 4-Step Payroll Disbursal Wizard</h3>
            </Card>
            <MobilePayrollWizard />
          </div>
          <div className="hidden md:block">
            <PayrollRunWizard />
          </div>
        </>
      )}

      {/* Tab 2: Cycle-over-Cycle Payout Delta Inspector */}
      {activeTab === 'diff' && <PayrollCycleDiffView />}

      {/* Tab 3: Executive Branded Payslip Studio */}
      {activeTab === 'payslip' && <BrandedPayslipPreview />}
    </div>
  );
};
