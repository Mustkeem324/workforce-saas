import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle2, ShieldAlert, RefreshCw, X, ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface FacePunchInTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessPunch?: (punchData: any) => void;
}

export const FacePunchInTerminal: React.FC<FacePunchInTerminalProps> = ({
  isOpen,
  onClose,
  onSuccessPunch
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [punchResult, setPunchResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      setErrorMsg(null);
      setPunchResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
    } catch (err) {
      setErrorMsg('Camera access unavailable. Please use GPS or Manual Punch method.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
    setIsScanning(false);
  };

  const handleTriggerFacePunch = async () => {
    if (!videoRef.current) return;
    setCountdown(1);
    setErrorMsg(null);

    setTimeout(async () => {
      setCountdown(null);
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageBase64 = canvas.toDataURL('image/jpeg');

        try {
          const res = await fetch('http://localhost:5000/api/v1/attendance/punch/face', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              locationId: 'Mumbai Logistics Hub',
              punchType: 'IN',
              imageBase64
            })
          });

          const data = await res.json();
          if (data.status === 'success') {
            setPunchResult(data.data);
            if (onSuccessPunch) onSuccessPunch(data.data);
            setTimeout(() => {
              onClose();
            }, 2500);
          } else {
            setErrorMsg(data.message || 'Face not recognized (401). Please try again or use GPS fallback.');
          }
        } catch (err) {
          setErrorMsg('Failed to connect to face recognition server.');
        }
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
      <Card elevation={3} className="w-full max-w-md space-y-4 p-6 border-2 border-[var(--accent-500)]/60 text-center relative">
        <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[var(--accent-500)]" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Face Recognition Punch Terminal</h3>
          </div>
          <button onClick={onClose} className="text-[var(--text-tertiary)] p-1">✕</button>
        </div>

        {/* Video Camera View with Face Target Oval */}
        <div className="relative w-full aspect-4/3 rounded-2xl bg-black overflow-hidden border border-[var(--border-default)]">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          
          {/* Target Face Oval */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`w-44 h-60 border-4 border-dashed rounded-[50%] transition-all ${countdown !== null ? 'border-emerald-400 scale-105' : 'border-[var(--accent-500)]'}`} />
          </div>

          {/* Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="text-5xl font-black text-emerald-400 animate-ping">{countdown}</div>
            </div>
          )}
        </div>

        {/* Success Match Confirmation Banner */}
        {punchResult && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs space-y-1 animate-bounce">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <div className="font-extrabold text-sm text-[var(--text-primary)]">{punchResult.employee_name}</div>
            <div className="font-mono">PUNCH IN VERIFIED ({punchResult.matchConfidence})</div>
          </div>
        )}

        {/* Error / 401 Not Recognized Banner */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs font-mono space-y-1">
            <ShieldAlert className="w-5 h-5 mx-auto text-rose-400" />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Trigger Button & GPS Fallback */}
        <div className="space-y-2">
          <Button
            variant="accent"
            size="lg"
            className="w-full min-touch"
            onClick={handleTriggerFacePunch}
            disabled={countdown !== null || !!punchResult}
          >
            {countdown !== null ? 'Matching Face Vector...' : 'Scan & Verify Face Punch'}
          </Button>

          <button
            onClick={onClose}
            className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] underline font-mono block mx-auto py-1"
          >
            Use GPS / Manual Punch Fallback
          </button>
        </div>
      </Card>
    </div>
  );
};
