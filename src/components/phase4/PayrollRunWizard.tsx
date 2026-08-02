import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  Sparkles, 
  RotateCw, 
  Download, 
  Lock, 
  Users, 
  Building2,
  FileCheck
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface AIAnomaly {
  id: string;
  employeeName: string;
  avatar: string;
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  currentPay: string;
  previousPay: string;
  deltaPercent: string;
  dismissed?: boolean;
  dismissedReason?: string;
}

const INITIAL_ANOMALIES: AIAnomaly[] = [
  {
    id: 'an-1',
    employeeName: 'Taylor Reed',
    avatar: 'TR',
    severity: 'High',
    title: 'Unexpected Wage Spike (+84.2%)',
    description: 'Paycheck increased from $1,118.00 to $2,058.00 due to 18.0 unapproved overtime hours.',
    currentPay: '$2,058.00',
    previousPay: '$1,118.00',
    deltaPercent: '+84.2%'
  },
  {
    id: 'an-2',
    employeeName: 'Jordan Chen',
    avatar: 'JC',
    severity: 'Medium',
    title: 'Consecutive Overtime Shift (+32.0%)',
    description: 'Gross pay increased from $1,516.00 to $2,002.00 after 3 weekend emergency calls.',
    currentPay: '$2,002.00',
    previousPay: '$1,516.00',
    deltaPercent: '+32.0%'
  },
  {
    id: 'an-3',
    employeeName: 'Elena Rostova',
    avatar: 'ER',
    severity: 'Low',
    title: 'Base Rate Adjustment (+4.5%)',
    description: 'Annual merit increase ($42.00/hr -> $43.89/hr) reflected in current period.',
    currentPay: '$1,755.60',
    previousPay: '$1,680.00',
    deltaPercent: '+4.5%'
  }
];

export const PayrollRunWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: Review, 2: Validate, 3: Confirm, 4: Processing, 5: Complete
  const [anomalies, setAnomalies] = useState<AIAnomaly[]>(INITIAL_ANOMALIES);
  const [dismissReasonInput, setDismissReasonInput] = useState<string>('Audited & verified against shift supervisor log.');
  const [batchProgress, setBatchProgress] = useState<number>(0);
  const [processingBatchName, setProcessingBatchName] = useState<string>('Batch 1/4: Direct Deposit Disbursal...');
  const [securityPin, setSecurityPin] = useState<string>('9482');

  // Active un-dismissed high/medium anomalies block wizard progression!
  const pendingHighAnomalies = anomalies.filter(a => !a.dismissed && (a.severity === 'High' || a.severity === 'Medium'));

  const handleDismissAnomaly = (id: string) => {
    setAnomalies(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, dismissed: true, dismissedReason: dismissReasonInput };
      }
      return a;
    }));
  };

  // Start live processing stream when stepping into step 4
  useEffect(() => {
    if (currentStep === 4) {
      setBatchProgress(0);
      const interval = setInterval(() => {
        setBatchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentStep(5), 600);
            return 100;
          }

          const next = prev + 10;
          if (next < 30) setProcessingBatchName('Batch 1/4: Direct Deposit Electronic Transfers...');
          else if (next < 60) setProcessingBatchName('Batch 2/4: Federal & State Tax Withholding Sync...');
          else if (next < 90) setProcessingBatchName('Batch 3/4: Health Insurance & 401(k) Remittance...');
          else setProcessingBatchName('Batch 4/4: Bank Clearinghouse Confirmation...');

          return next;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Wizard Progress Header */}
      <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-2)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--accent-500)]" />
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Guarded Payroll Run Pipeline</h2>
              <Badge variant="accent">HIGH-STAKES MONETARY DISBURSAL</Badge>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
              Multi-step authorization flow with AI anomaly flags and live batch processing.
            </p>
          </div>

          <div className="text-xs font-mono text-[var(--text-secondary)]">
            TOTAL PAYOUT: <span className="font-bold tabular-nums text-emerald-400 text-sm">$142,736.40</span>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 pt-2 border-t border-[var(--border-subtle)] text-xs font-semibold">
          {[
            { step: 1, label: '1. Review Timesheets' },
            { step: 2, label: '2. Validate Anomalies' },
            { step: 3, label: '3. Authorize' },
            { step: 4, label: '4. Batch Processing' },
            { step: 5, label: '5. Complete' }
          ].map(s => {
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div 
                key={s.step}
                className={`
                  p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-[11px]
                  ${isCurrent 
                    ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-[var(--shadow-accent-glow)] font-bold' 
                    : isDone ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-semibold' : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'}
                `}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: REVIEW TIMESHEETS & METRICS */}
      {currentStep === 1 && (
        <Card elevation={2} className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Step 1 — Review Aggregate Payroll Batch</h3>
              <p className="text-xs text-[var(--text-tertiary)]">Pay period: July 20, 2026 – August 2, 2026 (Bi-Weekly)</p>
            </div>
            <Badge variant="neutral">184 ACTIVE EMPLOYEES</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono tabular-nums">
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">TOTAL GROSS WAGES</span>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">$178,420.50</div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">ESTIMATED TAX WITHHOLDINGS</span>
              <div className="text-2xl font-extrabold text-[var(--danger-text)]">-$35,684.10</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-sans font-semibold">NET DISBURSAL AMOUNT</span>
              <div className="text-2xl font-extrabold text-emerald-400">$142,736.40</div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--border-subtle)]">
            <Button variant="accent" onClick={() => setCurrentStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to AI Anomaly Validation
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: VALIDATE (AI ANOMALY FLAGS SURFACE HERE, INLINE BY SEVERITY) */}
      {currentStep === 2 && (
        <Card elevation={2} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-500)]" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">Step 2 — AI Anomaly Detection & Guardrails</h3>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                The wizard prevents finalization until all High/Medium severity outliers receive explicit manager sign-off.
              </p>
            </div>

            {pendingHighAnomalies.length > 0 ? (
              <Badge variant="danger" dot>
                {pendingHighAnomalies.length} UNRESOLVED SEVERITY OUTLIERS
              </Badge>
            ) : (
              <Badge variant="success" dot>
                ALL ANOMALIES AUDITED & DISMISSED
              </Badge>
            )}
          </div>

          {/* Anomaly Cards List */}
          <div className="space-y-4">
            {anomalies.map(anom => {
              const isHigh = anom.severity === 'High';
              const isMedium = anom.severity === 'Medium';

              return (
                <div
                  key={anom.id}
                  className={`
                    p-5 rounded-2xl border-2 transition-all space-y-3
                    ${anom.dismissed 
                      ? 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] opacity-60' 
                      : isHigh ? 'border-rose-500 bg-rose-500/5 shadow-lg' : isMedium ? 'border-amber-500 bg-amber-500/5' : 'border-cyan-500 bg-cyan-500/5'}
                  `}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-500)] text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {anom.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-[var(--text-primary)]">{anom.employeeName}</h4>
                          <Badge variant={isHigh ? 'danger' : isMedium ? 'warning' : 'info'}>
                            {anom.severity} SEVERITY ANOMALY
                          </Badge>
                        </div>
                        <h5 className="text-xs font-bold text-[var(--accent-500)] mt-0.5">{anom.title}</h5>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl">{anom.description}</p>
                      </div>
                    </div>

                    <div className="text-right font-mono tabular-nums text-xs">
                      <span className="text-[var(--text-tertiary)] block text-[10px] font-sans">CURRENT VS PREVIOUS</span>
                      <span className="font-bold text-emerald-400 text-sm">{anom.currentPay}</span>
                      <span className="text-[var(--text-tertiary)] text-[11px] block"> (vs {anom.previousPay})</span>
                      <span className="text-xs font-bold text-rose-400 block mt-0.5">{anom.deltaPercent}</span>
                    </div>
                  </div>

                  {/* Dismissal Form / Audit Sign-off */}
                  {!anom.dismissed ? (
                    <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                      <input
                        type="text"
                        value={dismissReasonInput}
                        onChange={e => setDismissReasonInput(e.target.value)}
                        placeholder="Enter manager audit justification..."
                        className="flex-1 min-w-[240px] text-xs bg-[var(--bg-surface-raised)] border border-[var(--border-default)] px-3 py-1.5 rounded-lg text-[var(--text-primary)]"
                      />
                      <Button
                        variant={isHigh ? 'accent' : 'secondary'}
                        size="sm"
                        onClick={() => handleDismissAnomaly(anom.id)}
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Audit & Dismiss Outlier
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DISMISSED & SIGNED-OFF: "{anom.dismissedReason}"</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <Button variant="outline" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Review
            </Button>

            <Button
              variant="accent"
              disabled={pendingHighAnomalies.length > 0}
              onClick={() => setCurrentStep(3)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {pendingHighAnomalies.length > 0 ? `Resolve ${pendingHighAnomalies.length} High Severity Flags to Proceed` : 'Proceed to Final Authorization'}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: CONFIRM & AUTHORIZE */}
      {currentStep === 3 && (
        <Card elevation={2} className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2 border-b border-[var(--border-subtle)] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Step 3 — High-Stakes Authorization</h3>
            <p className="text-xs text-[var(--text-tertiary)]">
              This action will initiate irreversible electronic funds transfer ($142,736.40) to 184 employee accounts.
            </p>
          </div>

          <div className="bg-[var(--bg-canvas)] p-4 rounded-xl border border-[var(--border-subtle)] text-xs space-y-2 font-mono tabular-nums">
            <div className="flex justify-between">
              <span className="text-[var(--text-tertiary)] font-sans">Batch Size:</span>
              <span className="font-bold text-[var(--text-primary)]">184 Employee Accounts</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
              <span className="text-[var(--text-tertiary)] font-sans">Net Disbursal Amount:</span>
              <span className="font-bold text-emerald-400 text-sm">$142,736.40</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
              <span className="text-[var(--text-tertiary)] font-sans">Audit Signature:</span>
              <span className="font-semibold text-[var(--accent-500)]">Alex Rivera (Operations Director)</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-semibold text-[var(--text-primary)] block">Enter Security PIN to Confirm</label>
            <input
              type="password"
              value={securityPin}
              onChange={e => setSecurityPin(e.target.value)}
              className="w-full text-center font-mono text-xl tracking-widest bg-[var(--bg-surface-raised)] border-2 border-[var(--border-accent)] rounded-xl py-2 text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <Button variant="outline" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Validation
            </Button>

            <Button
              variant="accent"
              onClick={() => setCurrentStep(4)}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Authorize & Start Batch Disbursal
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: PROCESSING (LIVE BATCH PROGRESS BAR) */}
      {currentStep === 4 && (
        <Card elevation={2} className="space-y-6 text-center py-12 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-500)]/15 text-[var(--accent-500)] flex items-center justify-center mx-auto animate-pulse">
            <RotateCw className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[var(--text-primary)]">Executing Batch Disbursal Pipeline</h3>
            <p className="text-xs font-mono text-[var(--accent-500)] font-bold">{processingBatchName}</p>
          </div>

          {/* Live Progress Bar */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="w-full h-3 bg-[var(--bg-canvas)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent-500)] to-emerald-400"
                style={{ width: `${batchProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="text-xs font-mono font-bold text-[var(--text-tertiary)]">{batchProgress}% COMPLETED</div>
          </div>
        </Card>
      )}

      {/* STEP 5: COMPLETE & RECEIPT */}
      {currentStep === 5 && (
        <Card elevation={2} className="space-y-6 text-center py-8 max-w-xl mx-auto border-l-4 border-l-emerald-500">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <Badge variant="success" dot>PAYROLL DISBURSAL COMPLETED</Badge>
            <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Disbursal Successfully Executed</h3>
            <p className="text-xs text-[var(--text-tertiary)] font-mono">
              BATCH TX ID: #PAY-2026-0802-9481 • 184 ACCOUNTS CREDITED
            </p>
          </div>

          <div className="bg-[var(--bg-canvas)] p-4 rounded-xl border border-[var(--border-subtle)] text-xs text-left font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--text-tertiary)] font-sans">Total Disbursed:</span>
              <span className="font-bold text-emerald-400 text-sm">$142,736.40</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
              <span className="text-[var(--text-tertiary)] font-sans">Execution Timestamp:</span>
              <span className="font-semibold text-[var(--text-primary)]">August 2, 2026 • 05:15 PM</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download Audit Receipt (PDF)
            </Button>
            <Button variant="accent" size="sm" onClick={() => setCurrentStep(1)}>
              Return to Payroll Dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
