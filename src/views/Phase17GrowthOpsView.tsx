import React, { useState } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { InAppChangelogPanel } from '../components/phase17/InAppChangelogPanel';
import { GrowthReferralLoopUI } from '../components/phase17/GrowthReferralLoopUI';
import { Badge } from '../components/ui/badge';

export const Phase17GrowthOpsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'changelog' | 'growth'>('changelog');

  const subTabs = [
    { id: 'changelog', label: '1. In-App Release Notes & Changelog', icon: <Sparkles className="w-4 h-4" />, desc: 'Non-intrusive release notes for HR admins' },
    { id: 'growth', label: '2. PLG Growth & Team Referral Loop', icon: <Gift className="w-4 h-4" />, desc: 'Viral invitation flow with $150 payroll credit incentive' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 17 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CONTINUOUS DESIGN OPS & GROWTH LOOPS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 17 — Continuous Design Ops, Changelogs & PLG Growth</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Non-intrusive release notes changelog and high-converting team invitation growth loop.
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
        {subTab === 'changelog' && <InAppChangelogPanel />}
        {subTab === 'growth' && <GrowthReferralLoopUI />}
      </div>
    </div>
  );
};
