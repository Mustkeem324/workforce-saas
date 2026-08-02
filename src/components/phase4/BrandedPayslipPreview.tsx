import React from 'react';
import { Download, Printer, Building2, CheckCircle2, ShieldCheck, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface PayslipProps {
  employeeName?: string;
  role?: string;
  payPeriod?: string;
  payDate?: string;
}

export const BrandedPayslipPreview: React.FC<PayslipProps> = ({
  employeeName = 'Alex Rivera',
  role = 'Senior Tech Lead',
  payPeriod = 'July 20, 2026 – August 02, 2026',
  payDate = 'August 02, 2026'
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Toolbar */}
      <div className="flex items-center justify-between bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <Badge variant="accent">BRANDED PAYSLIP STUDIO</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">PRINT & EXPORT ENGINE</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print Document
          </Button>
          <Button variant="accent" size="sm" onClick={handlePrint} leftIcon={<Download className="w-4 h-4" />}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* High-Grade Branded Payslip Document Container */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 space-y-8 font-sans selection:bg-[var(--accent-500)] selection:text-white print:p-0 print:shadow-none print:border-none">
        
        {/* Payslip Header */}
        <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-slate-900 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E05A47] to-slate-900 text-white flex items-center justify-center font-black text-base shadow-md">
                WF
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Workforce SaaS Technologies, Inc.</h1>
                <p className="text-xs text-slate-500 font-medium">Austin Distribution Center • Facility 04</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              100 Innovation Way, Suite 400 • Austin, TX 78701<br />
              Tax ID: XX-XXX9482 • payroll-support@workforce-saas.com
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="inline-block px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider">
              OFFICIAL EARNINGS STATEMENT
            </div>
            <div className="text-xs text-slate-500 font-mono pt-1">PAYSLIP NO: #PS-2026-0802-104</div>
            <div className="text-xs text-slate-700 font-semibold font-mono">PAY DATE: {payDate}</div>
          </div>
        </div>

        {/* Employee & Pay Period Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">EMPLOYEE NAME</span>
            <span className="font-extrabold text-slate-900 text-sm">{employeeName}</span>
            <span className="text-slate-500 block text-[11px]">{role}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">EMPLOYEE ID</span>
            <span className="font-mono font-bold text-slate-800">EMP-9482</span>
            <span className="text-slate-500 block text-[11px]">SSN: XXX-XX-4829</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">PAY PERIOD</span>
            <span className="font-semibold text-slate-800">{payPeriod}</span>
            <span className="text-slate-500 block text-[11px]">Bi-Weekly Cycle</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">DISBURSAL METHOD</span>
            <span className="font-semibold text-slate-800">Direct Deposit</span>
            <span className="text-slate-500 block text-[11px]">Chase Bank (****4920)</span>
          </div>
        </div>

        {/* Earnings & Deductions Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Earnings Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 flex items-center justify-between">
              <span>Itemized Earnings</span>
              <span className="text-[10px] text-slate-500 font-normal">HOURS / RATE</span>
            </h3>

            <table className="w-full text-xs font-mono tabular-nums">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Regular Wages</td>
                  <td className="py-2 text-right text-slate-500 font-sans">40.0h @ $48.50/h</td>
                  <td className="py-2 text-right font-bold text-slate-900">$1,940.00</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Overtime Wages (1.5x)</td>
                  <td className="py-2 text-right text-slate-500 font-sans">04.5h @ $72.75/h</td>
                  <td className="py-2 text-right font-bold text-slate-900">$327.38</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Shift Differential Bonus</td>
                  <td className="py-2 text-right text-slate-500 font-sans">Flat Rate</td>
                  <td className="py-2 text-right font-bold text-slate-900">$100.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-900 font-bold">
                  <td colSpan={2} className="py-2.5 font-sans uppercase text-slate-900">Total Gross Earnings</td>
                  <td className="py-2.5 text-right text-slate-900 text-sm">$2,367.38</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Itemized Deductions Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 flex items-center justify-between">
              <span>Itemized Deductions</span>
              <span className="text-[10px] text-slate-500 font-normal">TYPE</span>
            </h3>

            <table className="w-full text-xs font-mono tabular-nums">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Federal Income Tax</td>
                  <td className="py-2 text-right text-slate-500 font-sans">Statutory</td>
                  <td className="py-2 text-right font-bold text-slate-900">-$284.08</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Social Security (FICA)</td>
                  <td className="py-2 text-right text-slate-500 font-sans">6.2% Rate</td>
                  <td className="py-2 text-right font-bold text-slate-900">-$146.78</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">Medicare Tax</td>
                  <td className="py-2 text-right text-slate-500 font-sans">1.45% Rate</td>
                  <td className="py-2 text-right font-bold text-slate-900">-$34.33</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans font-medium text-slate-800">401(k) Retirement Pre-Tax</td>
                  <td className="py-2 text-right text-slate-500 font-sans">4.0% Voluntary</td>
                  <td className="py-2 text-right font-bold text-slate-900">-$94.69</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-900 font-bold">
                  <td colSpan={2} className="py-2.5 font-sans uppercase text-slate-900">Total Deductions</td>
                  <td className="py-2.5 text-right text-rose-600 text-sm">-$559.88</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* NET PAYOUT SUMMARY HIGHLIGHT BOX */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">NET TAKE-HOME PAYOUT</span>
            <p className="text-xs text-slate-300 mt-0.5">Direct Deposited to Chase Bank (****4920) on {payDate}</p>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-extrabold font-mono tabular-nums tracking-tight text-[#F07E6D]">
              $1,807.50
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              ELECTRONIC TRANSFER VERIFIED
            </span>
          </div>
        </div>

        {/* Footer Audit Stamp */}
        <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 font-mono flex flex-wrap justify-between gap-2">
          <span>WORKFORCE SAAS PAYROLL ENGINE V4.0 • COMPLIANCE AUDITED</span>
          <span>DOCUMENT DIGEST: 8F92-491A-882C-0021</span>
        </div>
      </div>
    </div>
  );
};
