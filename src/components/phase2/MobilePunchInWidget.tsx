import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  Clock, 
  RotateCw, 
  Radio, 
  ShieldCheck, 
  AlertTriangle,
  Play,
  Square,
  Coffee,
  CloudUpload
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface QueuedPunch {
  id: string;
  type: 'Clock In' | 'Break Start' | 'Break End' | 'Clock Out';
  timestamp: string;
  coords: string;
}

export const MobilePunchInWidget: React.FC = () => {
  // Mobile app state
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isNetworkOnline, setIsNetworkOnline] = useState(true);
  const [isOptimisticPunching, setIsOptimisticPunching] = useState(false);
  const [showRippleAnimation, setShowRippleAnimation] = useState(false);
  const [lastPunchTime, setLastPunchTime] = useState<string | null>(null);
  const [offlineQueue, setOfflineQueue] = useState<QueuedPunch[]>([]);
  const [isSyncingOfflineQueue, setIsSyncingOfflineQueue] = useState(false);

  // GPS Status
  const gpsAccuracy = 3.2;
  const isGeofenceValid = true;

  // Single-Tap Optimistic Punch Handler
  const handleSingleTapPunch = (action: 'Clock In' | 'Clock Out' | 'Break') => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. Instant Tactile Ripple & Animation Feedback
    setShowRippleAnimation(true);
    setTimeout(() => setShowRippleAnimation(false), 800);

    // 2. OPTIMISTIC UI: Instant state mutation in UI before server round-trip!
    setIsOptimisticPunching(true);
    setLastPunchTime(now);

    if (action === 'Clock In') {
      setIsClockedIn(true);
      setIsOnBreak(false);
    } else if (action === 'Clock Out') {
      setIsClockedIn(false);
      setIsOnBreak(false);
    } else if (action === 'Break') {
      setIsOnBreak(!isOnBreak);
    }

    // 3. Offline vs Online handling
    if (!isNetworkOnline) {
      // Queue punch locally
      const queued: QueuedPunch = {
        id: `offline-${Date.now()}`,
        type: action === 'Break' ? (isOnBreak ? 'Break End' : 'Break Start') : action,
        timestamp: now,
        coords: '30.2672° N, 97.7431° W (Cached)'
      };
      setOfflineQueue(prev => [queued, ...prev]);
      setIsOptimisticPunching(false);
    } else {
      // Reconcile with server asynchronously in background (simulated 600ms latency)
      setTimeout(() => {
        setIsOptimisticPunching(false);
      }, 600);
    }
  };

  // Sync Offline Queue
  const handleSyncOfflineQueue = () => {
    if (offlineQueue.length === 0) return;
    setIsSyncingOfflineQueue(true);
    setTimeout(() => {
      setOfflineQueue([]);
      setIsSyncingOfflineQueue(false);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Mobile Device Frame Mockup */}
      <div className="bg-[var(--bg-surface-raised)] border-2 border-[var(--border-strong)] rounded-3xl p-6 shadow-[var(--shadow-4)] relative overflow-hidden">
        {/* Device Notch & Status Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] mb-4 border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-1 font-semibold text-[var(--text-primary)]">
            <Radio className="w-3.5 h-3.5 text-[var(--accent-500)] animate-pulse" />
            <span>5G GEOFENCE ACTIVE</span>
          </div>

          {/* Network Switcher Toggle */}
          <button
            onClick={() => setIsNetworkOnline(!isNetworkOnline)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] font-bold transition-all ${
              isNetworkOnline 
                ? 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]' 
                : 'bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)]'
            }`}
          >
            {isNetworkOnline ? (
              <>
                <Wifi className="w-3 h-3 text-[var(--success-solid)]" />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-[var(--danger-solid)]" />
                <span>OFFLINE MODE</span>
              </>
            )}
          </button>
        </div>

        {/* Offline Queue Banner */}
        <AnimatePresence>
          {offlineQueue.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 p-3 rounded-xl bg-[var(--warning-bg)] border border-[var(--warning-border)] text-[var(--warning-text)] text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CloudUpload className="w-4 h-4 text-[var(--warning-solid)] animate-bounce shrink-0" />
                <div>
                  <span className="font-bold">{offlineQueue.length} Punch{offlineQueue.length > 1 ? 'es' : ''} Queued Offline</span>
                  <p className="text-[10px] opacity-80">Saved locally in encrypted device memory</p>
                </div>
              </div>

              {isNetworkOnline && (
                <Button
                  variant="accent"
                  size="sm"
                  isLoading={isSyncingOfflineQueue}
                  onClick={handleSyncOfflineQueue}
                  className="text-[10px] py-1 px-2.5 h-auto"
                >
                  Sync Now
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Employee Roster Status Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-500)]" />
            Austin Distribution Facility (Zone A)
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Alex Rivera</h2>
          <p className="text-xs text-[var(--text-tertiary)]">Senior Tech Lead • Shift: 08:00 AM - 04:30 PM</p>
        </div>

        {/* OPTIMISTIC SINGLE-TAP PUNCH TARGET BUTTON (OBSESS OVER THIS TARGET!) */}
        <div className="flex flex-col items-center justify-center my-6 relative">
          {/* Radial Expanding Ripple Effect */}
          {showRippleAnimation && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute w-44 h-44 rounded-full border-4 border-[var(--accent-500)] pointer-events-none"
            />
          )}

          {/* Touch Target Container */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleSingleTapPunch(isClockedIn ? 'Clock Out' : 'Clock In')}
            className={`
              relative w-44 h-44 rounded-full shadow-[var(--shadow-4)] flex flex-col items-center justify-center gap-2 select-none
              transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent-500)]/40
              ${isClockedIn 
                ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 text-white border-4 border-emerald-400/40 shadow-emerald-900/30' 
                : 'bg-gradient-to-br from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--ink-900)] text-white border-4 border-[var(--accent-400)]/50 shadow-[var(--shadow-accent-glow)]'}
            `}
          >
            {/* Optimistic Pending Spinner overlay */}
            {isOptimisticPunching && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-xs z-10">
                <RotateCw className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {isClockedIn ? (
              <>
                <Square className="w-10 h-10 fill-white drop-shadow-md" />
                <span className="text-base font-black uppercase tracking-wider">TAP TO PUNCH OUT</span>
                <span className="text-[10px] opacity-80 font-mono font-medium">IN-FACILITY ACTIVE</span>
              </>
            ) : (
              <>
                <Play className="w-10 h-10 fill-white drop-shadow-md ml-1" />
                <span className="text-base font-black uppercase tracking-wider">TAP TO PUNCH IN</span>
                <span className="text-[10px] opacity-80 font-mono font-medium">SINGLE-TAP OPTIMISTIC</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Secondary Break Action Button */}
        {isClockedIn && (
          <div className="flex justify-center mb-6">
            <Button
              variant={isOnBreak ? 'accent' : 'secondary'}
              size="sm"
              onClick={() => handleSingleTapPunch('Break')}
              leftIcon={<Coffee className="w-4 h-4" />}
            >
              {isOnBreak ? 'End Break & Resume Shift' : 'Start Scheduled Break'}
            </Button>
          </div>
        )}

        {/* GPS Geofence & Location Verification Status */}
        <div className="bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--accent-500)]" />
              GPS Geofence Position
            </span>
            <Badge variant={isGeofenceValid ? 'success' : 'danger'}>
              {isGeofenceValid ? 'VERIFIED INSIDE' : 'OUTSIDE BOUNDARY'}
            </Badge>
          </div>

          <div className="flex justify-between font-mono text-[11px] text-[var(--text-tertiary)] pt-1 border-t border-[var(--border-subtle)]">
            <span>COORDINATES: 30.2672° N, 97.7431° W</span>
            <span>ACCURACY: ±{gpsAccuracy}m</span>
          </div>

          {lastPunchTime && (
            <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-500)]" />
                Last Registered Punch:
              </span>
              <span className="font-mono font-bold text-[var(--text-primary)]">{lastPunchTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
