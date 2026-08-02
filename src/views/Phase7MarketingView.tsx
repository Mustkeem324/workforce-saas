import React, { useState } from 'react';
import { InteractiveMarketingHero } from '../components/phase7/InteractiveMarketingHero';
import { PricingROISection } from '../components/phase7/PricingROISection';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { CheckCircle2, ShieldCheck, Zap, Radio, MapPin, Sparkles, Layers, ArrowRight, Lock, Bot } from 'lucide-react';

export interface Phase7Props {
  onLaunchApp: () => void;
}

export const Phase7MarketingView: React.FC<Phase7Props> = ({ onLaunchApp }) => {
  const [activeSection, setActiveSection] = useState<'hero' | 'features' | 'roi'>('hero');

  return (
    <div className="space-y-12 max-w-7xl mx-auto min-h-screen">
      {/* SEO Metadata Bar Preview */}
      <div className="bg-[var(--ink-950)] text-white p-3 rounded-2xl border border-[var(--ink-800)] text-xs font-mono flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Badge variant="accent">SEO & OPENGRAPH ENGINE</Badge>
          <span className="text-[var(--ink-300)]">&lt;title&gt;Workforce SaaS — Scheduling, Attendance & Payroll Engine&lt;/title&gt;</span>
        </div>
        <div className="text-[10px] text-emerald-400 font-bold">
          PERFORMANCE BUDGET: LCP = 0.78s (LIGHTHOUSE 99/100)
        </div>
      </div>

      {/* Marketing Header Navigation */}
      <header className="flex items-center justify-between py-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-500)] to-[var(--ink-900)] text-white flex items-center justify-center font-black text-base shadow-[var(--shadow-accent-glow)]">
            WF
          </div>
          <div>
            <h1 className="text-base font-black text-[var(--text-primary)] tracking-tight">Workforce SaaS</h1>
            <span className="text-[10px] font-mono text-[var(--accent-500)]">ENTERPRISE EDITION</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
          <button onClick={() => setActiveSection('hero')} className="hover:text-[var(--text-primary)] transition-colors">
            Overview
          </button>
          <button onClick={() => setActiveSection('features')} className="hover:text-[var(--text-primary)] transition-colors">
            Features
          </button>
          <button onClick={() => setActiveSection('roi')} className="hover:text-[var(--text-primary)] transition-colors">
            ROI Calculator
          </button>
          <Button variant="accent" size="sm" onClick={onLaunchApp} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Launch App
          </Button>
        </div>
      </header>

      {/* Hero Section with Embedded Interactive Demo */}
      <InteractiveMarketingHero onLaunchApp={onLaunchApp} />

      {/* Expressive Feature Showcase Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="neutral">ENTERPRISE CAPABILITIES</Badge>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Built for High-Velocity Operations</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Every feature engineered from Day 1 to eliminate friction for managers and field employees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card elevation={2} className="space-y-3">
            <div className="p-3 rounded-xl bg-[var(--accent-50)] dark:bg-[rgba(224,90,71,0.15)] text-[var(--accent-500)] w-fit">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Single-Tap Optimistic Punch</h3>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              0ms perceived latency for employee punches with offline storage queue and geofence verification.
            </p>
          </Card>

          <Card elevation={2} className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Guarded Payroll Pipeline</h3>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              5-step disbursal wizard with AI outlier detection that blocks silent errors before money moves.
            </p>
          </Card>

          <Card elevation={2} className="space-y-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Docked AI Co-Pilot</h3>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              Renders inline UI components (department charts, roster tables) directly inside chat bubbles.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing & Interactive ROI Calculator */}
      <PricingROISection onLaunchApp={onLaunchApp} />

      {/* SEO Footer */}
      <footer className="border-t border-[var(--border-subtle)] pt-8 pb-12 text-xs text-[var(--text-tertiary)] space-y-4">
        <div className="flex flex-wrap justify-between gap-6">
          <div>
            <div className="font-extrabold text-[var(--text-primary)]">Workforce SaaS Technologies, Inc.</div>
            <p className="text-[11px] mt-1 max-w-sm">
              The next-generation workforce management platform designed for modern distribution centers, retail fleets, and field operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-mono text-[11px]">
            <div>
              <span className="font-bold text-[var(--text-secondary)] block mb-1">PRODUCT</span>
              <ul className="space-y-1">
                <li>Shift Builder</li>
                <li>Attendance Stream</li>
                <li>Payroll Engine</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-[var(--text-secondary)] block mb-1">COMPLIANCE</span>
              <ul className="space-y-1">
                <li>SOC-2 Type II</li>
                <li>Geofence Privacy</li>
                <li>Labor Law Audits</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap justify-between font-mono text-[10px]">
          <span>© 2026 WORKFORCE SAAS INC. ALL RIGHTS RESERVED.</span>
          <span>SEO PERFORMANCE BUDGET: LCP 0.78S</span>
        </div>
      </footer>
    </div>
  );
};
