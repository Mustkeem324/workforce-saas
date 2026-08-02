import React, { useState } from 'react';
import { MOTION_TOKENS } from '../tokens/motion';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Play, RotateCcw, MoveRight } from 'lucide-react';

export const MotionTokensView: React.FC = () => {
  const [testTrigger, setTestTrigger] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="warning">MOTION TOKENS</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">Micro 150ms • Panel 250ms • Spring Drag</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Motion System & Physics Inspector</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          Fast, purposeful micro-animations keep UI responsiveness high. All UI transitions are hard-capped under 400ms.
        </p>
      </div>

      {/* Motion Tokens Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOTION_TOKENS.map((token) => (
          <Card key={token.name} elevation={1} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--warning-solid)]">{token.duration}</span>
                <Badge variant="neutral">{token.durationMs}ms Cap</Badge>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">{token.name}</h3>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{token.useCase}</p>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--accent-500)] truncate">
              {token.easing}
            </div>
          </Card>
        ))}
      </div>

      {/* Interactive Motion Test Lab */}
      <Card elevation={2} className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Interactive Motion Testing Lab</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Trigger live animations to verify micro and panel physics</p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setTestTrigger(prev => prev + 1)}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Re-trigger Micro & Spring Animations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Test 1: Micro Motion 150ms */}
          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono font-bold text-[var(--accent-500)]">150ms MICRO INTERACTION</span>
            
            <motion.div
              key={`micro-${testTrigger}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 rounded-2xl bg-[var(--ink-900)] dark:bg-[var(--ink-100)] text-white dark:text-[var(--ink-950)] flex items-center justify-center font-bold text-xs shadow-md"
            >
              150ms
            </motion.div>

            <span className="text-xs text-[var(--text-tertiary)]">Instant hover/press response</span>
          </div>

          {/* Test 2: Panel Motion 250ms */}
          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono font-bold text-[var(--info-solid)]">250ms PANEL EXPANSION</span>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
            >
              {isPanelOpen ? 'Collapse Panel' : 'Expand Panel'}
            </Button>

            <AnimatePresence>
              {isPanelOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                  className="w-full bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-xl p-3 text-xs text-[var(--text-primary)] font-medium overflow-hidden"
                >
                  250ms smooth bezier transition. Standard for drawers & popovers.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Test 3: Spring Physics Drag */}
          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono font-bold text-[var(--success-solid)]">SPRING DRAG PHYSICS</span>

            <motion.div
              drag
              dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
              whileDrag={{ scale: 1.1, boxShadow: 'var(--shadow-4)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="w-24 h-16 rounded-xl bg-[var(--accent-500)] text-white flex items-center justify-center font-bold text-xs cursor-grab active:cursor-grabbing shadow-lg"
            >
              Drag Me
            </motion.div>

            <span className="text-xs text-[var(--text-tertiary)]">Interactive shift block spring rebound</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
