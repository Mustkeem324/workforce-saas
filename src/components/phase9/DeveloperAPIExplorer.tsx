import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Play, Check, Terminal, Code2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface ApiEndpointOption {
  id: string;
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  description: string;
  sampleResponseBody: object;
}

const ENDPOINTS: ApiEndpointOption[] = [
  {
    id: 'ep-punches',
    method: 'GET',
    path: '/v1/attendance/punches',
    description: 'Fetch real-time punch logs with GPS telemetry and geofence verification status.',
    sampleResponseBody: {
      status: 'success',
      data: [
        { id: 'pn-9481', employee: 'Alex Rivera', timestamp: '2026-08-02T08:00:12Z', geofence: 'VERIFIED', location: 'Austin Distribution Hub' }
      ]
    }
  },
  {
    id: 'ep-shifts',
    method: 'POST',
    path: '/v1/shifts/dispatches',
    description: 'Create a new shift roster slot with inline labor-law conflict detection.',
    sampleResponseBody: {
      status: 'created',
      shiftId: 'sft-0892',
      conflictFlags: [],
      projectedCost: 240.00
    }
  },
  {
    id: 'ep-payroll',
    method: 'GET',
    path: '/v1/payroll/runs/latest',
    description: 'Fetch latest finalized payroll disbursal voucher and itemized deductions.',
    sampleResponseBody: {
      status: 'finalized',
      disbursalId: 'PAY-2026-0802-9481',
      totalGross: 142736.40,
      totalNet: 104250.00,
      currency: 'USD'
    }
  }
];

export const DeveloperAPIExplorer: React.FC = () => {
  const [apiKeyRevealed, setApiKeyRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedEndpointId, setSelectedEndpointId] = useState('ep-punches');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const rawSecretKey = 'pk_live_94812a83091bd948a7b1';
  const maskedSecretKey = 'pk_live_••••••••••••••••••••';

  const selectedEndpoint = ENDPOINTS.find(e => e.id === selectedEndpointId) || ENDPOINTS[0];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(rawSecretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExecuteRequest = () => {
    setIsLoading(true);
    setApiResponse(null);

    setTimeout(() => {
      setApiResponse(JSON.stringify(selectedEndpoint.sampleResponseBody, null, 2));
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--ink-950)] text-white border border-[var(--ink-800)] p-5 rounded-2xl shadow-md font-mono">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[var(--accent-400)]" />
            <h2 className="text-lg font-extrabold tracking-tight">Developer API Console & Interactive Explorer</h2>
            <Badge variant="accent">STRIPE-STYLE DASHBOARD</Badge>
          </div>
          <p className="text-xs text-[var(--ink-300)] mt-1 font-sans">
            Public REST & Webhook API Management Platform. Dark-mode default console with live request explorer.
          </p>
        </div>

        <span className="text-xs text-emerald-400 font-bold">API STATUS: 100% OPERATIONAL (42ms)</span>
      </div>

      {/* API Secret Keys Management Box */}
      <Card elevation={2} className="space-y-4 border-2 border-[var(--border-accent)]/40">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[var(--accent-500)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Production API Secret Key</h3>
          </div>
          <Badge variant="success">ACTIVE KEY</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 font-mono text-xs bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-[var(--text-primary)] select-all">
            <span>{apiKeyRevealed ? rawSecretKey : maskedSecretKey}</span>
            <button
              onClick={() => setApiKeyRevealed(!apiKeyRevealed)}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {apiKeyRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyKey}
            leftIcon={copiedKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          >
            {copiedKey ? 'Copied Key!' : 'Copy Key'}
          </Button>

          <Button variant="secondary" size="sm">
            Roll Key Secret
          </Button>
        </div>
      </Card>

      {/* STRIPE-STYLE INTERACTIVE API EXPLORER */}
      <Card elevation={2} className="space-y-6 bg-[var(--bg-surface-raised)] border border-[var(--border-default)]">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--accent-500)]" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Interactive API Endpoint Explorer</h3>
          </div>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">LIVE EXECUTION ENGINE</span>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ENDPOINTS.map(ep => (
            <button
              key={ep.id}
              onClick={() => { setSelectedEndpointId(ep.id); setApiResponse(null); }}
              className={`
                p-3 rounded-xl border text-left text-xs transition-all space-y-1
                ${selectedEndpointId === ep.id 
                  ? 'bg-[var(--accent-500)]/15 border-[var(--accent-500)] text-[var(--text-primary)] shadow-xs' 
                  : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
              `}
            >
              <div className="flex items-center gap-2 font-mono font-bold">
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {ep.method}
                </span>
                <span className="truncate">{ep.path}</span>
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] line-clamp-1">{ep.description}</p>
            </button>
          ))}
        </div>

        {/* Request & Response Workbench */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Request Configuration */}
          <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] font-sans font-bold text-[var(--text-secondary)]">
              <span>REQUEST HEADERS</span>
              <span className="text-[var(--accent-500)]">cURL Preview</span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--ink-950)] text-emerald-400 space-y-1 overflow-x-auto text-[11px]">
              <div>curl -X {selectedEndpoint.method} "https://api.workforce-saas.com{selectedEndpoint.path}" \</div>
              <div>  -H "Authorization: Bearer {apiKeyRevealed ? rawSecretKey : maskedSecretKey}" \</div>
              <div>  -H "Content-Type: application/json"</div>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={handleExecuteRequest}
              disabled={isLoading}
              className="w-full"
              leftIcon={<Play className="w-4 h-4" />}
            >
              {isLoading ? 'Executing Request...' : 'Send API Request'}
            </Button>
          </div>

          {/* Right: Response Output Payload */}
          <div className="p-4 rounded-2xl bg-[var(--ink-950)] text-white border border-[var(--ink-800)] space-y-3 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-[var(--ink-400)] border-b border-[var(--ink-800)] pb-2 mb-3">
                <span>RESPONSE BODY (JSON)</span>
                {apiResponse ? (
                  <span className="text-emerald-400 font-bold">200 OK • 42ms</span>
                ) : (
                  <span>Awaiting Execution...</span>
                )}
              </div>

              <pre className="text-emerald-400 text-[11px] overflow-x-auto font-mono leading-relaxed">
                {isLoading ? '// Executing API Request...' : apiResponse || '// Click "Send API Request" to test endpoint.'}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
