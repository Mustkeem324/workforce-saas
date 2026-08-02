import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, CheckCircle2, AlertTriangle, RefreshCw, ChevronRight, X, Code, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface WebhookLogItem {
  id: string;
  event: string;
  endpointUrl: string;
  statusCode: number;
  statusText: '200 OK' | '500 Server Error' | '404 Not Found';
  timestamp: string;
  attempts: number;
  requestHeaders: object;
  payloadBody: object;
  responseBody: object;
}

const SAMPLE_WEBHOOK_LOGS: WebhookLogItem[] = [
  {
    id: 'wh-1',
    event: 'attendance.punch.created',
    endpointUrl: 'https://hooks.slack.com/services/T00/B00/X00',
    statusCode: 200,
    statusText: '200 OK',
    timestamp: '05:32:10 PM',
    attempts: 1,
    requestHeaders: { 'Content-Type': 'application/json', 'X-Workforce-Signature': 'sha256=94812a...' },
    payloadBody: { event: 'punch.created', employeeId: 'emp-9481', location: 'Austin Hub', type: 'IN' },
    responseBody: { ok: true, message: 'Message posted to #workforce-alerts' }
  },
  {
    id: 'wh-2',
    event: 'payroll.disbursal.finalized',
    endpointUrl: 'https://api.quickbooks.com/v3/company/9481/journal',
    statusCode: 500,
    statusText: '500 Server Error',
    timestamp: '05:28:45 PM',
    attempts: 3,
    requestHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer qb_live_...' },
    payloadBody: { event: 'payroll.finalized', runId: 'PAY-2026-0802-9481', amount: 142736.40 },
    responseBody: { error: 'OAuth token expired. Re-authentication required.', code: 500 }
  },
  {
    id: 'wh-3',
    event: 'shift.swap.approved',
    endpointUrl: 'https://graph.whatsapp.com/v17.0/messages',
    statusCode: 200,
    statusText: '200 OK',
    timestamp: '04:15:00 PM',
    attempts: 1,
    requestHeaders: { 'Content-Type': 'application/json' },
    payloadBody: { event: 'swap.approved', swapId: 'sw-881', employeePhone: '+15125550192' },
    responseBody: { messaging_product: 'whatsapp', contacts: [{ input: '+15125550192' }] }
  }
];

export const WebhookDeliveryLogInspector: React.FC = () => {
  const [logs] = useState<WebhookLogItem[]>(SAMPLE_WEBHOOK_LOGS);
  const [selectedLog, setSelectedLog] = useState<WebhookLogItem | null>(SAMPLE_WEBHOOK_LOGS[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Webhook Delivery Log & Payload Inspector</h2>
            <Badge variant="accent">PARTNER SUPPORT REDUCTION</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Timeline view of webhook deliveries with status codes, payload inspection, and retry tracking.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Timeline Log, Right Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Webhook Timeline */}
        <Card elevation={2} className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Recent Webhook Deliveries</h3>

          <div className="space-y-2">
            {logs.map(log => {
              const isSelected = selectedLog?.id === log.id;
              const isSuccess = log.statusCode === 200;

              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`
                    p-3 rounded-xl cursor-pointer border text-xs transition-colors space-y-1.5
                    ${isSelected 
                      ? 'bg-[var(--accent-500)]/15 border-[var(--accent-500)] shadow-xs' 
                      : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:bg-[var(--bg-element-hover)]'}
                  `}
                >
                  <div className="flex items-center justify-between font-bold text-[var(--text-primary)]">
                    <span className="truncate font-mono">{log.event}</span>
                    <Badge variant={isSuccess ? 'success' : 'danger'}>{log.statusText}</Badge>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] truncate font-mono">{log.endpointUrl}</p>
                  <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] font-mono">
                    <span>{log.timestamp}</span>
                    <span>Attempt {log.attempts}/5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Detailed Payload Inspector */}
        <Card elevation={2} className="lg:col-span-2 space-y-4 font-mono text-xs">
          {selectedLog ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 font-sans">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedLog.event}</h3>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono">{selectedLog.endpointUrl}</p>
                </div>

                {selectedLog.statusCode !== 200 && (
                  <Button variant="destructive" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                    Retry Webhook Payload
                  </Button>
                )}
              </div>

              {/* Payload JSON Viewer Box */}
              <div className="space-y-3">
                <span className="text-[11px] font-sans font-bold text-[var(--text-secondary)] block">EVENT PAYLOAD BODY (JSON)</span>
                <div className="p-4 rounded-xl bg-[var(--ink-950)] text-emerald-400 font-mono text-[11px] overflow-x-auto">
                  <pre>{JSON.stringify(selectedLog.payloadBody, null, 2)}</pre>
                </div>
              </div>

              {/* Response JSON Viewer Box */}
              <div className="space-y-3">
                <span className="text-[11px] font-sans font-bold text-[var(--text-secondary)] block">RESPONSE BODY ({selectedLog.statusText})</span>
                <div className="p-4 rounded-xl bg-[var(--ink-950)] text-amber-300 font-mono text-[11px] overflow-x-auto">
                  <pre>{JSON.stringify(selectedLog.responseBody, null, 2)}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[var(--text-tertiary)]">
              Select a webhook delivery log to inspect payload headers and JSON body.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
