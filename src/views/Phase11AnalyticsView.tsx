import React, { useState } from 'react';
import { FileText, HeartPulse, TrendingUp } from 'lucide-react';
import { ExecutiveCfoDashboard } from '../components/phase11/ExecutiveCfoDashboard';
import { CohortRetentionGrid } from '../components/phase11/CohortRetentionGrid';
import { CrossTenantBenchmarkWidget } from '../components/phase11/CrossTenantBenchmarkWidget';
import { Badge } from '../components/ui/badge';

export const Phase11AnalyticsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'exec' | 'cohort' | 'benchmarks'>('exec');

  const subTabs = [
    { id: 'exec', label: '1. Executive CFO Single-Screen Summary', icon: <FileText className="w-4 h-4" />, desc: 'Print/export-ready dense summary for founders & CFOs' },
    { id: 'cohort', label: '2. Cohort Retention Heatmap Grid', icon: <HeartPulse className="w-4 h-4" />, desc: 'Product-analytics style employee retention cohorts' },
    { id: 'benchmarks', label: '3. Anonymized Cross-Tenant Benchmarks', icon: <TrendingUp className="w-4 h-4" />, desc: 'Vertical benchmarks with privacy opt-in toggle' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 11 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">ADVANCED ANALYTICS & INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 11 — Advanced Workforce Intelligence Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Single-screen CFO summary, Amplitude-style retention cohorts, and anonymized cross-tenant benchmarks.
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
        {subTab === 'exec' && <ExecutiveCfoDashboard />}
        {subTab === 'cohort' && <CohortRetentionGrid />}
        {subTab === 'benchmarks' && <CrossTenantBenchmarkWidget />}
      </div>
    </div>
  );
};
