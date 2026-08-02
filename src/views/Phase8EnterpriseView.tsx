import React, { useState } from 'react';
import { Layers, CheckSquare, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { OrgHierarchyTreeView } from '../components/phase8/OrgHierarchyTreeView';
import { BulkLocationOperationsUI } from '../components/phase8/BulkLocationOperationsUI';
import { CrossLocationComparisonDashboard } from '../components/phase8/CrossLocationComparisonDashboard';
import { PermissionMatrixEditor } from '../components/phase8/PermissionMatrixEditor';
import { Badge } from '../components/ui/badge';

export const Phase8EnterpriseView: React.FC = () => {
  const [subTab, setSubTab] = useState<'tree' | 'bulk' | 'compare' | 'rbac'>('tree');

  const subTabs = [
    { id: 'tree', label: '1. Org Hierarchy Tree (50+ Locations)', icon: <Layers className="w-4 h-4" />, desc: 'Collapsible Region → Cluster → Facility tree' },
    { id: 'bulk', label: '2. Bulk Location Operations', icon: <CheckSquare className="w-4 h-4" />, desc: 'Multi-select with persistent floating action bar' },
    { id: 'compare', label: '3. Cross-Location Comparison', icon: <ArrowUpDown className="w-4 h-4" />, desc: 'Side-by-side metric cards & sparkline trends' },
    { id: 'rbac', label: '4. Permission Matrix (RBAC)', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Roles x Permissions visual grid for procurement' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 8 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">MULTI-LOCATION & ENTERPRISE SCALE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 8 — Enterprise Multi-Location Architecture</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            50+ location hierarchy tree, multi-facility bulk operations bar, cross-location sparkline comparison, and procurement-ready RBAC matrix.
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
        {subTab === 'tree' && <OrgHierarchyTreeView />}
        {subTab === 'bulk' && <BulkLocationOperationsUI />}
        {subTab === 'compare' && <CrossLocationComparisonDashboard />}
        {subTab === 'rbac' && <PermissionMatrixEditor />}
      </div>
    </div>
  );
};
