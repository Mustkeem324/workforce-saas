import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, AlertTriangle, User, Plus, CheckCircle2, ChevronLeft, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface CalendarShift {
  id: string;
  employeeId: string;
  employeeName: string;
  dayIndex: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  shiftType: 'Morning' | 'Day' | 'Evening' | 'Night';
  startTime: string;
  endTime: string;
  hours: number;
  hasConflict?: boolean;
  conflictReason?: string;
}

const INITIAL_CALENDAR_SHIFTS: CalendarShift[] = [
  { id: 'cs-1', employeeId: 'e1', employeeName: 'Alex Rivera', dayIndex: 0, shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
  { id: 'cs-2', employeeId: 'e1', employeeName: 'Alex Rivera', dayIndex: 1, shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
  { id: 'cs-3', employeeId: 'e1', employeeName: 'Alex Rivera', dayIndex: 2, shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
  { id: 'cs-4', employeeId: 'e1', employeeName: 'Alex Rivera', dayIndex: 3, shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
  { id: 'cs-5', employeeId: 'e1', employeeName: 'Alex Rivera', dayIndex: 4, shiftType: 'Morning', startTime: '08:00 AM', endTime: '06:00 PM', hours: 10.0, hasConflict: true, conflictReason: 'OVERTIME BREACH (>40H WEEKLY CAP)' },

  { id: 'cs-6', employeeId: 'e2', employeeName: 'Jordan Chen', dayIndex: 0, shiftType: 'Evening', startTime: '04:00 PM', endTime: '12:00 AM', hours: 8.0 },
  { id: 'cs-7', employeeId: 'e2', employeeName: 'Jordan Chen', dayIndex: 1, shiftType: 'Evening', startTime: '04:00 PM', endTime: '12:00 AM', hours: 8.0 },
  { id: 'cs-8', employeeId: 'e2', employeeName: 'Jordan Chen', dayIndex: 2, shiftType: 'Evening', startTime: '04:00 PM', endTime: '12:00 AM', hours: 8.0 },
  { id: 'cs-9', employeeId: 'e2', employeeName: 'Jordan Chen', dayIndex: 4, shiftType: 'Night', startTime: '12:00 AM', endTime: '08:00 AM', hours: 8.0, hasConflict: true, conflictReason: 'REST PERIOD VIOLATION (<11H BETWEEN SHIFTS)' },

  { id: 'cs-10', employeeId: 'e3', employeeName: 'Morgan Smith', dayIndex: 0, shiftType: 'Day', startTime: '09:00 AM', endTime: '05:00 PM', hours: 8.0 },
  { id: 'cs-11', employeeId: 'e3', employeeName: 'Morgan Smith', dayIndex: 2, shiftType: 'Day', startTime: '09:00 AM', endTime: '05:00 PM', hours: 8.0 },
  { id: 'cs-12', employeeId: 'e3', employeeName: 'Morgan Smith', dayIndex: 3, shiftType: 'Day', startTime: '09:00 AM', endTime: '05:00 PM', hours: 8.0 },

  { id: 'cs-13', employeeId: 'e4', employeeName: 'Taylor Reed', dayIndex: 1, shiftType: 'Morning', startTime: '08:00 AM', endTime: '04:00 PM', hours: 8.0 },
  { id: 'cs-14', employeeId: 'e4', employeeName: 'Taylor Reed', dayIndex: 4, shiftType: 'Evening', startTime: '04:00 PM', endTime: '12:00 AM', hours: 8.0 }
];

const DAYS = ['Mon Aug 3', 'Tue Aug 4', 'Wed Aug 5', 'Thu Aug 6', 'Fri Aug 7', 'Sat Aug 8', 'Sun Aug 9'];
const EMPLOYEES = [
  { id: 'e1', name: 'Alex Rivera', role: 'Senior Tech Lead', weeklyCap: 40, currentHours: 42.0 },
  { id: 'e2', name: 'Jordan Chen', role: 'Shift Operations Lead', weeklyCap: 40, currentHours: 32.0 },
  { id: 'e3', name: 'Morgan Smith', role: 'Dispatch Coordinator', weeklyCap: 40, currentHours: 24.0 },
  { id: 'e4', name: 'Taylor Reed', role: 'Logistics Specialist', weeklyCap: 40, currentHours: 16.0 }
];

export const DragDropShiftCalendar: React.FC = () => {
  const [shifts, setShifts] = useState<CalendarShift[]>(INITIAL_CALENDAR_SHIFTS);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [hoveredConflict, setHoveredConflict] = useState<string | null>(null);

  // Drag handler simulating slot movement
  const handleDragEnd = (shiftId: string, targetDayIdx: number) => {
    setShifts(prev => prev.map(s => {
      if (s.id === shiftId) {
        return { ...s, dayIndex: targetDayIdx };
      }
      return s;
    }));
    setActiveDragId(null);
  };

  const getShiftColor = (type: CalendarShift['shiftType'], isConflict?: boolean) => {
    if (isConflict) return 'bg-rose-500/20 border-rose-500/60 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]';
    switch (type) {
      case 'Morning': return 'bg-amber-500/15 border-amber-500/40 text-amber-500';
      case 'Day': return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-500';
      case 'Evening': return 'bg-indigo-500/15 border-indigo-500/40 text-indigo-500';
      case 'Night': return 'bg-purple-500/15 border-purple-500/40 text-purple-500';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Calendar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Drag-and-Drop Shift Builder</h2>
            <Badge variant="accent">INLINE CONFLICT DETECTION</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Drag shift blocks across days. Labor law conflicts & overtime breaches highlight inline during drag.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[var(--bg-canvas)] p-1 rounded-xl border border-[var(--border-subtle)] text-xs">
            <button className="px-2.5 py-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[var(--text-primary)] px-2">Week of Aug 3 - Aug 9</span>
            <button className="px-2.5 py-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create Shift Template
          </Button>
        </div>
      </div>

      {/* Main Shift Calendar Grid */}
      <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-2xl overflow-x-auto shadow-[var(--shadow-2)]">
        <table className="w-full text-left text-xs border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              <th className="py-3 px-4 w-48 sticky left-0 bg-[var(--bg-element-hover)] z-20">Employee Roster</th>
              {DAYS.map((day, idx) => (
                <th key={idx} className="py-3 px-3 text-center border-l border-[var(--border-subtle)]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {EMPLOYEES.map(emp => {
              const empShifts = shifts.filter(s => s.employeeId === emp.id);

              return (
                <tr key={emp.id} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                  {/* Sticky Employee Details Column */}
                  <td className="py-4 px-4 sticky left-0 bg-[var(--bg-surface-raised)] z-10 border-r border-[var(--border-subtle)]">
                    <div className="font-bold text-[var(--text-primary)]">{emp.name}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{emp.role}</div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[var(--text-tertiary)]">Week Total:</span>
                      <span className={`font-bold ${emp.currentHours > 40 ? 'text-rose-400 font-extrabold' : 'text-[var(--text-primary)]'}`}>
                        {emp.currentHours.toFixed(1)}h / 40h
                      </span>
                    </div>
                  </td>

                  {/* 7 Day Slot Columns */}
                  {DAYS.map((_, dayIdx) => {
                    const dayShifts = empShifts.filter(s => s.dayIndex === dayIdx);

                    return (
                      <td 
                        key={dayIdx} 
                        className="py-3 px-2 border-l border-[var(--border-subtle)] align-top relative min-h-[90px]"
                      >
                        {dayShifts.map(s => (
                          <motion.div
                            key={s.id}
                            drag
                            dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                            whileDrag={{ scale: 1.05, zIndex: 30, boxShadow: 'var(--shadow-4)' }}
                            whileHover={{ y: -1 }}
                            onMouseEnter={() => s.hasConflict && setHoveredConflict(s.id)}
                            onMouseLeave={() => setHoveredConflict(null)}
                            className={`
                              p-2.5 rounded-xl border text-xs cursor-grab active:cursor-grabbing relative mb-2 select-none transition-all
                              ${getShiftColor(s.shiftType, s.hasConflict)}
                            `}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>{s.shiftType}</span>
                              <span className="font-mono tabular-nums text-[10px]">{s.hours}h</span>
                            </div>

                            <div className="text-[10px] font-mono mt-1 opacity-90">
                              {s.startTime} - {s.endTime}
                            </div>

                            {/* INLINE CONFLICT WARNING BADGE */}
                            {s.hasConflict && (
                              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950/40 p-1 rounded border border-rose-500/40">
                                <AlertTriangle className="w-3 h-3 shrink-0 animate-pulse" />
                                <span>INLINE CONFLICT</span>
                              </div>
                            )}

                            {/* HOVER CONFLICT TOOLTIP OVERLAY */}
                            <AnimatePresence>
                              {hoveredConflict === s.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute bottom-full left-0 mb-2 w-56 p-2.5 rounded-xl bg-rose-950 text-rose-100 border border-rose-500 text-[11px] z-40 shadow-xl pointer-events-none"
                                >
                                  <div className="font-extrabold flex items-center gap-1 text-rose-400">
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                    LABOR LAW BREACH
                                  </div>
                                  <p className="mt-1 text-[10px] leading-tight">{s.conflictReason}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}

                        {dayShifts.length === 0 && (
                          <div className="h-16 rounded-xl border border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-500)]/50 transition-colors flex items-center justify-center text-[10px] text-[var(--text-tertiary)] opacity-60 hover:opacity-100 cursor-pointer">
                            + Drop Slot
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
