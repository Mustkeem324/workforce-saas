import React from 'react';
import { TrendingUp, BarChart3, Users, Lock } from 'lucide-react';
import { ExecutiveCfoDashboard } from '../components/phase11/ExecutiveCfoDashboard';
import { CohortRetentionGrid } from '../components/phase11/CohortRetentionGrid';
import { CrossTenantBenchmarkWidget } from '../components/phase11/CrossTenantBenchmarkWidget';
import { Badge } from '../components/ui/badge';

export const Phase11AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">EXECUTIVE INTELLIGENCE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CFO SUMMARY & COHORT RETENTION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Executive Intelligence & Cohorts</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Single-screen executive CFO summary dashboard with 1-tap PDF export, Amplitude-style retention cohorts, and anonymized vertical benchmarks.
          </p>
        </div>
      </div>

      {/* Single-Screen CFO Summary Dashboard */}
      <ExecutiveCfoDashboard />

      {/* Amplitude-Style Heatmap Cohort Retention Matrix */}
      <CohortRetentionGrid />

      {/* Anonymized Vertical Benchmarks Widget */}
      <CrossTenantBenchmarkWidget />
    </div>
  );
};
