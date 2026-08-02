import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, Check, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface PunchConflictItem {
  id: string;
  employeeName: string;
  location: string;
  clientTime: string;
  serverTime: string;
  diffMinutes: number;
  reason: string;
}

const SAMPLE_CONFLICTS: PunchConflictItem[] = [
  {
    id: 'conf-1',
    employeeName: 'Taylor Reed',
    location: 'Austin Distribution Hub',
    clientTime: '08:00:00 AM (Device IndexedDB)',
    serverTime: '08:04:12 AM (Cellular Tower Ping)',
    diffMinutes: 4.2,
    reason: 'Network dropped during punch; device clock skewed by 4.2 mins.'
  }
];

export const OfflineConflictResolutionUI: React.FC = () => {
  const [conflicts, setConflicts] = useState<PunchConflictItem[]>(SAMPLE_CONFLICTS);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  const handleResolve = (id: string, choice: 'client' | 'server') => {
    setResolvedId(id);
    setTimeout(() => {
      setConflicts(prev => prev.filter(c => c.id !== id));
      setResolvedId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Offline Punch Conflict Resolution Prompt</h2>
            <Badge variant="accent">NO SILENT WINNERS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Presents a side-by-side diff when offline punches conflict with server timestamps instead of silently guessing.
          </p>
        </div>
      </div>

      {conflicts.length > 0 ? (
        conflicts.map(conf => (
          <Card key={conf.id} elevation={2} className="space-y-6 border-2 border-amber-500/50 p-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">{conf.employeeName}</h3>
                <p className="text-xs text-[var(--text-tertiary)] font-mono">{conf.location} • Diff: +{conf.diffMinutes} mins</p>
              </div>

              <Badge variant="warning">PUNCH TIMING DISCREPANCY</Badge>
            </div>

            {/* Side-by-Side Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {/* Option A: Client Offline Punch */}
              <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex justify-between items-center font-sans font-bold text-amber-400">
                  <span>OPTION A: CLIENT OFFLINE PUNCH</span>
                  <Badge variant="neutral font-mono">IndexedDB</Badge>
                </div>

                <div className="text-lg font-black text-[var(--text-primary)]">{conf.clientTime}</div>
                <p className="text-[11px] text-[var(--text-tertiary)] font-sans">
                  Captured locally on mobile device at exact tap moment.
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleResolve(conf.id, 'client')}
                >
                  Accept Client Offline Time
                </Button>
              </div>

              {/* Option B: Server Reconciled Timestamp */}
              <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex justify-between items-center font-sans font-bold text-emerald-400">
                  <span>OPTION B: SERVER RECONCILED TIME</span>
                  <Badge variant="success font-mono">Cellular Ping</Badge>
                </div>

                <div className="text-lg font-black text-[var(--text-primary)]">{conf.serverTime}</div>
                <p className="text-[11px] text-[var(--text-tertiary)] font-sans">
                  Reconciled via network cellular tower arrival timestamp.
                </p>

                <Button
                  variant="accent"
                  size="sm"
                  className="w-full"
                  onClick={() => handleResolve(conf.id, 'server')}
                >
                  Accept Server Reconciled Time
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card elevation={2} className="p-8 text-center space-y-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="w-8 h-8 mx-auto" />
          <h3 className="text-base font-bold">All Offline Conflicts Resolved</h3>
          <p className="text-xs text-emerald-300">No pending punch timing discrepancies requiring manager resolution.</p>
        </Card>
      )}
    </div>
  );
};
