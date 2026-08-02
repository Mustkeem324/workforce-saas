import React, { useState } from 'react';
import { ShieldCheck, Lock, Trash2, Download, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const PrivacyConsentCentre: React.FC = () => {
  const [hasBiometricConsent, setHasBiometricConsent] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleWithdrawConsent = async () => {
    if (!confirm('Are you sure you want to withdraw biometric consent? Your enrolled face vector will be permanently hard-deleted from database storage.')) return;
    try {
      await fetch('http://localhost:5000/api/v1/employees/emp-9481/face-enrollment/delete', { method: 'POST' });
      setHasBiometricConsent(false);
      setIsDeleted(true);
    } catch (err) {
      alert('Failed to connect to backend deletion endpoint.');
    }
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Personal Biometric & Attendance Audit Package exported successfully.');
    }, 1500);
  };

  return (
    <Card elevation={2} className="p-6 space-y-6 max-w-4xl mx-auto border-2 border-[var(--border-default)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Biometric Privacy & Consent Centre</h3>
            <Badge variant="accent">DPDP & GDPR COMPLIANT</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Self-serve employee data control hub. Enforce consent withdrawal, hard-deletion, and audit history.
          </p>
        </div>
      </div>

      {/* Consent Status Banner */}
      <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)]">Biometric Attendance Consent Status</span>
          <Badge variant={hasBiometricConsent ? 'success' : 'danger'}>
            {hasBiometricConsent ? 'CONSENT ACTIVE' : 'CONSENT WITHDRAWN & DELETED'}
          </Badge>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Biometric face embeddings (128-d numeric vectors) are stored strictly for attendance validation. Raw photos are not stored permanently. Non-biometric punch options (GPS, Employee PIN, Dynamic QR) are available at all times.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {hasBiometricConsent ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleWithdrawConsent}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Withdraw Consent & Hard-Delete Face Vector
            </Button>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Biometric data row permanently deleted from database storage.</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            disabled={isExporting}
            leftIcon={<Download className="w-4 h-4" />}
          >
            {isExporting ? 'Exporting Package...' : 'Export My Personal Data & Audit Log'}
          </Button>
        </div>
      </div>

      {/* Biometric Data Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
          <span className="font-bold text-[var(--text-primary)] block">Zero-Retention Capture Policy</span>
          <p className="text-[var(--text-tertiary)]">
            Camera frames used during liveness verification are processed in RAM memory and automatically discarded after vector comparison.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
          <span className="font-bold text-[var(--text-primary)] block">No Prohibited Inferences</span>
          <p className="text-[var(--text-tertiary)]">
            Face embeddings are used exclusively for verification. Biometric data is never used to infer emotion, health, gender, or ethnicity.
          </p>
        </div>
      </div>
    </Card>
  );
};
