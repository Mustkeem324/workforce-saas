import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, AlertCircle, Coffee } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface Shift {
  id: string;
  employeeName: string;
  role: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  breakMins: number;
  location: string;
  isOvertime?: boolean;
  status: 'Scheduled' | 'In-Progress' | 'Completed' | 'Open';
}

export interface ShiftCardProps {
  shift: Shift;
  onSelect?: (shift: Shift) => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onSelect }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.15}
      whileDrag={{ scale: 1.03, boxShadow: 'var(--shadow-4)', zIndex: 30 }}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-2)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={() => onSelect?.(shift)}
      className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-xl p-4 cursor-grab active:cursor-grabbing relative overflow-hidden transition-colors"
    >
      {/* Accent Top Border Indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${shift.isOvertime ? 'bg-[var(--warning-solid)]' : 'bg-[var(--accent-500)]'}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--ink-800)]/10 dark:bg-[var(--ink-100)]/10 text-[var(--text-primary)] flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4 text-[var(--accent-500)]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] leading-tight">{shift.employeeName}</h4>
            <p className="text-xs text-[var(--text-tertiary)]">{shift.role} • {shift.location}</p>
          </div>
        </div>

        <Badge variant={shift.status === 'In-Progress' ? 'accent' : shift.status === 'Open' ? 'warning' : 'neutral'}>
          {shift.status}
        </Badge>
      </div>

      <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5 font-mono tabular-nums font-medium">
          <Clock className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
          <span>{shift.startTime} - {shift.endTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
            <Coffee className="w-3 h-3" />
            {shift.breakMins}m
          </span>
          <span className="font-mono tabular-nums font-bold text-[var(--text-primary)] bg-[var(--bg-element-hover)] px-2 py-0.5 rounded">
            {shift.durationHours.toFixed(1)}h
          </span>
        </div>
      </div>

      {shift.isOvertime && (
        <div className="mt-2 text-[10px] font-semibold text-[var(--warning-text)] bg-[var(--warning-bg)] px-2 py-1 rounded flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>OVERTIME RISK DETECTED (+1.5h ABOVE WEEKLY MAX)</span>
        </div>
      )}
    </motion.div>
  );
};
