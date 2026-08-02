import React, { useState, useRef } from 'react';
import { Camera, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, X, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface FaceEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: string;
  employeeName?: string;
}

export const FaceEnrollmentModal: React.FC<FaceEnrollmentModalProps> = ({
  isOpen,
  onClose,
  employeeId = 'emp-9481',
  employeeName = 'Alex Rivera'
}) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartCamera = async () => {
    if (!consentGiven) return;
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      setErrorMessage('Unable to access device camera. Please check browser permissions.');
    }
  };

  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedFrame(dataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedFrame(null);
  };

  const handleEnroll = async () => {
    if (!capturedFrame) return;
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/employees/${employeeId}/face-enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName,
          imageBase64: capturedFrame,
          consentGiven: true
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Face enrollment failed.');
      }
    } catch (err) {
      setErrorMessage('Failed to connect to backend server.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <Card elevation={3} className="w-full max-w-lg space-y-4 p-6 border-2 border-[var(--border-accent)] relative">
        <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Biometric Face Enrollment</h3>
          </div>
          <button onClick={onClose} className="text-[var(--text-tertiary)] p-1">✕</button>
        </div>

        {/* STEP 1: EXPLICIT OPT-IN CONSENT NOTICE */}
        {!isCameraActive && !capturedFrame && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-4 h-4" />
                <span>Explicit Consent & Biometric Privacy Disclosure</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-300/90">
                Face recognition calculates a numeric 128-d vector embedding for attendance validation. Raw photos are not stored permanently. You can withdraw your consent and delete your biometric data at any time under "My Data Settings".
              </p>
            </div>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={e => setConsentGiven(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[var(--accent-500)]"
              />
              <span className="text-xs text-[var(--text-primary)] font-semibold">
                I explicitly consent to enrolling my face vector embedding for attendance validation.
              </span>
            </label>

            <Button
              variant="accent"
              className="w-full min-touch"
              disabled={!consentGiven}
              onClick={handleStartCamera}
              leftIcon={<Camera className="w-4 h-4" />}
            >
              Open Camera Preview
            </Button>
          </div>
        )}

        {/* STEP 2: CAMERA PREVIEW WITH FACE OUTLINE GUIDE */}
        {isCameraActive && !capturedFrame && (
          <div className="space-y-4">
            <div className="relative w-full aspect-4/3 rounded-2xl bg-black overflow-hidden border border-[var(--border-default)]">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {/* Oval Face Outline Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 border-4 border-dashed border-[var(--accent-500)] rounded-[50%] animate-pulse" />
              </div>
            </div>

            <Button variant="accent" className="w-full min-touch" onClick={handleCaptureFrame}>
              Capture Face Photo Frame
            </Button>
          </div>
        )}

        {/* STEP 3: CAPTURED FRAME PREVIEW & ENROLL SUBMIT */}
        {capturedFrame && (
          <div className="space-y-4">
            <div className="relative w-full aspect-4/3 rounded-2xl bg-black overflow-hidden border border-[var(--border-default)]">
              <img src={capturedFrame} alt="Captured face frame" className="w-full h-full object-cover" />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-bold space-y-1">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                <div>Face Embedding Successfully Enrolled!</div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleRetake}>Retake Photo</Button>
              <Button variant="accent" className="flex-1" onClick={handleEnroll} disabled={isUploading}>
                {isUploading ? 'Extracting Vector...' : 'Confirm & Save Vector'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
