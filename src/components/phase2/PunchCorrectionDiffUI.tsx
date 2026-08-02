import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDiff, ArrowRight, CheckCircle2, XCircle, Clock, User, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
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
    date: 'August 2, 2026',
    originalTime: '08:42:15 AM (Missed Punch)',
    requestedTime: '08:00:00 AM (Actual Shift Start)',
    timeDelta: '-42 minutes',
    originalLocation: 'Geofence Breach (North Gate)',
    requestedLocation: 'Austin Distribution Hub (Verified)',
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <FileDiff className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Punch Correction Diff & Approval Trail</h2>
            <Badge variant="accent">AUDIT TRAIL ENGINE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Side-by-side before/after telemetry diff view — no raw edit forms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Correction Request Queue */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Pending Requests Queue</h3>

          {requests.map(req => (
            <div
              key={req.id}
              onClick={() => setSelectedReqId(req.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedReqId === req.id 
                  ? 'border-[var(--accent-500)] bg-[var(--bg-surface-raised)] shadow-[var(--shadow-2)]' 
                  : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-default)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-500)]/15 text-[var(--accent-500)] font-bold text-xs flex items-center justify-center">
                    {req.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{req.employeeName}</h4>
                    <p className="text-xs text-[var(--text-tertiary)]">{req.date}</p>
                  </div>
                </div>
                <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}>
                  {req.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Right 2 Columns: Side-by-Side Before vs After Diff Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <Card elevation={2} className="space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <span className="text-xs font-mono text-[var(--accent-500)] font-bold">CASE FILE #{selectedReq.id}</span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{selectedReq.employeeName} — Punch Adjustment</h3>
              </div>

              {selectedReq.status === 'Pending' && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction('Rejected')}
                    leftIcon={<XCircle className="w-4 h-4" />}
                  >
                    Reject Adjustment
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleAction('Approved')}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Approve & Sync Payroll
                  </Button>
                </div>
              )}
            </div>

            {/* SIDE-BY-SIDE BEFORE vs AFTER DIFF PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Panel A: ORIGINAL PUNCH LOG (BEFORE) */}
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-red-500 border-b border-red-500/20 pb-2">
                  <span>ORIGINAL PUNCH LOG (BEFORE)</span>
                  <span className="bg-red-500/20 px-2 py-0.5 rounded text-[10px]">MISSED / DELAYED</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px]">RECORDED TIMESTAMP</span>
                    <span className="font-mono text-sm font-bold text-red-400">{selectedReq.originalTime}</span>
                  </div>

                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px]">GPS LOCATION TELEMETRY</span>
                    <span className="text-[var(--text-primary)] font-medium">{selectedReq.originalLocation}</span>
                  </div>
                </div>
              </div>

              {/* Panel B: REQUESTED CORRECTION (AFTER) */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-500 border-b border-emerald-500/20 pb-2">
                  <span>REQUESTED ADJUSTMENT (AFTER)</span>
                  <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">DELTA: {selectedReq.timeDelta}</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px]">ADJUSTED TIMESTAMP</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">{selectedReq.requestedTime}</span>
                  </div>

                  <div>
                    <span className="text-[var(--text-tertiary)] block text-[10px]">VERIFIED WORKSTATION</span>
                    <span className="text-[var(--text-primary)] font-medium">{selectedReq.requestedLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Justification Note */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5 text-xs">
              <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[var(--accent-500)]" />
                Employee Justification Note
              </span>
              <p className="text-[var(--text-secondary)] italic">"{selectedReq.reason}"</p>
            </div>

            {/* APPROVAL TRAIL TIMELINE */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Approval Trail Audit History</h4>

              <div className="space-y-3 border-l-2 border-[var(--border-default)] pl-4">
                {selectedReq.auditTrail.map((step, i) => (
                  <div key={i} className="relative space-y-1 text-xs">
                    <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-[var(--accent-500)] border-2 border-[var(--bg-surface-raised)]" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">{step.step}</span>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)]">{step.timestamp}</span>
                    </div>
                    <div className="text-[var(--text-secondary)]">{step.actor} — <span className="font-semibold">{step.action}</span></div>
                    {step.comment && (
                      <p className="text-[11px] text-[var(--text-tertiary)] bg-[var(--bg-canvas)] p-2 rounded border border-[var(--border-subtle)] mt-1">
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
