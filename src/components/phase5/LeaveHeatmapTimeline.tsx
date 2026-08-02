import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Users, AlertTriangle, CheckCircle2, XCircle, Filter, Plus, Info } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface LeaveBlock {
  id: string;
  employeeName: string;
  avatar: string;
  role: string;
  leaveType: 'Annual Leave' | 'Sick Leave' | 'Parental' | 'Unpaid';
  startDayIdx: number; // 0..13 (2-week heatmap)
  endDayIdx: number;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const HEATMAP_DAYS = [
  'Mon Aug 3', 'Tue Aug 4', 'Wed Aug 5', 'Thu Aug 6', 'Fri Aug 7', 'Sat Aug 8', 'Sun Aug 9',
  'Mon Aug 10', 'Tue Aug 11', 'Wed Aug 12', 'Thu Aug 13', 'Fri Aug 14', 'Sat Aug 15', 'Sun Aug 16'
];

const INITIAL_LEAVE_BLOCKS: LeaveBlock[] = [
  { id: 'lb-1', employeeName: 'Alex Rivera', avatar: 'AR', role: 'Senior Tech Lead', leaveType: 'Annual Leave', startDayIdx: 4, endDayIdx: 8, status: 'Approved' },
  { id: 'lb-2', employeeName: 'Jordan Chen', avatar: 'JC', role: 'Shift Operations Lead', leaveType: 'Sick Leave', startDayIdx: 2, endDayIdx: 3, status: 'Approved' },
  { id: 'lb-3', employeeName: 'Taylor Reed', avatar: 'TR', role: 'Logistics Specialist', leaveType: 'Annual Leave', startDayIdx: 4, endDayIdx: 7, status: 'Pending' },
  { id: 'lb-4', employeeName: 'Morgan Smith', avatar: 'MS', role: 'Dispatch Coordinator', leaveType: 'Parental', startDayIdx: 9, endDayIdx: 13, status: 'Approved' }
];

export const LeaveHeatmapTimeline: React.FC = () => {
  const [blocks, setBlocks] = useState<LeaveBlock[]>(INITIAL_LEAVE_BLOCKS);
  const [selectedBlock, setSelectedBlock] = useState<LeaveBlock | null>(null);

  const handleAction = (id: string, status: 'Approved' | 'Rejected') => {
    setBlocks(prev => prev.map(b => {
      if (b.id === id) return { ...b, status };
      return b;
    }));
    setSelectedBlock(null);
  };

  // Calculate team out density per day to display heatmap overlap warnings
  const getDensityForDay = (dayIdx: number) => {
    return blocks.filter(b => dayIdx >= b.startDayIdx && dayIdx <= b.endDayIdx && b.status !== 'Rejected').length;
  };

  const getLeaveTypeColor = (type: LeaveBlock['leaveType']) => {
    switch (type) {
      case 'Annual Leave': return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
      case 'Sick Leave': return 'bg-rose-500/20 border-rose-500/50 text-rose-400';
      case 'Parental': return 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400';
      case 'Unpaid': return 'bg-slate-500/20 border-slate-500/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Team Leave Heatmap & Coverage Timeline</h2>
            <Badge variant="accent">CONTEXTUAL APPROVALS</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Visual 14-day heatmap showing who's out when with automatic team coverage density alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="neutral">14-Day View (Aug 3 - Aug 16)</Badge>
        </div>
      </div>

      {/* Coverage Density Indicator Bar */}
      <Card elevation={1} className="space-y-2 p-4">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[var(--accent-500)]" />
            Team Out Density Heatmap
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)] font-mono">HIGHER DENSITY = COVERAGE RISK</span>
        </div>

        <div className="grid grid-cols-14 gap-1 pt-1">
          {HEATMAP_DAYS.map((_, idx) => {
            const count = getDensityForDay(idx);
            let densityBg = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
            if (count === 2) densityBg = 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold';
            else if (count >= 3) densityBg = 'bg-rose-500/30 border-rose-500/60 text-rose-400 font-extrabold shadow-[0_0_10px_rgba(244,63,94,0.3)]';

            return (
              <div 
                key={idx} 
                className={`h-8 rounded-lg border text-center flex flex-col items-center justify-center text-[10px] font-mono ${densityBg}`}
              >
                <span>{count > 0 ? `${count} Out` : 'OK'}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Heatmap Timeline Grid */}
      <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-2xl overflow-x-auto shadow-[var(--shadow-2)]">
        <table className="w-full text-left text-xs border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              <th className="py-3 px-4 w-48 sticky left-0 bg-[var(--bg-element-hover)] z-20">Employee</th>
              {HEATMAP_DAYS.map((day, idx) => (
                <th key={idx} className="py-3 px-1 text-center border-l border-[var(--border-subtle)] w-16">
                  {day.split(' ')[0]} {day.split(' ')[2]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {blocks.map(block => (
              <tr key={block.id} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                <td className="py-3.5 px-4 sticky left-0 bg-[var(--bg-surface-raised)] z-10 border-r border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--accent-500)] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {block.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)] leading-tight">{block.employeeName}</div>
                      <div className="text-[10px] text-[var(--text-tertiary)]">{block.role}</div>
                    </div>
                  </div>
                </td>

                <td colSpan={14} className="p-2 relative align-middle">
                  <div className="grid grid-cols-14 gap-1 h-10 items-center">
                    {HEATMAP_DAYS.map((_, dayIdx) => {
                      const isWithinBlock = dayIdx >= block.startDayIdx && dayIdx <= block.endDayIdx;
                      const isStart = dayIdx === block.startDayIdx;

                      if (!isWithinBlock) return <div key={dayIdx} className="h-full" />;

                      return (
                        <motion.div
                          key={dayIdx}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedBlock(block)}
                          className={`
                            h-8 cursor-pointer flex items-center justify-center text-[10px] font-bold border transition-all rounded-md select-none
                            ${getLeaveTypeColor(block.leaveType)}
                            ${isStart ? 'rounded-l-xl pl-2' : ''}
                            ${dayIdx === block.endDayIdx ? 'rounded-r-xl pr-2' : ''}
                          `}
                        >
                          {isStart && <span>{block.leaveType}</span>}
                        </motion.div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contextual Approval Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl p-6 max-w-md w-full shadow-[var(--shadow-3)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-500)] text-white font-bold text-sm flex items-center justify-center">
                    {selectedBlock.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">{selectedBlock.employeeName}</h3>
                    <p className="text-xs text-[var(--text-tertiary)]">{selectedBlock.role}</p>
                  </div>
                </div>
                <Badge variant={selectedBlock.status === 'Approved' ? 'success' : selectedBlock.status === 'Rejected' ? 'danger' : 'warning'}>
                  {selectedBlock.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs font-mono bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-subtle)]">
                <div className="flex justify-between">
                  <span className="text-[var(--text-tertiary)] font-sans">Leave Category:</span>
                  <span className="font-bold text-[var(--accent-500)]">{selectedBlock.leaveType}</span>
                </div>
                <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                  <span className="text-[var(--text-tertiary)] font-sans">Duration:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {HEATMAP_DAYS[selectedBlock.startDayIdx]} – {HEATMAP_DAYS[selectedBlock.endDayIdx]}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedBlock(null)}>
                  Close
                </Button>
                {selectedBlock.status === 'Pending' && (
                  <>
                    <Button variant="destructive" size="sm" onClick={() => handleAction(selectedBlock.id, 'Rejected')}>
                      Reject
                    </Button>
                    <Button variant="accent" size="sm" onClick={() => handleAction(selectedBlock.id, 'Approved')}>
                      Approve Request
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
