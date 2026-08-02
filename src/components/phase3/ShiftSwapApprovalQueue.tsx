import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Check, X, Clock, Calendar, User, ShieldCheck, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface ShiftSwapCard {
  id: string;
  requestorName: string;
  requestorRole: string;
  requestorAvatar: string;
  requestorShift: string;
  requestorDate: string;

  targetName: string;
  targetRole: string;
  targetAvatar: string;
  targetShift: string;
  targetDate: string;

  reason: string;
  overtimeImpact: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const SAMPLE_SWAP_CARDS: ShiftSwapCard[] = [
  {
    id: 'swap-1',
    requestorName: 'Alex Rivera',
    requestorRole: 'Senior Tech Lead',
    requestorAvatar: 'AR',
    requestorShift: 'Morning (08:00 AM - 04:00 PM)',
    requestorDate: 'Tuesday, Aug 4',

    targetName: 'Jordan Chen',
    targetRole: 'Shift Operations Lead',
    targetAvatar: 'JC',
    targetShift: 'Evening (04:00 PM - 12:00 AM)',
    targetDate: 'Wednesday, Aug 5',

    reason: 'Family medical appointment on Tuesday morning.',
    overtimeImpact: 'Zero Net Overtime Impact (Both 8.0h)',
    status: 'Pending'
  },
  {
    id: 'swap-2',
    requestorName: 'Morgan Smith',
    requestorRole: 'Dispatch Coordinator',
    requestorAvatar: 'MS',
    requestorShift: 'Day (09:00 AM - 05:00 PM)',
    requestorDate: 'Thursday, Aug 6',

    targetName: 'Taylor Reed',
    targetRole: 'Logistics Specialist',
    targetAvatar: 'TR',
    targetShift: 'Morning (08:00 AM - 04:00 PM)',
    targetDate: 'Friday, Aug 7',

    reason: 'Attending certified logistics training workshop.',
    overtimeImpact: 'Zero Net Overtime Impact (Both 8.0h)',
    status: 'Pending'
  }
];

export const ShiftSwapApprovalQueue: React.FC = () => {
  const [swaps, setSwaps] = useState<ShiftSwapCard[]>(SAMPLE_SWAP_CARDS);
  const [swipeDirections, setSwipeDirections] = useState<Record<string, 'right' | 'left' | null>>({});

  const handleAction = (id: string, status: 'Approved' | 'Rejected') => {
    setSwaps(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status };
      }
      return s;
    }));
  };

  const pendingSwaps = swaps.filter(s => s.status === 'Pending');
  const processedSwaps = swaps.filter(s => s.status !== 'Pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Shift Swap Approval Cards</h2>
            <Badge variant="accent">SWIPE-TO-APPROVE QUEUE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Card-based swipe approval queue for mobile & desktop instead of flat data tables.
          </p>
        </div>

        <Badge variant="neutral">{pendingSwaps.length} Pending Approvals</Badge>
      </div>

      {/* Card Swipe Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {pendingSwaps.map(swap => (
            <motion.div
              key={swap.id}
              drag="x"
              dragConstraints={{ left: -120, right: 120 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) handleAction(swap.id, 'Approved');
                else if (info.offset.x < -80) handleAction(swap.id, 'Rejected');
              }}
              whileGrab={{ scale: 1.02 }}
              className="bg-[var(--bg-surface-raised)] border-2 border-[var(--border-default)] rounded-3xl p-6 shadow-[var(--shadow-3)] relative cursor-grab active:cursor-grabbing select-none"
            >
              {/* Swipe Direction Hint Labels */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[var(--text-tertiary)] mb-4 border-b border-[var(--border-subtle)] pb-3">
                <span className="text-rose-400">← SWIPE LEFT TO REJECT</span>
                <span className="text-emerald-400">SWIPE RIGHT TO APPROVE →</span>
              </div>

              {/* Swap Participants Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Requestor Card */}
                <div className="p-3.5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-500)] text-white font-bold text-xs flex items-center justify-center">
                      {swap.requestorAvatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">{swap.requestorName}</h4>
                      <p className="text-[10px] text-[var(--text-tertiary)]">{swap.requestorRole}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px]">
                    <span className="text-[var(--text-tertiary)] block text-[9px]">OFFERING SHIFT</span>
                    <span className="font-bold text-[var(--accent-500)]">{swap.requestorDate}</span>
                    <div className="text-[10px] text-[var(--text-secondary)]">{swap.requestorShift}</div>
                  </div>
                </div>

                {/* Target Recipient Card */}
                <div className="p-3.5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {swap.targetAvatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">{swap.targetName}</h4>
                      <p className="text-[10px] text-[var(--text-tertiary)]">{swap.targetRole}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px]">
                    <span className="text-[var(--text-tertiary)] block text-[9px]">TAKING SHIFT</span>
                    <span className="font-bold text-indigo-400">{swap.targetDate}</span>
                    <div className="text-[10px] text-[var(--text-secondary)]">{swap.targetShift}</div>
                  </div>
                </div>
              </div>

              {/* Justification & Impact */}
              <div className="space-y-2 text-xs bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-subtle)] mb-5">
                <div className="text-[var(--text-secondary)] italic">
                  <span className="font-bold text-[var(--text-primary)]">Reason:</span> "{swap.reason}"
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {swap.overtimeImpact}
                </div>
              </div>

              {/* Desktop Button Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="destructive"
                  onClick={() => handleAction(swap.id, 'Rejected')}
                  leftIcon={<ThumbsDown className="w-4 h-4" />}
                >
                  Decline Swap
                </Button>
                <Button
                  variant="accent"
                  onClick={() => handleAction(swap.id, 'Approved')}
                  leftIcon={<ThumbsUp className="w-4 h-4" />}
                >
                  Approve Swap
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Processed History Log */}
      {processedSwaps.length > 0 && (
        <Card elevation={1} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Recently Actioned Swaps</h3>
          <div className="space-y-2">
            {processedSwaps.map(ps => (
              <div key={ps.id} className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">{ps.requestorName}</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[var(--accent-500)]" />
                  <span className="font-bold text-[var(--text-primary)]">{ps.targetName}</span>
                </div>
                <Badge variant={ps.status === 'Approved' ? 'success' : 'danger'}>{ps.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
