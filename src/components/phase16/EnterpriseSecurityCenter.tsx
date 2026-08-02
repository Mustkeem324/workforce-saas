import React from 'react';
import { ShieldCheck, Lock, Key, Smartphone, Laptop, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const EnterpriseSecurityCenter: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Enterprise Security & SSO Center</h2>
            <Badge variant="accent">SOC 2 READINESS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Modeled on Google/GitHub security dashboards. Active sessions, SAML/OIDC SSO, and 2FA enforcement.
          </p>
        </div>

        <Badge variant="success">SOC 2 TYPE II COMPLIANT</Badge>
      </div>

      {/* Grid: Active Sessions, SSO Status, 2FA Enforcement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SAML/OIDC SSO Status */}
        <Card elevation={2} className="space-y-3 border-2 border-emerald-500/40">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">SAML 2.0 / OIDC SSO</h3>
            </div>
            <Badge variant="success">ACTIVE (Okta)</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Enterprise Single Sign-On configured with Okta IdP (`idp.workforce-saas.com`).
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Configure SAML Metadata
          </Button>
        </Card>

        {/* 2FA Enforcement */}
        <Card elevation={2} className="space-y-3 border-2 border-[var(--border-accent)]/40">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--accent-500)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">MFA / 2FA Enforcement</h3>
            </div>
            <Badge variant="accent">ENFORCED (100%)</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Mandatory TOTP authenticator app verification required for all manager roles.
          </p>
          <Button variant="secondary" size="sm" className="w-full">
            Inspect 2FA Compliance
          </Button>
        </Card>

        {/* Active Session Management */}
        <Card elevation={2} className="space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Active Device Sessions</h3>
            </div>
            <Badge variant="neutral">3 SESSIONS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Current session: macOS • Chrome 124 • Austin, TX (192.168.1.104).
          </p>
          <Button variant="destructive" size="sm" className="w-full">
            Revoke All Other Sessions
          </Button>
        </Card>
      </div>
    </div>
  );
};
