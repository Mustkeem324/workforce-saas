import React, { useState } from 'react';
import { Calendar, Sparkles, ArrowRightLeft } from 'lucide-react';
import { DragDropShiftCalendar } from '../components/phase3/DragDropShiftCalendar';
import { AISuggestionOverlay } from '../components/phase3/AISuggestionOverlay';
import { ShiftSwapApprovalQueue } from '../components/phase3/ShiftSwapApprovalQueue';
import { Badge } from '../components/ui/badge';

export const Phase3ShiftManagementView: React.FC = () => {
  const [subTab, setSubTab] = useState<'calendar' | 'ai' | 'swaps'>('calendar');

  const subTabs = [
    { id: 'calendar', label: '1. Drag-and-Drop Shift Builder', icon: <Calendar className="w-4 h-4" />, desc: 'Week calendar with inline conflict detection' },
    { id: 'ai', label: '2. AI Roster Ghost Overlay', icon: <Sparkles className="w-4 h-4" />, desc: 'Ghost preview layer with cherry-pick optimizer' },
    { id: 'swaps', label: '3. Shift Swap Swipe Queue', icon: <ArrowRightLeft className="w-4 h-4" />, desc: 'Card-based swipe approval queue' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 3 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">SHIFT MANAGEMENT & AI ROSTERING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 3 — Advanced Shift Management Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Interactive drag-and-drop calendar with inline conflict detection, AI ghost overlay optimization, and card-based swipe approvals.
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
        {subTab === 'calendar' && <DragDropShiftCalendar />}
        {subTab === 'ai' && <AISuggestionOverlay />}
        {subTab === 'swaps' && <ShiftSwapApprovalQueue />}
      </div>
    </div>
  );
};
