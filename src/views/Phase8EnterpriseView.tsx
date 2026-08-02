import React from 'react';
import { Globe, Building2, ShieldCheck, Layers } from 'lucide-react';
import { OrgHierarchyTreeView } from '../components/phase8/OrgHierarchyTreeView';
import { BulkLocationOperationsUI } from '../components/phase8/BulkLocationOperationsUI';
import { CrossLocationComparisonDashboard } from '../components/phase8/CrossLocationComparisonDashboard';
import { PermissionMatrixEditor } from '../components/phase8/PermissionMatrixEditor';
import { Badge } from '../components/ui/badge';

export const Phase8EnterpriseView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">ENTERPRISE SCALE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">50+ LOCATION HIERARCHY & RBAC MATRIX</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Enterprise Multi-Location Tree</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            50+ location hierarchy tree, multi-location floating action bar with undo buffer, cross-outlet sparklines comparison, and visual RBAC permission matrix.
          </p>
        </div>
      </div>

      {/* 50+ Location Hierarchy Tree View */}
      <OrgHierarchyTreeView />

      {/* Cross-Location Comparison Dashboard Sparklines */}
      <CrossLocationComparisonDashboard />

      {/* Roles x Permissions RBAC Matrix Editor */}
      <PermissionMatrixEditor />

      {/* Bulk Location Operations Action Bar */}
      <BulkLocationOperationsUI />
    </div>
  );
};
