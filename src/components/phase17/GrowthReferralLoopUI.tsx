import React, { useState } from 'react';
import { Gift, Copy, Check, Users, IndianRupee, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const GrowthReferralLoopUI: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://workforcesaas.in/invite/ref-apex-9481';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">PLG Team Invitation & Referral Credit Engine</h2>
            <Badge variant="accent font-mono">INR ₹ REWARD CREDIT</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Invite peer organizations to Workforce SaaS and earn ₹10,000 in payroll processing credits for every active referral.
          </p>
        </div>
      </div>

      {/* Referral Card */}
      <Card elevation={2} className="p-8 max-w-2xl mx-auto space-y-6 border-2 border-[var(--accent-500)]/40 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <IndianRupee className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[var(--text-primary)]">Give ₹10,000, Get ₹10,000</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
            When another business signs up using your link, both organizations receive a <strong>₹10,000 credit</strong> credited directly to your monthly subscription invoice.
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] font-mono text-xs max-w-md mx-auto">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-transparent px-2 text-[var(--text-primary)] focus:outline-none"
          />
          <Button
            variant="accent"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied Link!' : 'Copy Link'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
