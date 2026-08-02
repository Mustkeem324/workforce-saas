import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, Info, HeartPulse, User, Calendar, Clock, ChevronRight, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface EmployeeAttritionProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  retentionScore: number; // 0..100 (Higher = More stable)
  riskLevel: 'Stable' | 'Low Risk' | 'Moderate Risk';
  riskBadgeColor: 'success' | 'warning' | 'accent';
  contributingFactors: {
    factor: string;
    impact: string;
    detail: string;
  }[];
  recommendedIntervention: string;
}

const SAMPLE_PROFILES: EmployeeAttritionProfile[] = [
  {
    id: 'att-1',
    name: 'Taylor Reed',
    avatar: 'TR',
    role: 'Logistics Specialist',
    department: 'Warehouse & Logistics',
    retentionScore: 54,
    riskLevel: 'Moderate Risk',
    riskBadgeColor: 'warning',
    contributingFactors: [
      { factor: 'Consecutive Weekend Shifts', impact: '+2.4x Fatigue Index', detail: 'Worked 4 consecutive weekend emergency shifts over past 30 days.' },
      { factor: 'Overtime Hours Burden', impact: '+18.5h Above Cap', detail: 'Accumulated 18.5 overtime hours above standard weekly cap.' },
      { factor: 'Rest Period Gaps', impact: '3 Rest Violations', detail: '3 occurrences of rest gap < 11h between consecutive shifts.' }
    ],
    recommendedIntervention: 'Schedule 2 consecutive mandatory rest days next pay period & cap weekend shifts.'
  },
  {
    id: 'att-2',
    name: 'Jordan Chen',
    avatar: 'JC',
    role: 'Shift Operations Lead',
    department: 'Operations',
    retentionScore: 68,
    riskLevel: 'Low Risk',
    riskBadgeColor: 'accent',
    contributingFactors: [
      { factor: 'Shift Schedule Variability', impact: '+1.2x Stress Index', detail: 'Frequent rotation between morning and night shifts.' },
      { factor: 'High Workload Volume', impact: '96% Capacity', detail: 'Managing double-coverage during peak intake hours.' }
    ],
    recommendedIntervention: 'Stabilize shift pattern to fixed morning schedule.'
  },
  {
    id: 'att-3',
    name: 'Alex Rivera',
    avatar: 'AR',
    role: 'Senior Tech Lead',
    department: 'Engineering',
    retentionScore: 92,
    riskLevel: 'Stable',
    riskBadgeColor: 'success',
    contributingFactors: [
      { factor: 'Consistent Rest Days', impact: 'Optimal Recovery', detail: '100% compliance with weekly 48h rest policy.' },
      { factor: 'Balanced Workload', impact: 'Low Fatigue', detail: 'Average 37.5 hours per week.' }
    ],
    recommendedIntervention: 'No retention intervention required. High stability rating.'
  }
];

export const AttritionRiskProfileCards: React.FC = () => {
  const [profiles] = useState<EmployeeAttritionProfile[]>(SAMPLE_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState<EmployeeAttritionProfile | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Attrition Risk & Retention Signals</h2>
            <Badge variant="accent">TRANSPARENT FACTOR EXPLANATIONS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Subtle risk badges on profile cards with transparent contributing factor breakdowns — no alarmist banners.
          </p>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map(prof => (
          <Card key={prof.id} elevation={2} className="space-y-4 flex flex-col justify-between hover:border-[var(--border-accent)] transition-all">
            <div className="space-y-3">
              {/* Profile Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-500)] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {prof.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">{prof.name}</h3>
                    <p className="text-xs text-[var(--text-tertiary)]">{prof.role}</p>
                  </div>
                </div>

                {/* Subtle Risk Badge */}
                <Badge variant={prof.riskBadgeColor}>
                  {prof.riskLevel}
                </Badge>
              </div>

              {/* Retention Score Progress */}
              <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-tertiary)] font-sans text-[11px]">Retention Stability Index:</span>
                  <span className="font-bold text-[var(--text-primary)]">{prof.retentionScore} / 100</span>
                </div>
                <div className="w-full bg-[var(--bg-element-hover)] h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${prof.retentionScore > 80 ? 'bg-emerald-500' : prof.retentionScore > 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${prof.retentionScore}%` }}
                  />
                </div>
              </div>

              {/* Contributing Factors Snippet */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block">Key Retention Signal:</span>
                <p className="text-[var(--text-secondary)] font-medium bg-[var(--bg-canvas)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
                  {prof.contributingFactors[0].factor} ({prof.contributingFactors[0].impact})
                </p>
              </div>
            </div>

            {/* Action to open transparent breakdown drawer */}
            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => setSelectedProfile(prof)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Inspect Contributing Factors
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Contextual Factor Explanation Drawer / Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl p-6 max-w-lg w-full shadow-[var(--shadow-4)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-500)] text-white font-bold text-sm flex items-center justify-center">
                    {selectedProfile.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[var(--text-primary)]">{selectedProfile.name}</h3>
                    <p className="text-xs text-[var(--text-tertiary)]">{selectedProfile.role} • {selectedProfile.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Transparent Factors Breakdown List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Transparent Factor Attribution Matrix
                </h4>

                <div className="space-y-2.5">
                  {selectedProfile.contributingFactors.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-[var(--text-primary)]">
                        <span>{fact.factor}</span>
                        <span className="font-mono text-[var(--accent-500)]">{fact.impact}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-tertiary)]">{fact.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Retention Intervention */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1 text-amber-300">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Info className="w-4 h-4" />
                  Recommended Retention Action
                </span>
                <p className="text-[11px] text-amber-200">{selectedProfile.recommendedIntervention}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
