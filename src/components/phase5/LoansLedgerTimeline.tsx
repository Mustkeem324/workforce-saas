import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, TrendingDown, CheckCircle2, Clock, Calendar, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface LoanTransaction {
  id: string;
  date: string;
  type: 'Disbursal' | 'Payroll Deduction' | 'Voluntary Paydown';
  amount: number;
  runningBalance: number;
  reference: string;
}

const SAMPLE_LOAN_TXS: LoanTransaction[] = [
  { id: 'tx-1', date: 'April 1, 2026', type: 'Disbursal', amount: 5000.00, runningBalance: 5000.00, reference: 'Emergency Advance #LA-9482' },
  { id: 'tx-2', date: 'May 1, 2026', type: 'Payroll Deduction', amount: -800.00, runningBalance: 4200.00, reference: 'Auto Deduction Pay Period #08' },
  { id: 'tx-3', date: 'June 1, 2026', type: 'Payroll Deduction', amount: -800.00, runningBalance: 3400.00, reference: 'Auto Deduction Pay Period #10' },
  { id: 'tx-4', date: 'July 1, 2026', type: 'Payroll Deduction', amount: -800.00, runningBalance: 2600.00, reference: 'Auto Deduction Pay Period #12' },
  { id: 'tx-5', date: 'August 1, 2026', type: 'Payroll Deduction', amount: -800.00, runningBalance: 1800.00, reference: 'Auto Deduction Pay Period #14' }
];

export const LoansLedgerTimeline: React.FC = () => {
  const [txs] = useState<LoanTransaction[]>(SAMPLE_LOAN_TXS);

  const initialPrincipal = 5000.00;
  const currentBalance = txs[txs.length - 1].runningBalance;
  const totalRepaid = initialPrincipal - currentBalance;
  const progressPercent = Math.round((totalRepaid / initialPrincipal) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Employee Loan Ledger & Amortization Timeline</h2>
            <Badge variant="accent">RUNNING BALANCE CHART</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Alex Rivera • Emergency Salary Advance #LA-9482
          </p>
        </div>

        <Badge variant="success">{progressPercent}% REPAID</Badge>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono tabular-nums">
        <Card elevation={1} className="space-y-1">
          <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">ORIGINAL PRINCIPAL</span>
          <div className="text-2xl font-extrabold text-[var(--text-primary)]">$5,000.00</div>
        </Card>

        <Card elevation={1} className="space-y-1">
          <span className="text-xs text-emerald-400 font-sans font-semibold">TOTAL REPAID TO DATE</span>
          <div className="text-2xl font-extrabold text-emerald-400">$3,200.00</div>
        </Card>

        <Card elevation={1} className="space-y-1 border-l-4 border-l-[var(--accent-500)]">
          <span className="text-xs text-[var(--accent-500)] font-sans font-semibold">OUTSTANDING BALANCE</span>
          <div className="text-2xl font-extrabold text-[var(--accent-500)]">$1,800.00</div>
        </Card>

        <Card elevation={1} className="space-y-1">
          <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">NEXT AUTO-DEDUCTION</span>
          <div className="text-2xl font-extrabold text-[var(--text-secondary)]">$800.00</div>
        </Card>
      </div>

      {/* AMORTIZATION CURVE RUNNING BALANCE CHART (VISUAL GRAPH) */}
      <Card elevation={2} className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Running Balance Amortization Curve</h3>
          <span className="text-xs font-mono text-[var(--accent-500)] font-bold">0% INTEREST PAYROLL ADVANCE</span>
        </div>

        {/* SVG Amortization Graph */}
        <div className="relative h-48 w-full bg-[var(--bg-canvas)] rounded-xl border border-[var(--border-subtle)] p-4 flex items-end">
          <svg className="w-full h-full overflow-visible">
            {/* Grid lines */}
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="var(--border-subtle)" strokeDasharray="4 4" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--border-subtle)" strokeDasharray="4 4" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="var(--border-subtle)" strokeDasharray="4 4" />

            {/* Amortization Curve Path */}
            <path
              d="M 20 20 L 180 40 L 340 60 L 500 80 L 660 100 L 820 120"
              fill="none"
              stroke="var(--accent-500)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Points on curve */}
            <circle cx="20" cy="20" r="6" fill="var(--accent-500)" />
            <circle cx="180" cy="40" r="6" fill="var(--accent-500)" />
            <circle cx="340" cy="60" r="6" fill="var(--accent-500)" />
            <circle cx="500" cy="80" r="6" fill="var(--accent-500)" />
            <circle cx="660" cy="100" r="6" fill="var(--accent-500)" />
            <circle cx="820" cy="120" r="6" fill="var(--accent-500)" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </Card>

      {/* TRANSACTION TIMELINE LEDGER */}
      <Card elevation={2} className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Transaction Audit History</h3>

        <div className="space-y-3 border-l-2 border-[var(--border-default)] pl-4">
          {txs.map((tx) => {
            const isDisbursal = tx.type === 'Disbursal';
            return (
              <div key={tx.id} className="relative space-y-1 text-xs">
                <div className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 border-[var(--bg-surface-raised)] ${isDisbursal ? 'bg-amber-500' : 'bg-emerald-400'}`} />
                <div className="flex items-center justify-between font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)] font-sans">{tx.type} — {tx.reference}</span>
                  <span className={`font-bold ${isDisbursal ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {isDisbursal ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] font-mono">
                  <span>{tx.date}</span>
                  <span>RUNNING BALANCE: ${tx.runningBalance.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
