import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export interface PulseOption {
  emoji: string;
  label: string;
  val: number;
}

export const LowFrictionPulseSurvey: React.FC = () => {
  const [selectedVal, setSelectedVal] = useState<number | null>(null);

  const options: PulseOption[] = [
    { emoji: '😄', label: 'Great & Supported', val: 4 },
    { emoji: '🙂', label: 'Good & Balanced', val: 3 },
    { emoji: '😐', label: 'Okay / Neutral', val: 2 },
    { emoji: '🙁', label: 'Stressed / Overwhelmed', val: 1 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Single-Question Low-Friction Pulse Survey</h2>
            <Badge variant="accent">1-TAP EMOJI RESPONSE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Low friction is essential or response rates collapse. Single-tap response with 100% anonymization.
          </p>
        </div>
      </div>

      {/* SINGLE-QUESTION EMOJI WIDGET */}
      <Card elevation={2} className="p-8 border-2 border-[var(--border-accent)]/40 max-w-xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <Badge variant="neutral">WEEKLY PULSE CHECK</Badge>
          <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
            How supported did you feel by your shift lead this week?
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">1-tap response • 100% Anonymous Feedback</p>
        </div>

        {selectedVal === null ? (
          <div className="grid grid-cols-4 gap-3 pt-2">
            {options.map(opt => (
              <button
                key={opt.val}
                onClick={() => setSelectedVal(opt.val)}
                className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--accent-500)] hover:scale-105 transition-all space-y-2 group"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">{opt.emoji}</div>
                <span className="text-[10px] font-bold text-[var(--text-secondary)] block">{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2"
          >
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <h4 className="text-base font-bold">Thank you for your feedback!</h4>
            <p className="text-xs text-emerald-300">Your response has been recorded anonymously.</p>
          </motion.div>
        )}
      </Card>
    </div>
  );
};
