import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MobileAnomalyCard {
  id: string;
  employeeName: string;
  type: string;
  flag: string;
  impact: string;
}

const SAMPLE_ANOMALIES: MobileAnomalyCard[] = [
  { id: 'an-1', employeeName: 'Jordan Chen', type: 'Unverified Overtime', flag: '+14.2 Hours Unapproved Overtime', impact: '+$340.80 Payout Delta' },
  { id: 'an-2', employeeName: 'Taylor Reed', type: 'Tax Deduction Skew', flag: 'Missing State Tax Exemption Form W-4', impact: '-$120.00 Deduction Delta' }
];

export const MobilePayrollWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [anomaliesResolved, setAnomaliesResolved] = useState<Record<string, boolean>>({});

  const isAllAnomaliesAcknowledged = SAMPLE_ANOMALIES.every(a => anomaliesResolved[a.id]);

  return (
    <div className="flex flex-col min-h-[75vh] justify-between space-y-6">
      {/* Step Progress Indicator Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--accent-500)] font-bold">STEP {currentStep} OF 4</span>
          <Badge variant="neutral">
            {currentStep === 1 && '1. REVIEW SALARIES'}
            {currentStep === 2 && '2. VALIDATE ANOMALIES'}
            {currentStep === 3 && '3. CONFIRM DISBURSAL'}
            {currentStep === 4 && '4. PROCESS COMPLETE'}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--bg-canvas)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
          <div
            className="bg-[var(--accent-500)] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Viewport */}
      <div className="flex-1 space-y-4">
        {/* Step 1: Review Salaries */}
        {currentStep === 1 && (
          <Card elevation={2} className="space-y-4 p-5">
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Review Cycle Payout Totals</h3>
            <div className="space-y-2 font-mono tabular-nums text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-[var(--bg-canvas)]">
                <span className="font-sans text-[var(--text-secondary)]">Total Gross Salaries:</span>
                <span className="font-bold text-emerald-400">$142,736.40</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[var(--bg-canvas)]">
                <span className="font-sans text-[var(--text-secondary)]">Tax & Benefit Deductions:</span>
                <span className="font-bold text-rose-400">-$38,486.40</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/40 font-bold">
                <span className="font-sans text-[var(--text-primary)]">Total Net Payroll:</span>
                <span className="text-[var(--accent-500)] text-sm">$104,250.00</span>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Validate AI Anomalies Stacked Cards */}
        {currentStep === 2 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)]">AI Anomaly Flag Inspector</h3>
            {SAMPLE_ANOMALIES.map(an => {
              const isResolved = anomaliesResolved[an.id];
              return (
                <Card key={an.id} elevation={2} className={`p-4 space-y-3 border-l-4 ${isResolved ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{an.employeeName}</h4>
                      <span className="text-[11px] text-[var(--text-tertiary)]">{an.type}</span>
                    </div>
                    <Badge variant={isResolved ? 'success' : 'danger'}>{isResolved ? 'ACKNOWLEDGED' : 'ACTION REQ'}</Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs font-mono">
                    <div className="text-rose-400 font-bold">{an.flag}</div>
                    <div className="text-[var(--text-tertiary)] text-[11px] mt-1">{an.impact}</div>
                  </div>

                  <Button
                    variant={isResolved ? 'outline' : 'accent'}
                    size="sm"
                    className="w-full min-touch"
                    onClick={() => setAnomaliesResolved({ ...anomaliesResolved, [an.id]: !isResolved })}
                  >
                    {isResolved ? 'Anomaly Acknowledged' : 'Explicitly Sign-off Anomaly'}
                  </Button>
                </Card>
              );
            })}
          </div>
        )}

        {/* Step 3: Confirm Disbursal */}
        {currentStep === 3 && (
          <Card elevation={2} className="space-y-4 p-5 text-center">
            <ShieldAlert className="w-10 h-10 text-[var(--accent-500)] mx-auto" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Final Mobile Approval Confirmation</h3>
            <p className="text-xs text-[var(--text-tertiary)]">
              You are about to authorize a direct bank transfer payout of <strong>$104,250.00 Net</strong> for 184 active employees.
            </p>
          </Card>
        )}

        {/* Step 4: Process Complete */}
        {currentStep === 4 && (
          <Card elevation={2} className="p-6 text-center space-y-3 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-12 h-12 mx-auto" />
            <h3 className="text-lg font-black">Payroll Disbursal Authorized!</h3>
            <p className="text-xs text-emerald-300">Transaction ID: PAY-2026-0802-9481 • Direct deposit queued.</p>
          </Card>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-0 bg-[var(--bg-surface-raised)] border-t border-[var(--border-subtle)] p-4 flex gap-3 pb-safe min-touch">
        {currentStep > 1 && currentStep < 4 && (
          <Button
            variant="outline"
            size="lg"
            className="flex-1 min-touch"
            onClick={() => setCurrentStep(currentStep - 1)}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Back
          </Button>
        )}

        {currentStep < 4 && (
          <Button
            variant="accent"
            size="lg"
            className="flex-1 min-touch"
            disabled={currentStep === 2 && !isAllAnomaliesAcknowledged}
            onClick={() => setCurrentStep(currentStep + 1)}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            {currentStep === 1 && 'Next: Validate'}
            {currentStep === 2 && (isAllAnomaliesAcknowledged ? 'Next: Confirm' : 'Sign Off All Anomalies')}
            {currentStep === 3 && 'Authorize Disbursal'}
          </Button>
        )}
      </div>
    </div>
  );
};
