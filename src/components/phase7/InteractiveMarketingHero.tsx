import React from 'react';
import { Rocket, ArrowRight, Play, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MarketingHeroProps {
  onLaunchApp: () => void;
}

export const InteractiveMarketingHero: React.FC<MarketingHeroProps> = ({ onLaunchApp }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Container */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[var(--bg-surface-raised)] via-[var(--bg-surface-overlay)] to-[var(--ink-950)] p-8 md:p-16 border border-[var(--border-default)] overflow-hidden shadow-[var(--shadow-4)] text-center">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/40 text-xs font-mono text-[var(--accent-500)]">
            <Sparkles className="w-4 h-4" />
            <span>SYNKRON AI — NEXT-GEN WORKFORCE OS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            The Zero-Lag Workforce & Payroll Platform
          </h1>

          <p className="text-sm md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Built for multi-location enterprises in India. AI-native attendance capture, guarded INR payroll disbursal, smart roster builder, and real-time offline sync.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button variant="accent" size="lg" onClick={onLaunchApp} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Launch Live Application Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
