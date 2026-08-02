import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDiff, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface CorrectionRequest {
  id: string;
  employeeName: string;
  avatar: string;
  role: string;
  date: string;
  originalTime: string;
  requestedTime: string;
  timeDelta: string;
  originalLocation: string;
  requestedLocation: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  auditTrail: {
    step: string;
    actor: string;
    action: string;
    timestamp: string;
    comment?: string;
  }[];
}

const SAMPLE_CORRECTIONS: CorrectionRequest[] = [
  {
    id: 'req-201',
    employeeName: 'Taylor Reed',
    avatar: 'TR',
    role: 'Logistics Specialist',
    date: '02 Aug 2026',
    originalTime: '08:42:15 AM',
    requestedTime: '08:00:00 AM',
    timeDelta: '-42 minutes',
    originalLocation: 'Geofence Breach (North Gate)',
    requestedLocation: 'Mumbai Logistics Hub (Verified)',
    reason: 'Biometric kiosk #04 was performing firmware update during morning shift intake.',
    status: 'Pending',
    auditTrail: [
      {
        step: '1. Employee Request Submitted',
        actor: 'Taylor Reed (Employee)',
        action: 'Correction Form Filed',
        timestamp: '08:45 AM, Aug 2'
      },
      {
        step: '2. Supervisor Technical Review',
        actor: 'Jordan Chen (Shift Lead)',
        action: 'Audit Verified (Kiosk Log Confirmed Offline)',
        timestamp: '09:30 AM, Aug 2',
        comment: 'Confirmed terminal update down-time in device telemetry logs.'
      },
      {
        step: '3. Payroll Final Approval',
        actor: 'HR Payroll Automated Engine',
        action: 'Pending Approval',
        timestamp: 'Awaiting Manager Action'
      }
    ]
  }
];

export const PunchCorrectionDiffUI: React.FC = () => {
  const [requests, setRequests] = useState<CorrectionRequest[]>(SAMPLE_CORRECTIONS);
  const [selectedReqId, setSelectedReqId] = useState<string>('req-201');

  const selectedReq = requests.find(r => r.id === selectedReqId) || requests[0];

  const handleAction = (status: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(r => {
      if (r.id === selectedReq.id) {
        return {
          ...r,
          status,
          auditTrail: [
            ...r.auditTrail,
            {
              step: `4. Final ${status}`,
              actor: 'Alex Rivera (Operations Director)',
              action: status === 'Approved' ? 'Correction Applied & Synced to Payroll' : 'Correction Declined',
              timestamp: 'Just now'
            }
          ]
        };
      }
      return r;
    }));
  };

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Top Banner Header */}
      <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-4 md:p-5 rounded-2xl shadow-[var(--shadow-1)] space-y-3 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0 max-w-full">
            <FileDiff className="w-5 h-5 text-[var(--accent-500)] shrink-0" />
            <h2 className="font-extrabold text-[var(--text-primary)] text-base md:text-lg tracking-tight leading-snug">
              Punch Correction Diff & Approval Trail
            </h2>
          </div>
          <Badge variant="accent" className="shrink-0 whitespace-nowrap">AUDIT TRAIL ENGINE</Badge>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
          Side-by-side before/after telemetry diff view with complete supervisor audit history.
        </p>
      </div>

      {/* Master-Detail Layout Sub-Grid
          Layout:
          - XL screens (>=1280px): 2 columns (Queue 280px, Case Panel 1fr)
          - Below XL screens: Single column vertical stack
      */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] gap-6 items-start min-w-0">
        {/* Left Column: Pending Request Queue */}
        <div className="space-y-3 w-full min-w-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Pending Requests Queue</h3>

          <div className="space-y-2.5">
            {requests.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedReqId(req.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all min-touch ${
                  selectedReqId === req.id 
                    ? 'border-[var(--accent-500)] bg-[var(--bg-surface-raised)] shadow-[var(--shadow-2)]' 
                    : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-default)]'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Select ${req.employeeName} request`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedReqId(req.id)}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 items-center min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-500)]/15 text-[var(--accent-500)] font-black text-xs flex items-center justify-center shrink-0">
                    {req.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{req.employeeName}</h4>
                    <p className="text-[11px] text-[var(--text-tertiary)] whitespace-nowrap">{req.date}</p>
                  </div>
                  <Badge 
                    variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}
                    className="shrink-0 whitespace-nowrap"
                  >
                    {req.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Case File & Diff Viewer */}
        <div className="w-full min-w-0">
          <Card elevation={2} className="p-5 md:p-6 space-y-6 min-w-0">
            {/* Case File Header & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 min-w-0">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono text-[var(--accent-500)] font-extrabold block">CASE FILE #{selectedReq.id}</span>
                <h3 className="text-base font-extrabold text-[var(--text-primary)] tracking-tight truncate">
                  {selectedReq.employeeName} — Punch Adjustment
                </h3>
              </div>

              {selectedReq.status === 'Pending' && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction('Rejected')}
                    leftIcon={<XCircle className="w-4 h-4" />}
                    className="w-full sm:w-auto min-touch text-xs font-semibold"
                  >
                    Reject Adjustment
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleAction('Approved')}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    className="w-full sm:w-auto min-touch text-xs font-semibold"
                  >
                    Approve & Sync Payroll
                  </Button>
                </div>
              )}
            </div>

            {/* Side-by-Side Diff Panels
                - Desktop (sm+): 2 columns
                - Mobile (<640px): 1 column
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch min-w-0">
              {/* Panel A: ORIGINAL PUNCH LOG (BEFORE) */}
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 space-y-3 min-w-0 flex flex-col justify-between">
                <div className="space-y-1 border-b border-red-500/20 pb-2.5">
                  <span className="text-xs font-extrabold text-red-400 block tracking-tight">ORIGINAL PUNCH LOG (BEFORE)</span>
                  <div className="pt-0.5">
                    <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-block">
                      MISSED / DELAYED PUNCH
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs min-w-0">
                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px] uppercase font-bold tracking-wider">RECORDED TIMESTAMP</span>
                    <span className="font-mono text-sm font-bold text-red-400 whitespace-nowrap tabular-nums">{selectedReq.originalTime}</span>
                  </div>

                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px] uppercase font-bold tracking-wider">LOCATION TELEMETRY</span>
                    <span className="text-[var(--text-primary)] font-semibold leading-normal block">{selectedReq.originalLocation}</span>
                  </div>
                </div>
              </div>

              {/* Panel B: REQUESTED ADJUSTMENT (AFTER) */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3 min-w-0 flex flex-col justify-between">
                <div className="space-y-1 border-b border-emerald-500/20 pb-2.5">
                  <span className="text-xs font-extrabold text-emerald-400 block tracking-tight">REQUESTED ADJUSTMENT (AFTER)</span>
                  <div className="pt-0.5">
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-block">
                      DELTA: {selectedReq.timeDelta}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs min-w-0">
                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px] uppercase font-bold tracking-wider">ADJUSTED TIMESTAMP</span>
                    <span className="font-mono text-sm font-bold text-emerald-400 whitespace-nowrap tabular-nums">{selectedReq.requestedTime}</span>
                  </div>

                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px] uppercase font-bold tracking-wider">VERIFIED WORKSTATION</span>
                    <span className="text-[var(--text-primary)] font-semibold leading-normal block">{selectedReq.requestedLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Justification Note */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5 text-xs min-w-0">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[var(--accent-500)] shrink-0" />
                Employee Justification Note
              </span>
              <p className="text-[var(--text-secondary)] italic leading-relaxed">"{selectedReq.reason}"</p>
            </div>

            {/* Approval Trail History */}
            <div className="space-y-3 pt-2 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Approval Trail Audit History</h4>

              <div className="space-y-4 border-l-2 border-[var(--border-default)] pl-4 min-w-0">
                {selectedReq.auditTrail.map((step, i) => (
                  <div key={i} className="relative space-y-1 text-xs min-w-0">
                    <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[var(--accent-500)] border-2 border-[var(--bg-surface-raised)]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-[var(--text-primary)]">{step.step}</span>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)] whitespace-nowrap">{step.timestamp}</span>
                    </div>
                    <div className="text-[var(--text-secondary)] leading-normal">
                      {step.actor} — <span className="font-semibold text-[var(--text-primary)]">{step.action}</span>
                    </div>
                    {step.comment && (
                      <p className="text-[11px] text-[var(--text-tertiary)] bg-[var(--bg-canvas)] p-2.5 rounded-lg border border-[var(--border-subtle)] mt-1.5 leading-relaxed">
                        Comment: {step.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
