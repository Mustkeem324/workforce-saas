import React from 'react';
import { Gauge, WifiOff, AlertTriangle, Zap } from 'lucide-react';
import { OfflineModeSyncBanner } from '../components/phase13/OfflineModeSyncBanner';
import { OfflineConflictResolutionUI } from '../components/phase13/OfflineConflictResolutionUI';
import { PerceivedPerformanceAudit } from '../components/phase13/PerceivedPerformanceAudit';
import { Badge } from '../components/ui/badge';

export const Phase13PerformanceView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">OFFLINE ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">INDEXEDDB QUEUE & LATENCY AUDIT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Offline-First Engine & Latency Audit</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Persistent non-alarming amber offline banner with IndexedDB sync queue counter, side-by-side punch conflict resolution, and platform-wide latency audit.
          </p>
        </div>
      </div>

      {/* Persistent Non-Alarming Offline Banner */}
      <OfflineModeSyncBanner />

      {/* Side-by-Side Offline Punch Conflict Resolution */}
      <OfflineConflictResolutionUI />

      {/* Platform-Wide Latency Audit */}
      <PerceivedPerformanceAudit />
    </div>
  );
};
