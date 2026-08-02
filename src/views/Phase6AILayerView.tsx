import React, { useState } from 'react';
import { Bot, Sparkles, HeartPulse } from 'lucide-react';
import { DockedAIAssistant } from '../components/phase6/DockedAIAssistant';
import { ProactiveAnomalyDigest } from '../components/phase6/ProactiveAnomalyDigest';
import { AttritionRiskProfileCards } from '../components/phase6/AttritionRiskProfileCards';
import { Badge } from '../components/ui/badge';

export const Phase6AILayerView: React.FC = () => {
  const [subTab, setSubTab] = useState<'digest' | 'assistant' | 'attrition'>('digest');

  const subTabs = [
    { id: 'digest', label: '1. Proactive Anomaly Digest', icon: <Sparkles className="w-4 h-4" />, desc: 'Homepage AI summary card' },
    { id: 'assistant', label: '2. Docked AI Co-Pilot Chat', icon: <Bot className="w-4 h-4" />, desc: 'Docked panel with inline UI component rendering' },
    { id: 'attrition', label: '3. Attrition Risk Signals', icon: <HeartPulse className="w-4 h-4" />, desc: 'Subtle risk badges & transparent factor drawer' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 6 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">INTELLIGENT AI LAYER & CO-PILOT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 6 — AI Co-Pilot & Predictive Workforce Layer</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Docked chat with inline component rendering, homepage anomaly summary card, and transparent attrition signals.
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
        {subTab === 'digest' && (
          <div className="space-y-6">
            <ProactiveAnomalyDigest />
            <AttritionRiskProfileCards />
          </div>
        )}
        {subTab === 'assistant' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Interactive Docked AI Assistant Environment</h3>
              <p className="text-xs text-[var(--text-tertiary)]">
                Notice how the AI chat is docked to the side instead of blocking the full screen as a modal. 
                Queries render inline UI components (department charts, shift tables) directly inside chat bubbles!
              </p>
              <ProactiveAnomalyDigest />
            </div>
            <DockedAIAssistant />
          </div>
        )}
        {subTab === 'attrition' && <AttritionRiskProfileCards />}
      </div>
    </div>
  );
};
