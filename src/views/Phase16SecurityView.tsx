import React from 'react';
import { Lock, ShieldCheck, Download, Server } from 'lucide-react';
import { EnterpriseSecurityCenter } from '../components/phase16/EnterpriseSecurityCenter';
import { OrgDataExportTool } from '../components/phase16/OrgDataExportTool';
import { PublicTrustStatusPage } from '../components/phase16/PublicTrustStatusPage';
import { Badge } from '../components/ui/badge';

export const Phase16SecurityView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">ENTERPRISE TRUST & SECURITY</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">SSO, 2FA & GDPR PORTABILITY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Security Center & Data Exporter</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Single-screen security center (SAML/OIDC SSO, 2FA, session revoking), self-serve GDPR org data export tool with encrypted ZIP download, and public status page.
          </p>
        </div>
      </div>

      {/* Security Center */}
      <EnterpriseSecurityCenter />

      {/* Self-Serve GDPR Org Data Export Tool */}
      <OrgDataExportTool />

      {/* Public 99.99% Status Page */}
      <PublicTrustStatusPage />
    </div>
  );
};
