import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, X, ShieldCheck, DollarSign, TrendingUp, AlertCircle, ArrowRight, Layers, Eye } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface AIShiftProposal {
  id: string;
  employeeName: string;
  role: string;
  originalShift: string;
  proposedShift: string;
  confidenceScore: number;
  costSavings: string;
  reason: string;
  accepted?: boolean;
  rejected?: boolean;
}

const SAMPLE_AI_PROPOSALS: AIShiftProposal[] = [
  {
    id: 'ai-1',
    employeeName: 'Alex Rivera',
    role: 'Senior Tech Lead',
    originalShift: '08:00 AM - 06:00 PM (10.0h - Overtime Risk)',
    proposedShift: '08:00 AM - 04:00 PM (8.0h Standard)',
    confidenceScore: 98,
    costSavings: '$145.50 (Avoids 1.5h Overtime Rate)',
    reason: 'Transfers 2 overtime hours to Taylor Reed who has available weekly capacity.'
  },
  {
    id: 'ai-2',
    employeeName: 'Jordan Chen',
    role: 'Shift Operations Lead',
    originalShift: '12:00 AM - 08:00 AM (Night Shift)',
    proposedShift: '04:00 PM - 12:00 AM (Evening Shift)',
    confidenceScore: 94,
    costSavings: '$82.00 (Optimized Shift Premium)',
    reason: 'Eliminates rest-period violation (<11h gap) between Tuesday and Wednesday shifts.'
  },
  {
    id: 'ai-3',
    employeeName: 'Taylor Reed',
    role: 'Logistics Specialist',
    originalShift: 'Off Day (0.0h)',
    proposedShift: '04:00 PM - 08:00 PM (4.0h Peak Fill)',
    confidenceScore: 91,
    costSavings: '$0.00 (Fills High Demand Window)',
    reason: 'Covers distribution surge window without incurring overtime wages.'
  }
];

export const AISuggestionOverlay: React.FC = () => {
  const [proposals, setProposals] = useState<AIShiftProposal[]>(SAMPLE_AI_PROPOSALS);
  const [showGhostOverlay, setShowGhostOverlay] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  const handleCherryPick = (id: string, accept: boolean) => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, accepted: accept, rejected: !accept };
      }
      return p;
    }));
  };

  const handleAcceptAll = () => {
    setProposals(prev => prev.map(p => ({ ...p, accepted: true, rejected: false })));
    setIsApplied(true);
  };

  const totalSavings = '$227.50 / week';
  const avgConfidence = Math.round(proposals.reduce((a, b) => a + b.confidenceScore, 0) / proposals.length);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">AI Roster Optimization Overlay</h2>
            <Badge variant="accent">NEVER AUTO-APPLIES SILENTLY</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Proposes cost & compliance optimizations as a ghost preview layer. Cherry-pick or accept all.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={showGhostOverlay ? 'accent' : 'outline'}
            size="sm"
            onClick={() => setShowGhostOverlay(!showGhostOverlay)}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            {showGhostOverlay ? 'Ghost Overlay: VISIBLE' : 'Ghost Overlay: HIDDEN'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAcceptAll}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Accept All AI Proposals
          </Button>
        </div>
      </div>

      {/* AI Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card elevation={1} className="flex items-center gap-4 border-l-4 border-l-[var(--accent-500)]">
          <div className="p-3 rounded-xl bg-[var(--accent-50)] dark:bg-[rgba(224,90,71,0.15)] text-[var(--accent-500)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">AI OPTIMIZER SCORE</span>
            <div className="text-2xl font-black font-mono tabular-nums text-[var(--text-primary)]">{avgConfidence}% Match</div>
          </div>
        </Card>

        <Card elevation={1} className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">ESTIMATED COST SAVINGS</span>
            <div className="text-2xl font-black font-mono tabular-nums text-emerald-400">{totalSavings}</div>
          </div>
        </Card>

        <Card elevation={1} className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">COMPLIANCE VIOLATIONS RESOLVED</span>
            <div className="text-2xl font-black font-mono tabular-nums text-[var(--text-primary)]">2 Conflicts Cleared</div>
          </div>
        </Card>
      </div>

      {/* Cherry-Pick Proposals List with Ghost Preview Overlay Effect */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Proposed Roster Adjustments (Cherry-Pick Matrix)
        </h3>

        <div className="space-y-4">
          {proposals.map(prop => {
            const isAccepted = prop.accepted;
            const isRejected = prop.rejected;

            return (
              <div
                key={prop.id}
                className={`
                  p-5 rounded-2xl border-2 transition-all relative overflow-hidden
                  ${showGhostOverlay ? 'border-dashed border-[var(--accent-500)]/80 bg-[var(--accent-500)]/5 shadow-[var(--shadow-accent-glow)]' : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)]'}
                  ${isAccepted ? 'border-solid border-emerald-500 bg-emerald-500/5' : ''}
                  ${isRejected ? 'border-solid border-red-500/40 opacity-50 bg-red-500/5' : ''}
                `}
              >
                {/* AI Ghost Watermark Badge */}
                {showGhostOverlay && !isAccepted && !isRejected && (
                  <div className="absolute top-0 right-0 bg-[var(--accent-500)] text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl font-mono">
                    GHOST PREVIEW OVERLAY
                  </div>
                )}

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-extrabold text-[var(--text-primary)]">{prop.employeeName}</h4>
                      <span className="text-xs text-[var(--text-tertiary)]">{prop.role}</span>
                      <Badge variant="accent">{prop.confidenceScore}% AI Confidence</Badge>
                    </div>

                    {/* Comparison Shift Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                        <span className="text-[10px] text-[var(--text-tertiary)] block">ORIGINAL SCHEDULED SHIFT</span>
                        <span className="font-mono font-semibold text-rose-400">{prop.originalShift}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-accent)]/40">
                        <span className="text-[10px] text-[var(--accent-500)] font-bold block">PROPOSED OPTIMIZED SHIFT</span>
                        <span className="font-mono font-bold text-emerald-400">{prop.proposedShift}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] italic">
                      <span className="font-semibold text-[var(--text-primary)]">Optimization Rationale:</span> "{prop.reason}"
                    </p>
                  </div>

                  {/* Cherry Pick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant={isRejected ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleCherryPick(prop.id, false)}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Decline
                    </Button>

                    <Button
                      variant={isAccepted ? 'accent' : 'secondary'}
                      size="sm"
                      onClick={() => handleCherryPick(prop.id, true)}
                      leftIcon={<Check className="w-4 h-4" />}
                    >
                      {isAccepted ? 'Accepted' : 'Accept Proposal'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
