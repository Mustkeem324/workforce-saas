import React, { useState } from 'react';
import { INK_PALETTE, ACCENT_PALETTE, SEMANTIC_PALETTE, SYSTEM_SURFACES } from '../tokens/colors';
import type { ColorToken } from '../tokens/colors';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Check, Copy } from 'lucide-react';

export const ColorTokensView: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">CSS VARIABLE TOKENS</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">var(--ink-*), var(--accent-*)</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Color System & Visual Identity Brief</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          1 Primary Ink color (Obsidian Charcoal), 1 Warm Accent (Copper Terracotta), 4 Semantics, and surface mappings. 
          No hardcoded hex codes exist inside component files.
        </p>
      </div>

      {/* Primary Ink Palette */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">1. Primary Ink Palette (Obsidian Charcoal)</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Replaces default slate-900 with rich dark obsidian tones</p>
          </div>
          <Badge variant="neutral">10 Swatches</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {INK_PALETTE.map((token: ColorToken) => (
            <div
              key={token.name}
              onClick={() => copyToClipboard(`var(${token.variable})`, token.name)}
              className="group cursor-pointer flex flex-col gap-2 p-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all bg-[var(--bg-canvas)]"
            >
              <div 
                className="h-16 w-full rounded-lg shadow-inner flex items-end justify-end p-1.5 transition-transform group-hover:scale-95"
                style={{ backgroundColor: token.hex }}
              >
                {copiedToken === token.name ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 bg-black/60 rounded p-0.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded p-0.5" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate">{token.name}</div>
                <div className="text-[10px] font-mono text-[var(--accent-500)] truncate">{token.variable}</div>
                <div className="text-[10px] font-mono text-[var(--text-tertiary)]">{token.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Warm Accent Palette */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">2. Warm Accent Palette (Copper Terracotta)</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Warm humanistic accent replacing generic SaaS blue & purple</p>
          </div>
          <Badge variant="accent">Brand Token</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {ACCENT_PALETTE.map((token: ColorToken) => (
            <div
              key={token.name}
              onClick={() => copyToClipboard(`var(${token.variable})`, token.name)}
              className="group cursor-pointer flex flex-col gap-2 p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all bg-[var(--bg-canvas)]"
            >
              <div 
                className="h-20 w-full rounded-lg shadow-md flex items-end justify-end p-2 transition-transform group-hover:scale-95"
                style={{ backgroundColor: token.hex }}
              >
                {copiedToken === token.name ? (
                  <Check className="w-4 h-4 text-white bg-black/60 rounded p-0.5" />
                ) : (
                  <Copy className="w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded p-0.5" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">{token.name}</div>
                <div className="text-[10px] font-mono text-[var(--accent-500)]">{token.variable}</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{token.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Semantic Color Tokens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h3 className="text-base font-bold text-[var(--text-primary)]">3. Semantic Token Set</h3>
            <Badge variant="info">4 Core Semantics</Badge>
          </div>

          <div className="space-y-3">
            {SEMANTIC_PALETTE.map((token: ColorToken) => (
              <div key={token.name} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm text-xs" style={{ backgroundColor: token.hex }}>
                    {token.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{token.name}</h4>
                    <p className="text-[11px] text-[var(--text-tertiary)]">{token.role}</p>
                  </div>
                </div>
                <code className="text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--bg-element-hover)] px-2 py-1 rounded">
                  {token.variable}
                </code>
              </div>
            ))}
          </div>
        </Card>

        {/* System Surfaces & Dark Mode Mappings */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h3 className="text-base font-bold text-[var(--text-primary)]">4. Surface & Theme Adaptability</h3>
            <Badge variant="success">Day 1 Dark Mode</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {SYSTEM_SURFACES.map((surf) => (
              <div key={surf.token} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-2">
                <div className="flex items-center justify-between font-mono font-semibold text-[var(--accent-500)]">
                  <span>{surf.token}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)] font-sans">{surf.desc}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-white text-slate-900 border border-slate-200 flex justify-between items-center">
                    <span className="font-semibold">Light</span>
                    <code className="font-mono">{surf.light}</code>
                  </div>
                  <div className="p-2 rounded bg-slate-900 text-slate-100 border border-slate-800 flex justify-between items-center">
                    <span className="font-semibold">Dark</span>
                    <code className="font-mono">{surf.dark}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
