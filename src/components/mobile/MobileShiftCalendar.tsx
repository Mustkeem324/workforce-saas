import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, AlertTriangle, Check, User, Clock, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MobileShiftSlot {
  id: string;
  employeeName: string;
  role: string;
  shiftType: 'Morning' | 'Day' | 'Evening' | 'Night';
  startTime: string;
  endTime: string;
  hours: number;
  hasConflict?: boolean;
  conflictReason?: string;
}

const DAYS = [
  { short: 'Mon', full: 'Monday, Aug 3' },
  { short: 'Tue', full: 'Tuesday, Aug 4' },
  { short: 'Wed', full: 'Wednesday, Aug 5' },
  { short: 'Thu', full: 'Thursday, Aug 6' },
  { short: 'Fri', full: 'Friday, Aug 7' },
  { short: 'Sat', full: 'Saturday, Aug 8' },
  { short: 'Sun', full: 'Sunday, Aug 9' }
];

const SAMPLE_MOBILE_SHIFTS: Record<number, MobileShiftSlot[]> = {
  0: [
    { id: 'ms-1', employeeName: 'Alex Rivera', role: 'Senior Tech Lead', shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
    { id: 'ms-2', employeeName: 'Jordan Chen', role: 'Shift Operations Lead', shiftType: 'Evening', startTime: '04:00 PM', endTime: '12:00 AM', hours: 8.0 },
    { id: 'ms-3', employeeName: 'Morgan Smith', role: 'Dispatch Coordinator', shiftType: 'Day', startTime: '09:00 AM', endTime: '05:00 PM', hours: 8.0 }
  ],
  4: [
    { id: 'ms-4', employeeName: 'Alex Rivera', role: 'Senior Tech Lead', shiftType: 'Morning', startTime: '08:00 AM', endTime: '06:00 PM', hours: 10.0, hasConflict: true, conflictReason: 'OVERTIME BREACH (>40H WEEKLY CAP)' },
    { id: 'ms-5', employeeName: 'Jordan Chen', role: 'Shift Operations Lead', shiftType: 'Night', startTime: '12:00 AM', endTime: '08:00 AM', hours: 8.0, hasConflict: true, conflictReason: 'REST PERIOD VIOLATION (<11H BETWEEN SHIFTS)' }
  ]
};

export const MobileShiftCalendar: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [dayShifts, setDayShifts] = useState<Record<number, MobileShiftSlot[]>>(SAMPLE_MOBILE_SHIFTS);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const activeShifts = dayShifts[selectedDayIdx] || [];

  const handleTapAssign = (employeeName: string, shiftType: 'Morning' | 'Day' | 'Evening' | 'Night') => {
    const newShift: MobileShiftSlot = {
      id: `ms-${Date.now()}`,
      employeeName,
      role: 'Team Specialist',
      shiftType,
      startTime: '08:00 AM',
      endTime: '04:00 PM',
      hours: 8.0
    };

    setDayShifts(prev => ({
      ...prev,
      [selectedDayIdx]: [...(prev[selectedDayIdx] || []), newShift]
    }));
    setIsAssignModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Day Selector Pill Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
        {DAYS.map((d, idx) => {
          const isSelected = selectedDayIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIdx(idx)}
              className={`
                px-4 py-2.5 rounded-xl font-bold border transition-all shrink-0 min-touch text-center
                ${isSelected 
                  ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-xs' 
                  : 'bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] text-[var(--text-secondary)]'}
              `}
            >
              <div className="text-[10px] opacity-80">{d.short}</div>
              <div className="text-sm font-black">{idx + 3}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Banner */}
      <div className="flex items-center justify-between bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] p-3.5 rounded-2xl">
        <div>
          <span className="text-[10px] font-mono text-[var(--accent-500)] font-bold uppercase">DAY SCHEDULE</span>
          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{DAYS[selectedDayIdx].full}</h3>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setIsAssignModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="min-touch"
        >
          Tap Assign
        </Button>
      </div>

      {/* Roster List for Selected Day */}
      <div className="space-y-3">
        {activeShifts.length > 0 ? (
          activeShifts.map(s => (
            <Card key={s.id} elevation={1} className="p-4 space-y-2 border-l-4 border-l-[var(--accent-500)]">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--text-primary)]">{s.employeeName}</h4>
                  <span className="text-[11px] text-[var(--text-tertiary)]">{s.role}</span>
                </div>
                <Badge variant={s.hasConflict ? 'danger' : 'neutral'}>{s.shiftType}</Badge>
              </div>

              <div className="flex items-center justify-between text-xs font-mono tabular-nums pt-1 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">{s.startTime} - {s.endTime}</span>
                <span className="font-bold text-[var(--text-primary)]">{s.hours} hours</span>
              </div>

              {/* Inline Mobile Conflict Card */}
              {s.hasConflict && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs space-y-1 mt-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Labor Law Violation</span>
                  </div>
                  <p className="text-[11px] text-rose-300/80 leading-tight">{s.conflictReason}</p>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card elevation={1} className="p-8 text-center text-xs text-[var(--text-tertiary)] space-y-2">
            <div>No shifts scheduled for this day.</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAssignModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Assign First Shift
            </Button>
          </Card>
        )}
      </div>

      {/* Tap-to-Assign Bottom Sheet Modal */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full bg-[var(--bg-surface-overlay)] border-t border-[var(--border-default)] rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto pb-safe"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">Tap to Assign Shift Slot</h3>
                <button onClick={() => setIsAssignModalOpen(false)} className="text-[var(--text-tertiary)] p-2">✕</button>
              </div>

              <div className="space-y-3">
                {['Alex Rivera', 'Jordan Chen', 'Morgan Smith', 'Taylor Reed'].map(name => (
                  <div
                    key={name}
                    onClick={() => handleTapAssign(name, 'Morning')}
                    className="p-3.5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--accent-500)] cursor-pointer flex items-center justify-between min-touch"
                  >
                    <div>
                      <div className="font-bold text-sm text-[var(--text-primary)]">{name}</div>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono">08:00 AM - 04:00 PM (Morning Shift)</div>
                    </div>
                    <Button variant="accent" size="sm">Assign</Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
