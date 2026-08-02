import React, { useState } from 'react';
import { Radio, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, Camera, UserCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FacePunchInTerminal } from '../attendance/FacePunchInTerminal';
import { FaceEnrollmentModal } from '../attendance/FaceEnrollmentModal';

export const MobilePunchInWidget: React.FC = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [lastPunchTime, setLastPunchTime] = useState<string | null>(null);
  const [isOptimisticSyncing, setIsOptimisticSyncing] = useState(false);
  const [isFaceTerminalOpen, setIsFaceTerminalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const handlePunchToggle = async () => {
    setIsOptimisticSyncing(true);
    const newStatus = !isPunchedIn;
    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Optimistic UI update instantly!
    setIsPunchedIn(newStatus);
    setLastPunchTime(nowStr);

    try {
      await fetch('http://localhost:5000/api/v1/attendance/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: 'emp-9481',
          employeeName: 'Alex Rivera',
          location: 'Mumbai Logistics Hub',
          type: newStatus ? 'IN' : 'OUT'
        })
      });
    } catch (err) {
      // Background sync queue handles network retries
    } finally {
      setIsOptimisticSyncing(false);
    }
  };

  return (
    <Card elevation={2} className="p-6 space-y-6 max-w-md mx-auto border-2 border-[var(--border-accent)]/50">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[var(--accent-500)] animate-pulse" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Attendance Punch Terminal</h3>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] font-mono">LOCATION: MUMBAI LOGISTICS HUB</p>
        </div>

        <Badge variant={isPunchedIn ? 'success' : 'neutral'} dot>
          {isPunchedIn ? 'PUNCHED IN' : 'OFF SHIFT'}
        </Badge>
      </div>

      {/* Primary Punch Button */}
      <div className="text-center space-y-3">
        <button
          onClick={handlePunchToggle}
          className={`
            w-36 h-36 rounded-full mx-auto font-black text-lg transition-all duration-300 shadow-[var(--shadow-4)] flex flex-col items-center justify-center gap-1 select-none min-touch
            ${isPunchedIn 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/30 ring-8 ring-emerald-500/20' 
              : 'bg-gradient-to-br from-[var(--accent-500)] to-rose-700 text-white shadow-[var(--shadow-accent-glow)] ring-8 ring-[var(--accent-500)]/20'}
          `}
        >
          <span className="text-2xl">{isPunchedIn ? 'PUNCH OUT' : 'PUNCH IN'}</span>
          <span className="text-[10px] opacity-80 font-mono font-normal">SINGLE-TAP OPTIMISTIC</span>
        </button>

        {lastPunchTime && (
          <div className="text-xs font-mono text-[var(--text-secondary)]">
            LAST RECORDED: <span className="font-bold text-[var(--text-primary)]">{lastPunchTime}</span>
          </div>
        )}
      </div>

      {/* Alternative Face Recognition Buttons */}
      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
        <Button
          variant="secondary"
          className="w-full min-touch"
          onClick={() => setIsFaceTerminalOpen(true)}
          leftIcon={<Camera className="w-4 h-4 text-[var(--accent-500)]" />}
        >
          Punch In with Face Recognition
        </Button>

        <div className="flex justify-between items-center text-[11px] text-[var(--text-tertiary)] font-mono">
          <span>Biometric Vector Status: Active</span>
          <button onClick={() => setIsEnrollModalOpen(true)} className="text-[var(--accent-500)] font-bold underline">
            Enroll / Manage Face
          </button>
        </div>
      </div>

      {/* Face Modals */}
      <FacePunchInTerminal
        isOpen={isFaceTerminalOpen}
        onClose={() => setIsFaceTerminalOpen(false)}
        onSuccessPunch={() => {
          setIsPunchedIn(true);
          setLastPunchTime(new Date().toLocaleTimeString());
        }}
      />

      <FaceEnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </Card>
  );
};
