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
    <div className="space-y-8 w-full max-w-none min-w-0 overflow-visible">
      {/* Attendance Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="accent">ATTENDANCE ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">REALTIME PUNCH & GEOFENCE MAP</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mt-1 tracking-tight">
            Attendance Capture & Geofence Map
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Single-tap mobile punch-in, WebSocket live stream grid with flash highlights, geofenced vector map, correction diffs, and hardware terminal health.
          </p>
        </div>
      </div>

      {/* Grid Layout 1: Mobile Punch Terminal & Terminal Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start min-w-0">
        <MobilePunchInWidget />
        <div className="md:col-span-2 min-w-0">
          <DeviceHealthWidget />
        </div>
      </div>

      {/* Grid Layout 2: WebSocket Live Stream Dashboard */}
      <div className="min-w-0">
        <LiveAttendanceDashboard />
      </div>

      {/* Grid Layout 3: Geofenced Vector Map & Correction Diff Inspector
          Responsive behavior:
          - >= 1440px (2xl): 2-column layout (approx 48% / 52% split) with minmax(0, 0.95fr) minmax(0, 1.05fr)
          - 1024px to 1439px (lg): Vertical stack so both heavy components get full width
          - < 768px: Single column layout with full width cards
      */}
      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 lg:gap-8 items-start w-full min-w-0">
        <div className="w-full min-w-0">
          <MapPunchVisualization />
        </div>
        <div className="w-full min-w-0">
          <PunchCorrectionDiffUI />
        </div>
      </div>
    </div>
  );
};

export default Phase2AttendanceView;
