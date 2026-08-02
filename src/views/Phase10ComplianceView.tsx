import React, { useState } from 'react';
import { ShieldCheck, History, FileText } from 'lucide-react';
import { ImmutableAuditTrailViewer } from '../components/phase10/ImmutableAuditTrailViewer';
import { ComplianceHealthDashboard } from '../components/phase10/ComplianceHealthDashboard';
import { EmployeeDocumentVault } from '../components/phase10/EmployeeDocumentVault';
import { Badge } from '../components/ui/badge';

export const Phase10ComplianceView: React.FC = () => {
  const [subTab, setSubTab] = useState<'audit' | 'health' | 'vault'>('audit');

  const subTabs = [
    { id: 'audit', label: '1. Immutable Audit Trail Log', icon: <History className="w-4 h-4" />, desc: 'Filterable log with side-by-side diff inspection' },
    { id: 'health', label: '2. Statutory Compliance Health', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Traffic-light status matrix per statutory requirement' },
    { id: 'vault', label: '3. Employee Document Vault', icon: <FileText className="w-4 h-4" />, desc: 'Passport-renewal style document expiry reminders' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 10 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">COMPLIANCE & AUDIT TRAIL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 10 — Compliance, Audit Trail & Document Vault</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Immutable system audit logs with side-by-side diffs, statutory compliance traffic-light status, and document expiry reminders.
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
        {subTab === 'audit' && <ImmutableAuditTrailViewer />}
        {subTab === 'health' && <ComplianceHealthDashboard />}
        {subTab === 'vault' && <EmployeeDocumentVault />}
      </div>
    </div>
  );
};
