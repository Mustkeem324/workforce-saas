import React, { useState } from 'react';
import { Palette, Building2 } from 'lucide-react';
import { LiveThemeCustomizer } from '../components/phase14/LiveThemeCustomizer';
import { FranchiseRollupDashboard } from '../components/phase14/FranchiseRollupDashboard';
import { Badge } from '../components/ui/badge';

export const Phase14WhiteLabelView: React.FC = () => {
  const [subTab, setSubTab] = useState<'theme' | 'franchise'>('theme');

  const subTabs = [
    { id: 'theme', label: '1. White-Label Live Theme Customizer', icon: <Palette className="w-4 h-4" />, desc: 'Real-time admin console re-skinning preview pane' },
    { id: 'franchise', label: '2. Franchise Rollup Dashboard', icon: <Building2 className="w-4 h-4" />, desc: 'Parent-child aggregated metrics & permission-aware UI' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 14 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">WHITE-LABEL & FRANCHISE SUPPORT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 14 — White-Label & Franchise Ecosystem</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real-time theme customizer with admin preview pane and permission-aware parent-child franchise rollups.
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
        {subTab === 'theme' && <LiveThemeCustomizer />}
        {subTab === 'franchise' && <FranchiseRollupDashboard />}
      </div>
    </div>
  );
};
