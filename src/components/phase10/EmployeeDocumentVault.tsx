import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle2, Clock, Send, Upload, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface EmployeeDocumentItem {
  id: string;
  employeeName: string;
  docName: string;
  docType: 'KYC' | 'Work Authorization' | 'Safety Certification';
  expiryDate: string;
  status: 'VALID' | 'EXPIRING SOON' | 'EXPIRED';
  daysRemaining: number;
}

const DOCUMENT_ITEMS: EmployeeDocumentItem[] = [
  {
    id: 'doc-1',
    employeeName: 'Taylor Reed',
    docName: 'Form I-9 Employment Verification',
    docType: 'Work Authorization',
    expiryDate: 'Aug 14, 2026',
    status: 'EXPIRING SOON',
    daysRemaining: 12
  },
  {
    id: 'doc-2',
    employeeName: 'Jordan Chen',
    docName: 'Forklift Heavy Equipment License',
    docType: 'Safety Certification',
    expiryDate: 'Aug 05, 2026',
    status: 'EXPIRING SOON',
    daysRemaining: 3
  },
  {
    id: 'doc-3',
    employeeName: 'Alex Rivera',
    docName: 'US Passport & Work Authorization',
    docType: 'KYC',
    expiryDate: 'Dec 31, 2028',
    status: 'VALID',
    daysRemaining: 882
  }
];

export const EmployeeDocumentVault: React.FC = () => {
  const [docs, setDocs] = useState<EmployeeDocumentItem[]>(DOCUMENT_ITEMS);
  const [requestedDocId, setRequestedDocId] = useState<string | null>(null);

  const handleRequestRenewal = (id: string) => {
    setRequestedDocId(id);
    setTimeout(() => setRequestedDocId(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Employee Document Vault & Expiry Reminders</h2>
            <Badge variant="accent">PASSPORT-RENEWAL UX</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Employee KYC & compliance document repository with passport-renewal style expiry tracking.
          </p>
        </div>
      </div>

      {/* Document Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docs.map(doc => {
          const isValid = doc.status === 'VALID';
          const isExpiring = doc.status === 'EXPIRING SOON';

          return (
            <Card
              key={doc.id}
              elevation={2}
              className={`space-y-4 flex flex-col justify-between ${
                isExpiring ? 'border-2 border-amber-500/60 bg-amber-500/5' : ''
              }`}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">{doc.employeeName}</h3>
                    <Badge variant="neutral">{doc.docType}</Badge>
                  </div>

                  <Badge variant={isValid ? 'success' : 'warning'}>
                    {doc.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block">{doc.docName}</span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-500)]" />
                    <span>Expires: {doc.expiryDate} ({doc.daysRemaining} days remaining)</span>
                  </div>
                </div>

                {isExpiring && (
                  <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Action Required: Renewal requested within {doc.daysRemaining} days.</span>
                  </div>
                )}
              </div>

              {/* 1-Tap Renewal Request Button */}
              <div className="pt-2">
                <Button
                  variant={requestedDocId === doc.id ? 'accent' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={() => handleRequestRenewal(doc.id)}
                  leftIcon={requestedDocId === doc.id ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4 text-[var(--accent-500)]" />}
                >
                  {requestedDocId === doc.id ? 'Renewal Request Sent!' : 'Request Document Renewal'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
