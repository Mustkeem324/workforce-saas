import React from 'react';
import { Badge } from './badge';
import type { BadgeVariant } from './badge';

export interface PayrollRow {
  id: string;
  employeeName: string;
  role: string;
  avatarUrl?: string;
  regularHours: string;
  overtimeHours: string;
  hourlyRate: string;
  grossPay: string;
  taxDeduction: string;
  netPay: string;
  status: 'Approved' | 'Pending' | 'Flagged' | 'Paid';
}

export interface TableProps {
  data: PayrollRow[];
  enableTabularNums?: boolean;
}

export const PayrollTable: React.FC<TableProps> = ({ data, enableTabularNums = true }) => {
  const statusBadges: Record<PayrollRow['status'], { variant: BadgeVariant }> = {
    Paid: { variant: 'success' },
    Approved: { variant: 'accent' },
    Pending: { variant: 'warning' },
    Flagged: { variant: 'danger' }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] shadow-[var(--shadow-1)]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
            <th className="py-3 px-4">Employee</th>
            <th className="py-3 px-4 text-right">Regular Hrs</th>
            <th className="py-3 px-4 text-right">OT Hrs</th>
            <th className="py-3 px-4 text-right">Base Rate</th>
            <th className="py-3 px-4 text-right">Gross Pay</th>
            <th className="py-3 px-4 text-right">Tax (Est)</th>
            <th className="py-3 px-4 text-right">Net Payout</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="hover:bg-[var(--bg-element-hover)]/70 transition-colors duration-150 group"
            >
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/30 text-[var(--accent-500)] flex items-center justify-center font-bold text-xs shrink-0">
                    {row.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">{row.employeeName}</div>
                    <div className="text-xs text-[var(--text-tertiary)]">{row.role}</div>
                  </div>
                </div>
              </td>
              <td className={`py-3.5 px-4 text-right text-[var(--text-primary)] ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.regularHours}
              </td>
              <td className={`py-3.5 px-4 text-right ${row.overtimeHours !== '00.00' ? 'text-[var(--warning-text)] font-semibold' : 'text-[var(--text-tertiary)]'} ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.overtimeHours}
              </td>
              <td className={`py-3.5 px-4 text-right text-[var(--text-secondary)] ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.hourlyRate}
              </td>
              <td className={`py-3.5 px-4 text-right text-[var(--text-primary)] ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.grossPay}
              </td>
              <td className={`py-3.5 px-4 text-right text-[var(--text-tertiary)] ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.taxDeduction}
              </td>
              <td className={`py-3.5 px-4 text-right font-bold text-[var(--text-primary)] ${enableTabularNums ? 'tabular-nums font-mono' : ''}`}>
                {row.netPay}
              </td>
              <td className="py-3.5 px-4 text-center">
                <Badge variant={statusBadges[row.status].variant}>
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
