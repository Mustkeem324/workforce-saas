import React from 'react';
import { Globe, Eye, Languages, Sparkles } from 'lucide-react';
import { WcagAccessibilityAuditPass } from '../components/phase15/WcagAccessibilityAuditPass';
import { LocaleLanguageSwitcher } from '../components/phase15/LocaleLanguageSwitcher';
import { Badge } from '../components/ui/badge';

export const Phase15AccessibilityView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">ACCESSIBILITY & I18N</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">WCAG 2.1 AA & RTL MIRRORING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Accessibility & Localized Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Full WCAG 2.1 AA audit pass (4.5:1 contrast, ARIA landmarks, focus rings), per-user locale preference with localized currency/number formatting, and RTL layout mirroring.
          </p>
        </div>
      </div>

      {/* WCAG 2.1 AA Conformance Audit Matrix */}
      <WcagAccessibilityAuditPass />

      {/* Locale Language Switcher & RTL Mirroring */}
      <LocaleLanguageSwitcher />
    </div>
  );
};
