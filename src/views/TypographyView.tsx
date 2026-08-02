import React, { useState, useEffect } from 'react';
import { UI_TYPE_SCALE, NUMERIC_TABULAR_SAMPLES } from '../tokens/typography';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Play, Pause, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const TypographyView: React.FC = () => {
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [val1, setVal1] = useState(14850.25);
  const [val2, setVal2] = useState(9420.10);
  const [val3, setVal3] = useState(21305.80);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLiveSimulating) {
      interval = setInterval(() => {
        setVal1(prev => +(prev + (Math.random() * 12.5 - 6.2)).toFixed(2));
        setVal2(prev => +(prev + (Math.random() * 8.4 - 4.2)).toFixed(2));
        setVal3(prev => +(prev + (Math.random() * 15.0 - 7.5)).toFixed(2));
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveSimulating]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="info">DUAL TYPE SCALE</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">Plus Jakarta Sans + JetBrains Mono</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Typography & Tabular Numerics Inspector</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          Non-tabular numbers shift layout boundaries as digits change (e.g. '1' vs '8'). 
          Phase 0 strictly enforces <code className="font-mono text-[var(--accent-500)]">font-variant-numeric: tabular-nums</code> across all monetary and hourly inputs.
        </p>
      </div>

      {/* Live Tabular vs Proportional Jiggle Demonstration */}
      <Card elevation={2} className="space-y-6 border-l-4 border-l-[var(--accent-500)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Live Layout Stability Test: Tabular vs Proportional</h3>
              <Badge variant="accent" dot>REALTIME BENCHMARK</Badge>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
              Notice how the top standard font jiggles and causes column width jittering during payroll calculations, while tabular numerics remains perfectly still.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            leftIcon={isLiveSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          >
            {isLiveSimulating ? 'Pause Counter Jitter' : 'Resume Live Jitter'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BAD: Proportional Jiggle */}
          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-red-500">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                WITHOUT TABULAR NUMS (STANDARD PROPORTIONAL FONT)
              </span>
              <span className="bg-red-500/20 px-2 py-0.5 rounded text-[10px]">FLUID DIGIT WIDTH</span>
            </div>

            <div className="space-y-2 font-sans text-xl font-bold text-[var(--text-primary)]">
              <div className="flex justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-normal text-[var(--text-tertiary)]">Gross Payroll A</span>
                <span className="text-red-400">${val1.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-normal text-[var(--text-tertiary)]">Tax Withheld B</span>
                <span className="text-red-400">${val2.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-normal text-[var(--text-tertiary)]">Net Payout C</span>
                <span className="text-red-400">${val3.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <p className="text-[11px] text-red-400/90 italic">
              Notice: The numbers wobble horizontally because character widths for '1' and '8' differ.
            </p>
          </div>

          {/* GOOD: Tabular Numerics */}
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                WITH TABULAR NUMERICS (JETBRAINS MONO / TABULAR-NUMS)
              </span>
              <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">100% MONOSPACED DIGITS</span>
            </div>

            <div className="space-y-2 font-mono tabular-nums text-xl font-bold text-[var(--text-primary)]">
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-normal font-sans text-[var(--text-tertiary)]">Gross Payroll A</span>
                <span className="text-emerald-400">${val1.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-normal font-sans text-[var(--text-tertiary)]">Tax Withheld B</span>
                <span className="text-emerald-400">${val2.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-normal font-sans text-[var(--text-tertiary)]">Net Payout C</span>
                <span className="text-emerald-400">${val3.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-400/90 italic">
              Result: Zero digit jiggling. Perfectly aligned columns across all live updates.
            </p>
          </div>
        </div>
      </Card>

      {/* UI Type Scale Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">UI Type Scale Breakdown</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Plus Jakarta Sans font family with defined size, line-height, tracking, and use cases</p>
          </div>
          <Badge variant="neutral">7 Hierarchy Levels</Badge>
        </div>

        <div className="space-y-4">
          {UI_TYPE_SCALE.map((scale) => (
            <div key={scale.name} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--accent-500)]">{scale.name}</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{scale.sizePx}px ({scale.sizeRem}) • LH {scale.lineHeight} • {scale.tracking}</span>
                </div>
                <div 
                  className="text-[var(--text-primary)] font-bold tracking-tight"
                  style={{ fontSize: scale.sizeRem, lineHeight: scale.lineHeight }}
                >
                  {scale.sample}
                </div>
              </div>
              <div className="text-xs text-[var(--text-tertiary)] max-w-xs md:text-right">
                <span className="font-semibold text-[var(--text-secondary)]">Use Case:</span> {scale.useCase}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
