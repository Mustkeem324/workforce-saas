import React, { useState } from 'react';
import { Plug, Terminal, Radio } from 'lucide-react';
import { IntegrationMarketplace } from '../components/phase9/IntegrationMarketplace';
import { DeveloperAPIExplorer } from '../components/phase9/DeveloperAPIExplorer';
import { WebhookDeliveryLogInspector } from '../components/phase9/WebhookDeliveryLogInspector';
import { Badge } from '../components/ui/badge';

export const Phase9IntegrationsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'marketplace' | 'explorer' | 'webhooks'>('marketplace');

  const subTabs = [
    { id: 'marketplace', label: '1. Integration Marketplace', icon: <Plug className="w-4 h-4" />, desc: 'Pre-built ERP, messaging & biometric connectors' },
    { id: 'explorer', label: '2. Developer API Console', icon: <Terminal className="w-4 h-4" />, desc: 'Stripe-style dashboard & interactive explorer' },
    { id: 'webhooks', label: '3. Webhook Delivery Logs', icon: <Radio className="w-4 h-4" />, desc: 'Timeline view & JSON payload inspector' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 9 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">INTEGRATIONS & DEVELOPER PLATFORM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 9 — Integrations & Developer Platform</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Pre-built ERP & biometric marketplace, Stripe-style API explorer, and webhook delivery payload inspector.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] p-2 rounded-2xl shadow-xs">
        {subTabs.map(tab => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                ${isActive 
                  ? 'bg-[var(--accent-500)] text-white shadow-[var(--shadow-accent-glow)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] hover:text-[var(--text-primary)]'}
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-view Viewport */}
      <div>
        {subTab === 'marketplace' && <IntegrationMarketplace />}
        {subTab === 'explorer' && <DeveloperAPIExplorer />}
        {subTab === 'webhooks' && <WebhookDeliveryLogInspector />}
      </div>
    </div>
  );
};
