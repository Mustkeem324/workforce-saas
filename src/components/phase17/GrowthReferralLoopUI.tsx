import React, { useState } from 'react';
import { Gift, Copy, Check, Users, Sparkles, Send } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const GrowthReferralLoopUI: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const referralLink = 'https://workforce-saas.com/invite?ref=apex_logistics_9481';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">PLG Referral & Team Invite Growth Loop</h2>
            <Badge variant="accent">VIRAL GROWTH ENGINE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Invite partner facilities and earn $150 payroll credit per active tenant onboarding.
          </p>
        </div>
      </div>

      {/* Referral Link & Incentive Box */}
      <Card elevation={2} className="p-8 max-w-xl mx-auto space-y-6 border-2 border-[var(--border-accent)]/40 text-center">
        <div className="space-y-2">
          <Badge variant="neutral font-mono">$150 PAYROLL CREDIT PER REFERRAL</Badge>
          <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
            Invite Partner Facilities to Workforce SaaS
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">
            Share your exclusive referral link. Your partner gets 30 days free, and you get $150 credit on your next payroll run.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 text-xs"
          />
          <Button
            variant="accent"
            size="sm"
            onClick={handleCopyLink}
            leftIcon={copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          >
            {copiedLink ? 'Copied Link!' : 'Copy Link'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
