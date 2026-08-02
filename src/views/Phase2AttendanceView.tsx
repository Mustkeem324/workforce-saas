import React from 'react';
import { Radio, MapPin, Zap, ShieldCheck } from 'lucide-react';
import { MobilePunchInWidget } from '../components/phase2/MobilePunchInWidget';
import { LiveAttendanceDashboard } from '../components/phase2/LiveAttendanceDashboard';
import { MapPunchVisualization } from '../components/phase2/MapPunchVisualization';
import { PunchCorrectionDiffUI } from '../components/phase2/PunchCorrectionDiffUI';
import { DeviceHealthWidget } from '../components/phase2/DeviceHealthWidget';
import { Badge } from '../components/ui/badge';

export const Phase2AttendanceView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Attendance Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">ATTENDANCE ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">REALTIME PUNCH & GEOFENCE MAP</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Attendance Capture & Geofence Map</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Single-tap mobile punch-in, WebSocket live stream grid with flash highlights, geofenced vector map, correction diffs, and hardware terminal health.
          </p>
        </div>
      </div>

      {/* Grid Layout 1: Mobile Punch Terminal & Terminal Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <MobilePunchInWidget />
        <div className="md:col-span-2">
          <DeviceHealthWidget />
        </div>
      </div>

      {/* Grid Layout 2: WebSocket Live Stream Dashboard */}
      <LiveAttendanceDashboard />

      {/* Grid Layout 3: Geofenced Vector Map & Correction Diff Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <MapPunchVisualization />
        <PunchCorrectionDiffUI />
      </div>
    </div>
  );
};
