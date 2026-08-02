import React, { useState } from 'react';
import { Smartphone, Radio, Navigation, FileDiff, Cpu } from 'lucide-react';
import { MobilePunchInWidget } from '../components/phase2/MobilePunchInWidget';
import { LiveAttendanceDashboard } from '../components/phase2/LiveAttendanceDashboard';
import { MapPunchVisualization } from '../components/phase2/MapPunchVisualization';
import { PunchCorrectionDiffUI } from '../components/phase2/PunchCorrectionDiffUI';
import { DeviceHealthWidget } from '../components/phase2/DeviceHealthWidget';
import { Badge } from '../components/ui/badge';

export const Phase2AttendanceView: React.FC = () => {
  const [subTab, setSubTab] = useState<'mobile' | 'dashboard' | 'map' | 'correction' | 'devices'>('dashboard');

  const subTabs = [
    { id: 'dashboard', label: '1. Live Attendance Dashboard', icon: <Radio className="w-4 h-4" />, desc: 'Real-time WebSocket grid with flash row highlights' },
    { id: 'mobile', label: '2. Mobile Punch-In App', icon: <Smartphone className="w-4 h-4" />, desc: 'Single-tap optimistic UI & offline queue' },
    { id: 'map', label: '3. Geofenced Map Inspector', icon: <Navigation className="w-4 h-4" />, desc: 'Mapbox styled vector canvas with custom pins' },
    { id: 'correction', label: '4. Punch Correction Diff', icon: <FileDiff className="w-4 h-4" />, desc: 'Side-by-side before/after & approval trail' },
    { id: 'devices', label: '5. Biometric Device Health', icon: <Cpu className="w-4 h-4" />, desc: 'Live hardware connection & sync buffer matrix' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Phase 2 Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 2 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">ATTENDANCE CAPTURE & TELEMETRY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 2 — Advanced Attendance Capture Engine</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Optimistic single-tap mobile punches, real-time websocket flash grid updates, geofenced vector map pins, side-by-side correction diffs, and biometric device status.
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
        {subTab === 'dashboard' && <LiveAttendanceDashboard />}
        {subTab === 'mobile' && <MobilePunchInWidget />}
        {subTab === 'map' && <MapPunchVisualization />}
        {subTab === 'correction' && <PunchCorrectionDiffUI />}
        {subTab === 'devices' && <DeviceHealthWidget />}
      </div>
    </div>
  );
};
