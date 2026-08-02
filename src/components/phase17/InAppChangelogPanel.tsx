import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, Gift, Rocket, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  features: string[];
}

const RELEASES: ReleaseNote[] = [
  {
    version: 'v2.8.0',
    date: 'August 2, 2026',
    title: 'Phase 14-17 Enterprise & Growth Release',
    features: [
      'White-label live theme customizer with real-time admin re-skinning preview.',
      'SAML 2.0 / OIDC SSO security center & self-serve GDPR org data exporter.',
      'Heatmap cohort employee retention matrix & anonymized cross-tenant benchmarks.'
    ]
  },
  {
    version: 'v2.6.0',
    date: 'July 15, 2026',
    title: 'Phase 10 Compliance & Audit Release',
    features: [
      'Side-by-side JSON diff inspection for all immutable audit log entries.',
      'Statutory compliance traffic-light dashboard for zero-lapse tax filings.'
    ]
  }
];

export const InAppChangelogPanel: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">In-App Release Notes & Feature Changelog</h2>
            <Badge variant="accent">NON-INTRUSIVE CHANGELOG</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Keeps power users and HR admins engaged with new platform capabilities as features roll out.
          </p>
        </div>
      </div>

      {/* Release Notes List */}
      <div className="space-y-4">
        {RELEASES.map(rel => (
          <Card key={rel.version} elevation={2} className="space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono">
              <div className="flex items-center gap-2">
                <Badge variant="accent">{rel.version}</Badge>
                <span className="font-bold text-sm font-sans text-[var(--text-primary)]">{rel.title}</span>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">{rel.date}</span>
            </div>

            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              {rel.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};
