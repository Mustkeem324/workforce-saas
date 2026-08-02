import React from 'react';
import { History, ShieldCheck, FileCheck, Lock } from 'lucide-react';
import { ImmutableAuditTrailViewer } from '../components/phase10/ImmutableAuditTrailViewer';
import { ComplianceHealthDashboard } from '../components/phase10/ComplianceHealthDashboard';
import { EmployeeDocumentVault } from '../components/phase10/EmployeeDocumentVault';
import { Badge } from '../components/ui/badge';

export const Phase10ComplianceView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">STATUTORY COMPLIANCE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">IMMUTABLE AUDIT TRAIL & DOCUMENT VAULT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Statutory Compliance & Audit Logs</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Immutable audit log with side-by-side JSON diff inspection modal, statutory traffic-light compliance matrix, and employee document vault.
          </p>
        </div>
      </div>

      {/* Statutory Traffic-Light Compliance Health Dashboard */}
      <ComplianceHealthDashboard />

      {/* Immutable Audit Trail Log Viewer */}
      <ImmutableAuditTrailViewer />

      {/* Employee Document Vault & Renewal Tracking */}
      <EmployeeDocumentVault />
    </div>
  );
};
