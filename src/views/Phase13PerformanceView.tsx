import React, { useState } from 'react';
import { WifiOff, AlertTriangle, Gauge } from 'lucide-react';
import { OfflineModeSyncBanner } from '../components/phase13/OfflineModeSyncBanner';
import { OfflineConflictResolutionUI } from '../components/phase13/OfflineConflictResolutionUI';
import { PerceivedPerformanceAudit } from '../components/phase13/PerceivedPerformanceAudit';
import { Badge } from '../components/ui/badge';

export const Phase13PerformanceView: React.FC = () => {
  const [subTab, setSubTab] = useState<'offline' | 'conflict' | 'audit'>('offline');

  const subTabs = [
    { id: 'offline', label: '1. Offline Banner & IndexedDB Queue', icon: <WifiOff className="w-4 h-4" />, desc: 'Persistent non-alarming offline indicator & sync counter' },
    { id: 'conflict', label: '2. Offline Conflict Resolution', icon: <AlertTriangle className="w-4 h-4" />, desc: 'Side-by-side prompt when offline punches conflict' },
    { id: 'audit', label: '3. Perceived Performance Audit (<100ms)', icon: <Gauge className="w-4 h-4" />, desc: 'Platform-wide latency audit and optimistic UI pass' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 13 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">PERFORMANCE, RELIABILITY & OFFLINE-FIRST</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 13 — Performance, Reliability & Offline Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Persistent non-alarming offline banner, side-by-side conflict resolution, and platform-wide latency audit (&lt;100ms target).
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
        {subTab === 'offline' && <OfflineModeSyncBanner />}
        {subTab === 'conflict' && <OfflineConflictResolutionUI />}
        {subTab === 'audit' && <PerceivedPerformanceAudit />}
      </div>
    </div>
  );
};
