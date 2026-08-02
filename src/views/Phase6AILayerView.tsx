import React from 'react';
import { Bot, Sparkles, AlertTriangle, TrendingDown } from 'lucide-react';
import { DockedAIAssistant } from '../components/phase6/DockedAIAssistant';
import { ProactiveAnomalyDigest } from '../components/phase6/ProactiveAnomalyDigest';
import { AttritionRiskProfileCards } from '../components/phase6/AttritionRiskProfileCards';
import { Badge } from '../components/ui/badge';

export const Phase6AILayerView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">AI CO-PILOT LAYER</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CONTEXTUAL AI & ATTRITION RISK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">AI Co-Pilot & Anomaly Digest</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Docked AI assistant rendering actual charts/tables inline, homepage proactive anomaly digest, and subtle attrition risk profile cards with factor attributions.
          </p>
        </div>
      </div>

      {/* Proactive Anomaly Digest Header Component */}
      <ProactiveAnomalyDigest />

      {/* Attrition Risk Profile Cards Grid */}
      <AttritionRiskProfileCards />

      {/* Docked Panel AI Assistant Component */}
      <DockedAIAssistant />
    </div>
  );
};
