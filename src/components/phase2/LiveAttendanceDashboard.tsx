import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Search, 
  MapPin, 
  Clock, 
  Smartphone, 
  ShieldAlert, 
  CheckCircle2, 
  Coffee, 
  LogOut,
  Play,
  RefreshCw,
  Zap,
  Filter
} from 'lucide-react';
import { INITIAL_ATTENDANCE_RECORDS } from '../../services/attendanceStream';
import type { AttendanceRecord, AttendanceEvent } from '../../services/attendanceStream';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const LiveAttendanceDashboard: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentEvents, setRecentEvents] = useState<AttendanceEvent[]>([]);
  const [flashRecordId, setFlashRecordId] = useState<string | null>(null);
  const [flashEventType, setFlashEventType] = useState<'Clock In' | 'Break Start' | 'Clock Out' | null>(null);

  // Simulated WebSocket Live Stream
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * records.length);
      const targetRecord = records[randomIdx];

      let newStatus: AttendanceRecord['status'] = 'In-Facility';
      let newType: AttendanceEvent['type'] = 'Clock In';

      if (targetRecord.status === 'In-Facility') {
        newStatus = 'On-Break';
        newType = 'Break Start';
      } else if (targetRecord.status === 'On-Break') {
        newStatus = 'In-Facility';
        newType = 'Break End';
      } else {
        newStatus = 'In-Facility';
        newType = 'Clock In';
      }

      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setRecords(prev => prev.map(r => {
        if (r.id === targetRecord.id) {
          return {
            ...r,
            status: newStatus,
            lastPunchTime: timestamp,
            lastPunchType: newType as any,
            lastStateChangeTimestamp: Date.now()
          };
        }
        return r;
      }));

      setFlashRecordId(targetRecord.id);
      setFlashEventType(newType === 'Clock In' ? 'Clock In' : newType === 'Break Start' ? 'Break Start' : 'Clock Out');

      const event: AttendanceEvent = {
        id: `evt-${Date.now()}`,
        recordId: targetRecord.id,
        employeeName: targetRecord.employeeName,
        type: newType,
        time: timestamp,
        location: targetRecord.location
      };
      setRecentEvents(prev => [event, ...prev.slice(0, 5)]);

      setTimeout(() => {
        setFlashRecordId(null);
        setFlashEventType(null);
      }, 1800);

    }, 4500);

    return () => clearInterval(interval);
  }, [records]);

  const filteredRecords = records.filter(r => {
    const matchesLoc = selectedLocation === 'All' || r.location === selectedLocation;
    const matchesQuery = r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || r.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesQuery;
  });

  const totalActive = records.filter(r => r.status === 'In-Facility').length;
  const totalOnBreak = records.filter(r => r.status === 'On-Break').length;
  const totalOut = records.filter(r => r.status === 'Clocked-Out').length;
  const totalAlerts = records.filter(r => r.status === 'Geofence-Alert').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Real-time Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-4 md:p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[var(--accent-500)] animate-pulse shrink-0" />
            <h2 className="text-base md:text-lg font-extrabold text-[var(--text-primary)]">Live Attendance Stream Engine</h2>
            <Badge variant="accent" dot>WEBSOCKET CONNECTED</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Real-time grid push channel. Rows flash-highlight dynamically on punch events.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search roster..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1 md:w-48"
          />

          <div className="flex items-center gap-1 bg-[var(--bg-canvas)] p-1 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold overflow-x-auto scrollbar-none">
            {['All', 'Mumbai Hub', 'Delhi Facility'].map(loc => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  selectedLocation === loc 
                    ? 'bg-[var(--accent-500)] text-white shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card elevation={1} className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-tertiary)] font-medium">IN-FACILITY</span>
            <div className="text-xl md:text-2xl font-black font-mono tabular-nums text-[var(--text-primary)]">{totalActive}</div>
          </div>
        </Card>

        <Card elevation={1} className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-tertiary)] font-medium">ON BREAK</span>
            <div className="text-xl md:text-2xl font-black font-mono tabular-nums text-[var(--text-primary)]">{totalOnBreak}</div>
          </div>
        </Card>

        <Card elevation={1} className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--bg-element-hover)] text-[var(--text-tertiary)] shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-tertiary)] font-medium">CLOCKED OUT</span>
            <div className="text-xl md:text-2xl font-black font-mono tabular-nums text-[var(--text-primary)]">{totalOut}</div>
          </div>
        </Card>

        <Card elevation={1} className="p-4 flex items-center gap-3 border-l-4 border-l-[var(--danger-solid)]">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-red-400 font-medium">GEOFENCE ALERTS</span>
            <div className="text-xl md:text-2xl font-black font-mono tabular-nums text-red-500">{totalAlerts}</div>
          </div>
        </Card>
      </div>

      {/* Real-time Grid & Event Stream Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Attendance Table (Scrollable Container) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-2xl overflow-x-auto shadow-[var(--shadow-2)]">
            <table className="w-full text-left text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-right">Last Punch</th>
                  <th className="py-3 px-4 text-center">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredRecords.map(record => {
                  const isFlashed = flashRecordId === record.id;
                  let flashBg = '';
                  if (isFlashed) {
                    if (flashEventType === 'Clock In') flashBg = 'bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300';
                    else if (flashEventType === 'Break Start') flashBg = 'bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300';
                    else flashBg = 'bg-rose-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300';
                  }

                  return (
                    <tr 
                      key={record.id} 
                      className={`hover:bg-[var(--bg-element-hover)]/80 transition-colors ${flashBg}`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--ink-800)]/15 border border-[var(--ink-700)] text-[var(--accent-500)] flex items-center justify-center font-bold text-xs shrink-0">
                            {record.avatarInitials}
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text-primary)]">{record.employeeName}</div>
                            <div className="text-xs text-[var(--text-tertiary)]">{record.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge 
                          variant={
                            record.status === 'In-Facility' ? 'success' :
                            record.status === 'On-Break' ? 'warning' :
                            record.status === 'Geofence-Alert' ? 'danger' : 'neutral'
                          }
                        >
                          {record.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent-500)] shrink-0" />
                          {record.location}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[var(--text-primary)]">
                        {record.lastPunchTime}
                        <div className="text-[10px] text-[var(--text-tertiary)] font-sans">{record.lastPunchType}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-canvas)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                          <Smartphone className="w-3 h-3 text-[var(--accent-500)] shrink-0" />
                          {record.deviceType}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Live Event Stream Feed */}
        <Card elevation={1} className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--accent-500)] shrink-0" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Live WebSocket Activity Feed</h3>
            </div>
            <Badge variant="accent">LIVE</Badge>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {recentEvents.map(evt => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: -15, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex items-start justify-between text-xs gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[var(--text-primary)]">{evt.employeeName}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">{evt.type} • {evt.location}</div>
                  </div>
                  <span className="font-mono tabular-nums text-[10px] font-bold text-[var(--accent-500)] bg-[var(--bg-element-hover)] px-2 py-0.5 rounded shrink-0">
                    {evt.time}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
};
