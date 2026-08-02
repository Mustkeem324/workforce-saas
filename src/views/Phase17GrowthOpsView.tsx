import React from 'react';
import { Gift, FileText, Sparkles, Users } from 'lucide-react';
import { InAppChangelogPanel } from '../components/phase17/InAppChangelogPanel';
import { GrowthReferralLoopUI } from '../components/phase17/GrowthReferralLoopUI';
import { Badge } from '../components/ui/badge';

export const Phase17GrowthOpsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">DESIGN OPS & GROWTH</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CHANGELOG & PLG REFERRALS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Design Ops Changelog & Referral Loop</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Non-intrusive in-app release notes changelog panel, and PLG team invitation growth loop with ₹10,000 payroll credit incentive.
          </p>
        </div>
      </div>

      {/* Non-Intrusive In-App Release Notes Changelog Panel */}
      <InAppChangelogPanel />

      {/* PLG Team Invitation Growth Loop */}
      <GrowthReferralLoopUI />
    </div>
  );
};
