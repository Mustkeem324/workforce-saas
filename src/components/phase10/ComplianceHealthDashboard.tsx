import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Clock, MapPin, Sparkles, Building2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface StatutoryComplianceItem {
  id: string;
  facility: string;
  requirement: string;
  jurisdiction: string;
  status: 'COMPLIANT' | 'NEEDS ATTENTION' | 'NON-COMPLIANT';
  dueDate: string;
  lastFiled: string;
}

const STATUTORY_ITEMS: StatutoryComplianceItem[] = [
  {
    id: 'st-1',
    facility: 'Austin Distribution Hub',
    requirement: 'Form 941 Employer Quarterly Tax Deposit',
    jurisdiction: 'Federal / IRS',
    status: 'COMPLIANT',
    dueDate: 'Sep 30, 2026',
    lastFiled: 'Jul 15, 2026'
  },
  {
    id: 'st-2',
    facility: 'Austin Distribution Hub',
    requirement: 'OSHA 300 Workplace Safety Logs',
    jurisdiction: 'Texas OSHA',
    status: 'COMPLIANT',
    dueDate: 'Dec 31, 2026',
    lastFiled: 'Aug 01, 2026'
  },
  {
    id: 'st-3',
    facility: 'Dallas Field Facility',
    requirement: 'State Payroll Tax Withholding Return',
    jurisdiction: 'State of Texas',
    status: 'NEEDS ATTENTION',
    dueDate: 'Aug 10, 2026',
    lastFiled: 'Jun 30, 2026'
  },
  {
    id: 'st-4',
    facility: 'Houston Freight Terminal',
    requirement: 'Form I-9 Physical Verification Audit',
    jurisdiction: 'USCIS Compliance',
    status: 'NON-COMPLIANT',
    dueDate: 'Aug 01, 2026 (Lapsed)',
    lastFiled: 'Unfiled'
  }
];

export const ComplianceHealthDashboard: React.FC = () => {
  const [items] = useState<StatutoryComplianceItem[]>(STATUTORY_ITEMS);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Statutory Compliance Traffic-Light Dashboard</h2>
            <Badge variant="accent">ZERO-LAPSE SYSTEM</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Traffic-light status per statutory requirement per facility location so no filing silently lapses.
          </p>
        </div>

        <Badge variant="success">94% COMPLIANCE HEALTH SCORE</Badge>
      </div>

      {/* Traffic-Light Status Matrix Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => {
          const isCompliant = item.status === 'COMPLIANT';
          const isWarning = item.status === 'NEEDS ATTENTION';

          return (
            <Card
              key={item.id}
              elevation={2}
              className={`space-y-4 border-2 ${
                isCompliant ? 'border-emerald-500/30' : isWarning ? 'border-amber-500/50' : 'border-rose-500/60'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  {/* Traffic Light Dot Indicator */}
                  <div 
                    className={`w-3.5 h-3.5 rounded-full ${
                      isCompliant ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]' : isWarning ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B] animate-pulse' : 'bg-rose-500 shadow-[0_0_8px_#EF4444] animate-pulse'
                    }`} 
                  />
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.requirement}</h3>
                </div>

                <Badge variant={isCompliant ? 'success' : isWarning ? 'warning' : 'danger'}>
                  {item.status}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-tertiary)] font-sans">Facility Location:</span>
                  <span className="font-bold text-[var(--text-primary)]">{item.facility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-tertiary)] font-sans">Jurisdiction:</span>
                  <span className="text-[var(--accent-500)]">{item.jurisdiction}</span>
                </div>
                <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                  <span className="text-[var(--text-tertiary)] font-sans">Filing Due Date:</span>
                  <span className={`font-bold ${isCompliant ? 'text-[var(--text-primary)]' : 'text-rose-400'}`}>{item.dueDate}</span>
                </div>
              </div>

              {!isCompliant && (
                <Button variant={isWarning ? 'accent' : 'destructive'} size="sm" className="w-full">
                  File Statutory Return Now
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
