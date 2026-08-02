import React, { useState } from 'react';
import { ShieldCheck, Archive, Activity } from 'lucide-react';
import { EnterpriseSecurityCenter } from '../components/phase16/EnterpriseSecurityCenter';
import { OrgDataExportTool } from '../components/phase16/OrgDataExportTool';
import { PublicTrustStatusPage } from '../components/phase16/PublicTrustStatusPage';
import { Badge } from '../components/ui/badge';

export const Phase16SecurityView: React.FC = () => {
  const [subTab, setSubTab] = useState<'security' | 'export' | 'status'>('security');

  const subTabs = [
    { id: 'security', label: '1. Enterprise Security & SSO Center', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Google/GitHub style security dashboard (SAML/2FA)' },
    { id: 'export', label: '2. Self-Serve Org Data Portability', icon: <Archive className="w-4 h-4" />, desc: 'Export all org data into encrypted ZIP archive' },
    { id: 'status', label: '3. Public Trust & Uptime Status Page', icon: <Activity className="w-4 h-4" />, desc: '99.99% real-time system operational status' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 16 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">TRUST, SECURITY UX & DATA PORTABILITY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 16 — Enterprise Security, Trust & Data Portability</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Google/GitHub-style security center, self-serve GDPR data export tool, and public trust status page.
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
        {subTab === 'security' && <EnterpriseSecurityCenter />}
        {subTab === 'export' && <OrgDataExportTool />}
        {subTab === 'status' && <PublicTrustStatusPage />}
      </div>
    </div>
  );
};
