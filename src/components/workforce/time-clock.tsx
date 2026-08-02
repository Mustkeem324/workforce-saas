import React, { useState, useEffect } from 'react';
import { Play, Square, Coffee, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const TimeClockWidget: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(14820); // 4h 07m 00s

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isClockedIn && !isOnBreak) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockedIn, isOnBreak]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-2)] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">TIME CARD ENGINE</span>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Shift Punch Terminal</h3>
        </div>
        <Badge variant={isClockedIn ? (isOnBreak ? 'warning' : 'success') : 'neutral'}>
          {isClockedIn ? (isOnBreak ? 'ON BREAK' : 'ACTIVE SHIFT') : 'CLOCKED OUT'}
        </Badge>
      </div>

      {/* Timer Display with Tabular Numerics */}
      <div className="bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-xl p-5 text-center flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">ACCUMULATED SHIFT TIME</span>
        <div className="font-mono tabular-nums text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {formatTimer(secondsElapsed)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mt-2">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent-500)]" />
          <span>Austin Distribution Facility (Geofence Verified)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {isClockedIn ? (
          <>
            <Button
              variant={isOnBreak ? 'accent' : 'secondary'}
              onClick={() => setIsOnBreak(!isOnBreak)}
              leftIcon={<Coffee className="w-4 h-4" />}
            >
              {isOnBreak ? 'Resume Work' : 'Start Break'}
            </Button>
            <Button
              variant="destructive"
              onClick={() => { setIsClockedIn(false); setIsOnBreak(false); }}
              leftIcon={<Square className="w-4 h-4" />}
            >
              Clock Out
            </Button>
          </>
        ) : (
          <Button
            variant="accent"
            className="col-span-2"
            onClick={() => { setIsClockedIn(true); setSecondsElapsed(0); }}
            leftIcon={<Play className="w-4 h-4" />}
          >
            Clock In Shift
          </Button>
        )}
      </div>

      {/* Punch History */}
      <div className="border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--text-tertiary)] flex justify-between font-mono tabular-nums">
        <span>PUNCH IN: 08:00:12 AM</span>
        <span>BREAK STARTED: 12:15:00 PM</span>
      </div>
    </div>
  );
};
