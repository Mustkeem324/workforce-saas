import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, Database, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const OfflineModeSyncBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(true);
  const [queuedCount, setQueuedCount] = useState(4);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setQueuedCount(0);
      setIsSyncing(false);
      setIsOffline(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <WifiOff className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Offline-First Engine & Persistent Sync Banner</h2>
            <Badge variant="warning">NON-ALARMING OFFLINE UX</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Designed for warehouses with poor connectivity. Persistent, non-alarming banner with IndexedDB queue.
          </p>
        </div>

        <Button
          variant={isOffline ? 'warning' : 'outline'}
          size="sm"
          onClick={() => setIsOffline(!isOffline)}
        >
          {isOffline ? 'Simulating Offline Mode' : 'Simulating Online Mode'}
        </Button>
      </div>

      {/* PERSISTENT NON-ALARMING OFFLINE BANNER */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-300 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-amber-200 font-sans block">
                  Offline Mode Active — Local Storage Enabled
                </span>
                <span className="text-[11px] text-amber-300/80">
                  {queuedCount} punches queued in IndexedDB • Will auto-sync when network reconnects
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="warning">{queuedCount} QUEUED</Badge>
              <Button
                variant="accent"
                size="sm"
                onClick={handleSyncNow}
                disabled={isSyncing || queuedCount === 0}
                leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />}
              >
                {isSyncing ? 'Syncing Queue...' : 'Force Trigger Sync'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOffline && queuedCount === 0 && (
        <Card elevation={2} className="p-6 text-center space-y-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
          <CheckCircle2 className="w-8 h-8 mx-auto" />
          <h3 className="text-base font-bold">Network Connected & Synced</h3>
          <p className="text-xs text-emerald-300">All local IndexedDB punches have been successfully reconciled with server.</p>
        </Card>
      )}
    </div>
  );
};
