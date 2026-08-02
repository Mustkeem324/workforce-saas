import React from 'react';
import { CheckCircle2, ShieldCheck, Radio, Server, Activity } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export const PublicTrustStatusPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--ink-950)] text-white border border-[var(--ink-800)] p-5 rounded-2xl shadow-md font-mono">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-extrabold tracking-tight">Public System Uptime & Trust Status Page</h2>
            <Badge variant="accent">STATUSPAGE ENGINE</Badge>
          </div>
          <p className="text-xs text-[var(--ink-300)] mt-1 font-sans">
            Real-time operational status for API Gateway, Mobile Punch Terminals, and Payroll Pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <CheckCircle2 className="w-4 h-4 animate-pulse" />
          <span>ALL SYSTEMS OPERATIONAL (99.99%)</span>
        </div>
      </div>

      {/* Services Operational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <Card elevation={2} className="space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center font-sans font-bold text-[var(--text-primary)]">
            <span>REST API & Webhooks</span>
            <Badge variant="success">99.99%</Badge>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono block">Operational • 38ms Latency</span>
        </Card>

        <Card elevation={2} className="space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center font-sans font-bold text-[var(--text-primary)]">
            <span>Mobile GPS Punch Ingest</span>
            <Badge variant="success">100.0%</Badge>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono block">Operational • 0ms Perceived</span>
        </Card>

        <Card elevation={2} className="space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center font-sans font-bold text-[var(--text-primary)]">
            <span>Biometric Hardware Kiosks</span>
            <Badge variant="success">99.98%</Badge>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono block">Operational • UDP Heartbeat</span>
        </Card>
      </div>
    </div>
  );
};
