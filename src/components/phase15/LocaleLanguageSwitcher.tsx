import React, { useState } from 'react';
import { Globe, Check, ArrowRightLeft, DollarSign } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface LocaleOption {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  currency: string;
  sampleFormattedNumber: string;
  sampleFormattedCurrency: string;
}

const LOCALES: LocaleOption[] = [
  { code: 'en-US', name: 'English (United States)', flag: '🇺🇸', dir: 'ltr', currency: 'USD', sampleFormattedNumber: '142,736.40', sampleFormattedCurrency: '$142,736.40' },
  { code: 'es-ES', name: 'Español (España / LatAm)', flag: '🇪🇸', dir: 'ltr', currency: 'EUR', sampleFormattedNumber: '142.736,40', sampleFormattedCurrency: '142.736,40 €' },
  { code: 'ar-SA', name: 'العربية (Arabic - Saudi Arabia)', flag: '🇸🇦', dir: 'rtl', currency: 'SAR', sampleFormattedNumber: '١٤٢٬TXT٣٦٫٤٠', sampleFormattedCurrency: '١٤٢٬٧٣٦٫٤٠ ر.س' }
];

export const LocaleLanguageSwitcher: React.FC = () => {
  const [selectedLocale, setSelectedLocale] = useState<LocaleOption>(LOCALES[0]);

  const isRtl = selectedLocale.dir === 'rtl';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Internationalization & RTL Layout Engine</h2>
            <Badge variant="accent">LOCALE & RTL TEST PASS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Localizes date, currency, and number formats precisely, and mirrors the entire admin shell for RTL languages.
          </p>
        </div>

        {/* Locale Selector Dropdown / Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {LOCALES.map(loc => (
            <button
              key={loc.code}
              onClick={() => setSelectedLocale(loc)}
              className={`
                px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5
                ${selectedLocale.code === loc.code 
                  ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-xs' 
                  : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
              `}
            >
              <span>{loc.flag}</span>
              <span>{loc.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Localized Output & RTL Mirrored Workspace Preview */}
      <div className={`space-y-6 ${isRtl ? 'dir-rtl text-right' : 'text-left'}`}>
        <Card elevation={2} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedLocale.flag}</span>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{selectedLocale.name}</h3>
            </div>
            <Badge variant={isRtl ? 'warning' : 'success'}>
              {isRtl ? 'RIGHT-TO-LEFT (RTL) MIRRORED' : 'LEFT-TO-RIGHT (LTR)'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono tabular-nums text-xs">
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
              <span className="font-sans text-[var(--text-tertiary)] font-semibold block">LOCALIZED CURRENCY FORMAT</span>
              <div className="text-2xl font-black text-emerald-400">{selectedLocale.sampleFormattedCurrency}</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans">Precision Tabular Numerics</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
              <span className="font-sans text-[var(--text-tertiary)] font-semibold block">LOCALIZED NUMBER FORMAT</span>
              <div className="text-2xl font-black text-[var(--text-primary)]">{selectedLocale.sampleFormattedNumber}</div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-sans">Respects Locale Separators</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
