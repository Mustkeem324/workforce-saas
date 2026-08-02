import React from 'react';
import { IndianRupee, Download, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const BrandedPayslipPreview: React.FC = () => {
  return (
    <Card elevation={2} className="p-8 max-w-3xl mx-auto space-y-6 bg-white text-slate-900 border border-slate-200 shadow-xl font-sans">
      {/* Executive Header */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center">
            APEX
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Apex Logistics Fleet India Pvt. Ltd.</h2>
            <p className="text-xs text-slate-500 font-mono">100 Austin Hub, Suite 400 • GSTIN: 27AAAAA0000A1Z5</p>
          </div>
        </div>

        <div className="text-right font-mono tabular-nums">
          <Badge variant="accent">CONFIDENTIAL PAYSLIP</Badge>
          <div className="text-xs text-slate-500 mt-1">PAY PERIOD: JULY 16 - JULY 31, 2026</div>
        </div>
      </div>

      {/* Employee Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
        <div>
          <span className="text-slate-400 block text-[10px]">EMPLOYEE NAME</span>
          <span className="font-bold text-slate-900">Alex Rivera</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">EMPLOYEE ID</span>
          <span className="font-bold text-slate-900">EMP-9481</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">DESIGNATION</span>
          <span className="font-bold text-slate-900">Senior Tech Lead</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">BANK A/C NO.</span>
          <span className="font-bold text-slate-900">•••• •••• 4910</span>
        </div>
      </div>

      {/* Earnings & Deductions Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono tabular-nums">
        {/* Earnings */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-slate-900 font-sans border-b border-slate-200 pb-2">GROSS EARNINGS</h4>
          <div className="flex justify-between py-1"><span>Basic Salary</span><span>₹85,000.00</span></div>
          <div className="flex justify-between py-1"><span>House Rent Allowance (HRA)</span><span>₹34,000.00</span></div>
          <div className="flex justify-between py-1"><span>Special Allowance</span><span>₹18,500.00</span></div>
          <div className="flex justify-between py-1 text-emerald-600 font-bold border-t border-slate-200 pt-2">
            <span>TOTAL EARNINGS</span><span>₹1,37,500.00</span>
          </div>
        </div>

        {/* Deductions */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-slate-900 font-sans border-b border-slate-200 pb-2">STATUTORY DEDUCTIONS</h4>
          <div className="flex justify-between py-1"><span>Provident Fund (PF)</span><span>₹10,200.00</span></div>
          <div className="flex justify-between py-1"><span>Income Tax (TDS)</span><span>₹21,550.00</span></div>
          <div className="flex justify-between py-1"><span>Professional Tax (PT)</span><span>₹1,500.00</span></div>
          <div className="flex justify-between py-1 text-rose-600 font-bold border-t border-slate-200 pt-2">
            <span>TOTAL DEDUCTIONS</span><span>-₹33,250.00</span>
          </div>
        </div>
      </div>

      {/* Net Disbursal Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex justify-between items-center font-mono tabular-nums">
        <div>
          <span className="text-xs text-slate-400 block font-sans font-bold">NET PAYOUT AMOUNT</span>
          <div className="text-2xl font-black text-emerald-400">₹1,04,250.00</div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Direct Deposit Verified</div>
          <div className="text-emerald-400 font-bold">TX: #PAY-2026-0802-9481</div>
        </div>
      </div>
    </Card>
  );
};
