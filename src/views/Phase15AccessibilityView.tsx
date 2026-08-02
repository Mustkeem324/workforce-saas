import React, { useState } from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { LocaleLanguageSwitcher } from '../components/phase15/LocaleLanguageSwitcher';
import { WcagAccessibilityAuditPass } from '../components/phase15/WcagAccessibilityAuditPass';
import { Badge } from '../components/ui/badge';

export const Phase15AccessibilityView: React.FC = () => {
  const [subTab, setSubTab] = useState<'locale' | 'wcag'>('locale');

  const subTabs = [
    { id: 'locale', label: '1. Language & RTL Layout Engine', icon: <Globe className="w-4 h-4" />, desc: 'Locale currency/number formatting & RTL layout mirroring' },
    { id: 'wcag', label: '2. WCAG 2.1 AA Accessibility Audit', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Screen reader ARIA roles, focus order & 4.5:1 contrast pass' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 15 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">ACCESSIBILITY & INTERNATIONALIZATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 15 — Accessibility & Internationalization Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Full WCAG 2.1 AA audit pass, localized currency/number formatting, and right-to-left (RTL) layout mirroring.
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
        {subTab === 'locale' && <LocaleLanguageSwitcher />}
        {subTab === 'wcag' && <WcagAccessibilityAuditPass />}
      </div>
    </div>
  );
};
