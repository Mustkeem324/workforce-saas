import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, ChevronRight, Bell } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface ChangelogItem {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  tag: string;
}

const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    id: 'ch-1',
    version: 'v2.8.0',
    date: 'August 02, 2026',
    title: 'Enterprise & Growth Architecture Release',
    description: 'Released SAML/OIDC SSO security center, self-serve GDPR data exporter, and ₹10,000 PLG referral program.',
    tag: 'ENTERPRISE'
  },
  {
    id: 'ch-2',
    version: 'v2.4.0',
    date: 'July 20, 2026',
    title: 'Statutory Compliance & Audit Trail Release',
    description: 'Implemented immutable audit log with side-by-side JSON diffs and statutory compliance dashboard.',
    tag: 'COMPLIANCE'
  }
];

export const InAppChangelogPanel: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">In-App Feature Release Changelog</h2>
            <Badge variant="accent font-mono">v2.8.0 LIVE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Non-intrusive release notes panel notifying users of recent system updates and platform features.
          </p>
        </div>
      </div>

      {/* Changelog Timeline */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {CHANGELOG_ITEMS.map(item => (
          <Card key={item.id} elevation={1} className="p-6 space-y-3 border-l-4 border-l-[var(--accent-500)]">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral font-mono">{item.version}</Badge>
                  <Badge variant="accent">{item.tag}</Badge>
                </div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)] mt-1">{item.title}</h3>
              </div>
              <span className="text-xs text-[var(--text-tertiary)] font-mono">{item.date}</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
