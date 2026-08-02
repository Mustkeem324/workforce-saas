import React, { useState } from 'react';
import { DollarSign, Download, ChevronLeft, ChevronRight, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MonthlyPayslipCard {
  id: string;
  month: string;
  payPeriod: string;
  grossPay: number;
  netPay: number;
  deductions: number;
  status: 'PAID';
}

const PAYSLIP_CAROUSEL: MonthlyPayslipCard[] = [
  { id: 'ps-aug', month: 'August 2026', payPeriod: 'Jul 16 - Jul 31, 2026', grossPay: 3400.00, netPay: 2850.00, deductions: 550.00, status: 'PAID' },
  { id: 'ps-jul', month: 'July 2026', payPeriod: 'Jul 01 - Jul 15, 2026', grossPay: 3400.00, netPay: 2850.00, deductions: 550.00, status: 'PAID' },
  { id: 'ps-jun', month: 'June 2026', payPeriod: 'Jun 16 - Jun 30, 2026', grossPay: 3200.00, netPay: 2680.00, deductions: 520.00, status: 'PAID' }
];

export const PayslipCarouselHistory: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const currentPayslip = PAYSLIP_CAROUSEL[activeIdx];

  const handlePrev = () => {
    if (activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  const handleNext = () => {
    if (activeIdx < PAYSLIP_CAROUSEL.length - 1) setActiveIdx(activeIdx + 1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Payslip Carousel & YTD Earnings History</h2>
            <Badge variant="accent">PRIMARY RETENTION HOOK</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Swipeable monthly payslip carousel with itemized earnings and year-to-date earnings chart.
          </p>
        </div>
      </div>

      {/* YTD Earnings Summary Bar */}
      <Card elevation={1} className="p-6 bg-gradient-to-r from-[var(--accent-500)]/15 via-[var(--bg-surface-raised)] to-[var(--bg-surface-raised)] border border-[var(--accent-500)]/30 flex flex-wrap items-center justify-between gap-4 font-mono tabular-nums">
        <div>
          <span className="text-xs font-sans text-[var(--text-tertiary)] font-semibold">2026 YEAR-TO-DATE (YTD) GROSS EARNINGS</span>
          <div className="text-3xl font-black text-[var(--text-primary)]">$48,500.00</div>
        </div>
        <Badge variant="success">+$4,200 vs 2025</Badge>
      </Card>

      {/* SWIPEABLE PAYSLIP CAROUSEL */}
      <div className="relative max-w-xl mx-auto">
        <Card elevation={2} className="space-y-4 p-6 border-2 border-[var(--border-accent)]/40 relative">
          {/* Carousel Controls */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <button
              onClick={handlePrev}
              disabled={activeIdx === 0}
              className="p-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-element-hover)] disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </button>

            <div className="text-center font-sans">
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{currentPayslip.month}</h3>
              <p className="text-xs text-[var(--text-tertiary)] font-mono">{currentPayslip.payPeriod}</p>
            </div>

            <button
              onClick={handleNext}
              disabled={activeIdx === PAYSLIP_CAROUSEL.length - 1}
              className="p-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-element-hover)] disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>

          {/* Itemized Amounts */}
          <div className="space-y-3 font-mono tabular-nums text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--bg-canvas)]">
              <span className="font-sans text-[var(--text-secondary)] font-semibold">Gross Salary Earnings:</span>
              <span className="font-bold text-emerald-400 text-sm">${currentPayslip.grossPay.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--bg-canvas)]">
              <span className="font-sans text-[var(--text-secondary)] font-semibold">Total Tax & Benefit Deductions:</span>
              <span className="font-bold text-rose-400 text-sm">-${currentPayslip.deductions.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/40 font-bold">
              <span className="font-sans text-[var(--text-primary)]">NET DISBURSED PAYOUT:</span>
              <span className="text-[var(--accent-500)] text-base">${currentPayslip.netPay.toFixed(2)}</span>
            </div>
          </div>

          <Button variant="accent" size="sm" className="w-full" leftIcon={<Download className="w-4 h-4" />}>
            Download Official Payslip PDF
          </Button>
        </Card>
      </div>
    </div>
  );
};
