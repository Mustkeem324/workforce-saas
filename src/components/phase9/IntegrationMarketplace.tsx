import React, { useState } from 'react';
import { Plug, Search, CheckCircle2, AlertCircle, Plus, ExternalLink, Settings, ShieldCheck, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface IntegrationConnector {
  id: string;
  name: string;
  category: 'Payroll & ERP' | 'Messaging & Alerts' | 'Hardware & Biometrics';
  description: string;
  status: 'Connected' | 'Needs Attention' | 'Not Connected';
  iconBg: string;
  lastSync?: string;
}

const CONNECTORS: IntegrationConnector[] = [
  {
    id: 'int-qb',
    name: 'QuickBooks Online',
    category: 'Payroll & ERP',
    description: 'Auto-sync general ledger payroll entries and tax withholding journals directly into QuickBooks.',
    status: 'Connected',
    iconBg: 'bg-emerald-600',
    lastSync: '12 mins ago'
  },
  {
    id: 'int-zoho',
    name: 'Zoho Books',
    category: 'Payroll & ERP',
    description: 'Automated accounts payable disbursal vouchers and expense claims sync.',
    status: 'Connected',
    iconBg: 'bg-blue-600',
    lastSync: '1 hour ago'
  },
  {
    id: 'int-tally',
    name: 'Tally Prime ERP',
    category: 'Payroll & ERP',
    description: 'XML voucher payload sync for local Tally Prime enterprise instances.',
    status: 'Needs Attention',
    iconBg: 'bg-amber-600',
    lastSync: 'Token Expired (2 days ago)'
  },
  {
    id: 'int-slack',
    name: 'Slack Workforce Bot',
    category: 'Messaging & Alerts',
    description: 'Real-time notifications for shift swap requests, overtime alerts, and clock-in reminders.',
    status: 'Connected',
    iconBg: 'bg-purple-600',
    lastSync: 'Real-time Webhook'
  },
  {
    id: 'int-wa',
    name: 'WhatsApp Business Kiosk',
    category: 'Messaging & Alerts',
    description: 'Allow field employees to send GPS punches and request leave via verified WhatsApp chat.',
    status: 'Not Connected',
    iconBg: 'bg-emerald-500'
  },
  {
    id: 'int-zkteco',
    name: 'ZKTeco Hardware SDK',
    category: 'Hardware & Biometrics',
    description: 'Direct UDP/TCP biometric hardware terminal sync protocol for facial recognition and fingerprint kiosks.',
    status: 'Connected',
    iconBg: 'bg-[var(--accent-500)]',
    lastSync: 'Live UDP Heartbeat'
  }
];

export const IntegrationMarketplace: React.FC = () => {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>(CONNECTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredConnectors = connectors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Plug className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Enterprise Integration Marketplace</h2>
            <Badge variant="accent">PRE-BUILT CONNECTORS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Connect workforce data with QuickBooks, Zoho Books, Tally, Slack, WhatsApp, and biometric hardware terminals.
          </p>
        </div>

        <Input
          placeholder="Search integrations..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="w-56"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {['All', 'Payroll & ERP', 'Messaging & Alerts', 'Hardware & Biometrics'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-3.5 py-1.5 rounded-xl font-semibold border transition-all
              ${selectedCategory === cat 
                ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-xs' 
                : 'bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnectors.map(c => {
          const isConnected = c.status === 'Connected';
          const isWarning = c.status === 'Needs Attention';

          return (
            <Card key={c.id} elevation={2} className="space-y-4 flex flex-col justify-between hover:border-[var(--border-accent)] transition-all">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0`}>
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{c.name}</h3>
                      <Badge variant="neutral">{c.category}</Badge>
                    </div>
                  </div>

                  <Badge variant={isConnected ? 'success' : isWarning ? 'warning' : 'neutral'}>
                    {c.status}
                  </Badge>
                </div>

                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  {c.description}
                </p>

                {c.lastSync && (
                  <div className="text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5 pt-1">
                    <RefreshCw className="w-3 h-3 text-[var(--accent-500)]" />
                    <span>Sync: {c.lastSync}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {isConnected ? (
                  <Button variant="outline" size="sm" className="w-full" leftIcon={<Settings className="w-4 h-4 text-[var(--accent-500)]" />}>
                    Configure Settings
                  </Button>
                ) : isWarning ? (
                  <Button variant="destructive" size="sm" className="w-full">
                    Re-Authenticate API Token
                  </Button>
                ) : (
                  <Button variant="accent" size="sm" className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
                    Install Connector
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
