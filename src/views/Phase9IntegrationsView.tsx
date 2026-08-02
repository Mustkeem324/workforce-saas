import React from 'react';
import { Plug, Code2, Webhook, Cpu } from 'lucide-react';
import { IntegrationMarketplace } from '../components/phase9/IntegrationMarketplace';
import { DeveloperAPIExplorer } from '../components/phase9/DeveloperAPIExplorer';
import { WebhookDeliveryLogInspector } from '../components/phase9/WebhookDeliveryLogInspector';
import { Badge } from '../components/ui/badge';

export const Phase9IntegrationsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">DEVELOPER PLATFORM</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CONNECTOR MARKETPLACE & API EXPLORER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Developer API Marketplace</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Pre-built connector marketplace (QuickBooks, Zoho, Tally, Slack, ZKTeco), Stripe-style interactive API explorer, and webhook payload delivery inspector.
          </p>
        </div>
      </div>

      {/* Connector Marketplace */}
      <IntegrationMarketplace />

      {/* Interactive cURL API Explorer */}
      <DeveloperAPIExplorer />

      {/* Webhook Delivery Inspector */}
      <WebhookDeliveryLogInspector />
    </div>
  );
};
