import React from 'react';
import { Building2, Palette, ShieldCheck, Layers } from 'lucide-react';
import { LiveThemeCustomizer } from '../components/phase14/LiveThemeCustomizer';
import { FranchiseRollupDashboard } from '../components/phase14/FranchiseRollupDashboard';
import { Badge } from '../components/ui/badge';

export const Phase14WhiteLabelView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">WHITE-LABEL & FRANCHISE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">RESELLER THEME & PARENT-CHILD ROLLUP</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">White-Label Customizer & Franchise</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Reseller theme customizer with real-time admin console re-skinning preview pane, and permission-aware parent-child franchise rollup dashboard.
          </p>
        </div>
      </div>

      {/* Live-Preview Reseller Theme Customizer */}
      <LiveThemeCustomizer />

      {/* Franchise Parent-Child Rollup Dashboard */}
      <FranchiseRollupDashboard />
    </div>
  );
};
