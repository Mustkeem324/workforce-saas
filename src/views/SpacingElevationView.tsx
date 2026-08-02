import React from 'react';
import { SPACING_GRID } from '../tokens/spacing';
import { ELEVATION_TOKENS } from '../tokens/elevation';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const SpacingElevationView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="success">GRID & SHADOW SCALE</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">4px Base Grid • 4 Elevation Levels</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Spacing & Elevation System</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          Strictly enforced 4px baseline layout grid to prevent arbitrary margin drift, accompanied by a 4-level elevation system with dark mode glow tokens.
        </p>
      </div>

      {/* 4px Spacing Grid Scale */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">1. Enforced 4px Spacing Grid</h3>
            <p className="text-xs text-[var(--text-tertiary)]">All padding, margins, and gaps must strictly map to these tokens</p>
          </div>
          <Badge variant="neutral">10 Tokens</Badge>
        </div>

        <div className="space-y-3">
          {SPACING_GRID.map((sp) => (
            <div key={sp.name} className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <div className="w-24 shrink-0 font-mono text-xs font-bold text-[var(--accent-500)]">
                {sp.name}
              </div>
              <div className="w-20 shrink-0 font-mono text-xs text-[var(--text-secondary)]">
                {sp.pixel}px ({sp.rem})
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="bg-[var(--accent-500)] h-5 rounded transition-all flex items-center justify-end px-2 text-[10px] font-mono text-white font-bold"
                  style={{ width: `${Math.min(100, sp.pixel * 3)}px` }}
                >
                  {sp.pixel}px
                </div>
              </div>
              <div className="hidden md:block text-xs text-[var(--text-tertiary)] max-w-xs text-right">
                {sp.useCase}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Elevation System & Shadows */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">2. Elevation Levels & Shadow Hierarchy</h3>
            <p className="text-xs text-[var(--text-tertiary)]">3-4 consistent levels + warm accent focus glow for highlights</p>
          </div>
          <Badge variant="accent">Light & Dark Mode Calibrated</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {ELEVATION_TOKENS.map((elev) => (
            <div
              key={elev.level}
              className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] flex flex-col justify-between gap-4 transition-all"
              style={{ boxShadow: `var(${elev.variable})` }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[var(--accent-500)] uppercase font-mono">{elev.level}</span>
                  <code className="text-[10px] font-mono bg-[var(--bg-element-hover)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                    {elev.variable}
                  </code>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)]">{elev.name}</h4>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{elev.description}</p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)] space-y-1">
                <div><span className="font-semibold text-[var(--text-secondary)]">Light:</span> {elev.lightCSS}</div>
                <div><span className="font-semibold text-[var(--text-secondary)]">Dark:</span> {elev.darkCSS}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
