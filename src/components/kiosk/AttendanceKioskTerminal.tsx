import React, { useState, useEffect, useRef } from 'react';
import { Camera, CheckCircle2, ShieldAlert, Lock, RefreshCw, QrCode, Keypad, Wifi, WifiOff, X, ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface AttendanceKioskTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceKioskTerminal: React.FC<AttendanceKioskTerminalProps> = ({ isOpen, onClose }) => {
  const [pinInput, setPinInput] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'FACE' | 'QR' | 'PIN'>('FACE');
  const [isOnline, setIsOnline] = useState(true);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'MATCHING' | 'SUCCESS' | 'FAILED'>('IDLE');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Kiosk camera fallback to simulation');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
  };

  const handleSimulateAutoPunch = async () => {
    setScanStatus('MATCHING');
    setTimeout(() => {
      const result = {
        employeeName: 'Alex Rivera',
        employeeId: 'emp-101',
        time: new Date().toLocaleTimeString(),
        status: 'CHECKED IN (VERIFIED)'
      };
      setScanResult(result);
      setScanStatus('SUCCESS');

      // Auto Reset Kiosk Screen after 3 seconds for next employee
      setTimeout(() => {
        setScanResult(null);
        setScanStatus('IDLE');
      }, 3000);
    }, 1200);
  };

  const handleAdminUnlock = () => {
    if (pinInput === '1234') {
      setIsAdminUnlocked(true);
      setIsPinModalOpen(false);
      setPinInput('');
    } else {
      alert('Invalid Administrator PIN (Default PIN: 1234)');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--ink-950)] text-white flex flex-col justify-between p-4 md:p-8 select-none">
      {/* Kiosk Header */}
      <header className="flex justify-between items-center border-b border-[var(--ink-800)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-500)] to-rose-600 flex items-center justify-center font-black text-sm shadow-[var(--shadow-accent-glow)]">
            SY
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">MUMBAI LOGISTICS HUB — TOUCH-FREE KIOSK</h2>
            <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] font-mono">
              <span>DEVICE ID: KIOSK-MUM-01</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
                {isOnline ? 'ONLINE (0 PENDING)' : 'OFFLINE QUEUED'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPinModalOpen(true)}
            className="p-2.5 rounded-xl bg-[var(--ink-900)] border border-[var(--ink-700)] text-[var(--text-secondary)] hover:text-white min-touch"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Touch-Free Camera Area */}
      <main className="flex-1 flex flex-col items-center justify-center space-y-6 max-w-xl mx-auto w-full my-4">
        {activeMethod === 'FACE' && (
          <div className="relative w-full aspect-4/3 rounded-3xl bg-black overflow-hidden border-2 border-[var(--accent-500)]/60 shadow-2xl">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

            {/* Oval Face Guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-52 h-72 border-4 stroke-dasharray rounded-[50%] transition-all ${scanStatus === 'SUCCESS' ? 'border-emerald-400 scale-105' : 'border-[var(--accent-500)] animate-pulse'}`} />
            </div>

            {/* Verification Success Toast Overlay */}
            {scanStatus === 'SUCCESS' && scanResult && (
              <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-3 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                <h3 className="text-2xl font-black text-white">{scanResult.employeeName}</h3>
                <Badge variant="success">{scanResult.status}</Badge>
                <div className="font-mono text-sm text-emerald-300">PUNCH TIME: {scanResult.time}</div>
                <p className="text-xs text-emerald-400/80 font-mono">Resetting for next employee in 3s...</p>
              </div>
            )}
          </div>
        )}

        {/* Trigger Button & Alternate Method Toggles */}
        <div className="w-full space-y-3 text-center">
          {scanStatus === 'IDLE' && (
            <Button variant="accent" size="lg" className="w-full min-touch py-4 text-base font-extrabold" onClick={handleSimulateAutoPunch}>
              Touch-Free Auto Scan Attendance
            </Button>
          )}

          <div className="flex justify-center items-center gap-2 pt-2">
            <button
              onClick={() => setActiveMethod('FACE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-touch ${activeMethod === 'FACE' ? 'bg-[var(--accent-500)] text-white' : 'bg-[var(--ink-900)] text-gray-400'}`}
            >
              Face Scan
            </button>
            <button
              onClick={() => setActiveMethod('QR')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-touch ${activeMethod === 'QR' ? 'bg-[var(--accent-500)] text-white' : 'bg-[var(--ink-900)] text-gray-400'}`}
            >
              Dynamic QR
            </button>
            <button
              onClick={() => setActiveMethod('PIN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-touch ${activeMethod === 'PIN' ? 'bg-[var(--accent-500)] text-white' : 'bg-[var(--ink-900)] text-gray-400'}`}
            >
              Employee PIN
            </button>
          </div>
        </div>
      </main>

      {/* Admin Unlock Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <Card elevation={3} className="w-full max-w-xs p-6 space-y-4 text-center border-2 border-[var(--border-default)]">
            <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Kiosk Settings Admin Unlock</h4>
            <p className="text-xs text-[var(--text-tertiary)]">Enter Admin PIN (Default: 1234)</p>
            <input
              type="password"
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] text-center text-lg font-mono tracking-widest text-[var(--text-primary)]"
              placeholder="••••"
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsPinModalOpen(false)}>Cancel</Button>
              <Button variant="accent" className="flex-1" onClick={handleAdminUnlock}>Unlock</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-[var(--text-tertiary)] font-mono border-t border-[var(--ink-800)] pt-3 flex justify-between items-center">
        <span>SYNKRON OS KIOSK v2.8</span>
        {isAdminUnlocked ? (
          <button onClick={onClose} className="text-rose-400 font-bold underline">Exit Kiosk Mode</button>
        ) : (
          <span>RESTRICTED KIOSK MODE ACTIVE</span>
        )}
      </footer>
    </div>
  );
};
