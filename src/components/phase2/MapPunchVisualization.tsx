import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Crosshair, ZoomIn, ZoomOut, ShieldCheck, ShieldAlert, Smartphone } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MapPinPoint {
  id: string;
  employeeName: string;
  avatar: string;
  role: string;
  time: string;
  xPct: number;
  yPct: number;
  accuracyRadiusMeters: number;
  isGeofenced: boolean;
  coords: string;
  device: string;
}

const MAP_POINTS: MapPinPoint[] = [
  {
    id: 'p1',
    employeeName: 'Alex Rivera',
    avatar: 'AR',
    role: 'Senior Tech Lead',
    time: '08:00 AM',
    xPct: 48,
    yPct: 42,
    accuracyRadiusMeters: 3.2,
    isGeofenced: true,
    coords: '19.0760° N, 72.8777° E',
    device: 'Mobile GPS (iPhone 15 Pro)'
  },
  {
    id: 'p2',
    employeeName: 'Jordan Chen',
    avatar: 'JC',
    role: 'Shift Operations Lead',
    time: '07:30 AM',
    xPct: 52,
    yPct: 46,
    accuracyRadiusMeters: 1.5,
    isGeofenced: true,
    coords: '19.0765° N, 72.8782° E',
    device: 'Biometric Facial Scanner #02'
  },
  {
    id: 'p3',
    employeeName: 'Morgan Smith',
    avatar: 'MS',
    role: 'Dispatch Coordinator',
    time: '08:30 AM',
    xPct: 45,
    yPct: 55,
    accuracyRadiusMeters: 4.8,
    isGeofenced: true,
    coords: '19.0755° N, 72.8765° E',
    device: 'Mobile GPS (Galaxy S24)'
  },
  {
    id: 'p4',
    employeeName: 'Taylor Reed',
    avatar: 'TR',
    role: 'Logistics Specialist',
    time: '09:12 AM',
    xPct: 78,
    yPct: 22,
    accuracyRadiusMeters: 28.5,
    isGeofenced: false,
    coords: '19.0900° N, 72.8900° E',
    device: 'Mobile GPS (Unverified)'
  }
];

export const MapPunchVisualization: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MapPinPoint | null>(MAP_POINTS[0]);
  const [showGeofenceBoundary, setShowGeofenceBoundary] = useState(true);

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Top Controls Banner */}
      <div className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-4 md:p-5 rounded-2xl shadow-[var(--shadow-1)] space-y-3 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0 max-w-full">
            <Navigation className="w-5 h-5 text-[var(--accent-500)] shrink-0" />
            <h2 
              className="font-extrabold text-[var(--text-primary)] tracking-tight leading-snug whitespace-normal break-normal text-base md:text-lg"
              style={{ wordBreak: 'normal', overflowWrap: 'normal' }}
            >
              Map-Based Geofence Punch Inspector
            </h2>
          </div>
          <Badge variant="accent" className="shrink-0 whitespace-nowrap">VECTOR GEOFENCE</Badge>
        </div>

        <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
          Plotted GPS punches with accuracy radius circles and custom avatar pins.
        </p>

        <div className="pt-1 flex items-center">
          <Button
            variant={showGeofenceBoundary ? 'accent' : 'outline'}
            size="sm"
            onClick={() => setShowGeofenceBoundary(!showGeofenceBoundary)}
            leftIcon={<Crosshair className="w-4 h-4" />}
            aria-pressed={showGeofenceBoundary}
            className="min-touch text-xs font-semibold"
          >
            {showGeofenceBoundary ? 'Geofence Perimeter: ON' : 'Geofence Perimeter: OFF'}
          </Button>
        </div>
      </div>

      {/* Map Viewport & Inspector Sub-Grid
          Layout:
          - XL screens (>=1280px): Side-by-side grid with map minmax(0,1fr) and inspector minmax(280px, 320px)
          - Below XL screens: Single column vertical stack
      */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] gap-6 items-start min-w-0">
        {/* Main Vector SVG Map Canvas Container */}
        <div className="w-full min-w-0 relative bg-[var(--ink-950)] border-2 border-[var(--border-default)] rounded-3xl h-[380px] sm:h-[460px] md:h-[500px] aspect-4/3 overflow-hidden shadow-[var(--shadow-3)] select-none">
          {/* Map Grid Pattern / Topography Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(224, 90, 71, 0.4) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Vector Roads & Geofence Boundary Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {showGeofenceBoundary && (
              <g>
                <circle 
                  cx="50%" 
                  cy="48%" 
                  r="130" 
                  fill="rgba(224, 90, 71, 0.06)" 
                  stroke="var(--accent-500)" 
                  strokeWidth="2" 
                  strokeDasharray="6 6"
                />
                <text x="50%" y="16%" textAnchor="middle" fill="var(--accent-400)" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.08em">
                  MUMBAI FACILITY GEOFENCE PERIMETER (150M RADIUS)
                </text>
              </g>
            )}

            <path d="M0 260 Q 300 240, 800 270" stroke="#1E293B" strokeWidth="12" fill="none" />
            <path d="M400 0 Q 420 300, 440 600" stroke="#1E293B" strokeWidth="10" fill="none" />
          </svg>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button 
              aria-label="Zoom in map"
              className="p-2.5 rounded-xl bg-[var(--ink-900)] text-white border border-[var(--ink-700)] shadow-md hover:bg-[var(--ink-800)] min-touch flex items-center justify-center"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              aria-label="Zoom out map"
              className="p-2.5 rounded-xl bg-[var(--ink-900)] text-white border border-[var(--ink-700)] shadow-md hover:bg-[var(--ink-800)] min-touch flex items-center justify-center"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Map Pins */}
          {MAP_POINTS.map((pt) => {
            const isSelected = selectedPin?.id === pt.id;
            return (
              <div
                key={pt.id}
                style={{ left: `${pt.xPct}%`, top: `${pt.yPct}%` }}
                onClick={() => setSelectedPin(pt)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group min-touch"
                role="button"
                tabIndex={0}
                aria-label={`Select ${pt.employeeName} punch pin`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPin(pt)}
              >
                {/* Accuracy Radius Circle */}
                <div 
                  className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all ${
                    pt.isGeofenced 
                      ? 'bg-emerald-500/15 border border-emerald-400/40' 
                      : 'bg-rose-500/20 border border-rose-500/60 animate-ping'
                  }`}
                  style={{ 
                    width: `${Math.max(36, pt.accuracyRadiusMeters * 4)}px`, 
                    height: `${Math.max(36, pt.accuracyRadiusMeters * 4)}px`,
                    top: '50%',
                    left: '50%'
                  }}
                />

                {/* Custom Avatar Pin Marker */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  animate={{ scale: isSelected ? 1.15 : 1 }}
                  className={`
                    relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xl border-2 transition-all
                    ${pt.isGeofenced 
                      ? (isSelected ? 'bg-[var(--accent-500)] border-white shadow-[var(--shadow-accent-glow)]' : 'bg-[var(--ink-900)] border-[var(--accent-500)]')
                      : 'bg-rose-600 border-white shadow-rose-900/50'}
                  `}
                >
                  <span>{pt.avatar}</span>
                  <span 
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--ink-950)] ${
                      pt.isGeofenced ? 'bg-emerald-400' : 'bg-rose-500'
                    }`} 
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Selected Pin Inspector Panel */}
        <Card elevation={2} className="p-5 space-y-4 w-full min-w-0 shrink-0">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 gap-2 flex-wrap">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight">Punch Location Inspector</h3>
            <Badge variant="neutral" className="shrink-0">MANAGER AUDIT</Badge>
          </div>

          <AnimatePresence mode="wait">
            {selectedPin ? (
              <motion.div
                key={selectedPin.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4 min-w-0"
              >
                {/* Employee Info Header */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--accent-500)] text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                    {selectedPin.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-extrabold text-[var(--text-primary)] truncate">{selectedPin.employeeName}</h4>
                    <p className="text-xs text-[var(--text-tertiary)] truncate">{selectedPin.role}</p>
                  </div>
                </div>

                {/* Telemetry Data Grid Rows */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3 text-xs min-w-0">
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                    <span className="text-[var(--text-tertiary)] font-medium">Compliance:</span>
                    <Badge variant={selectedPin.isGeofenced ? 'success' : 'danger'} className="shrink-0">
                      {selectedPin.isGeofenced ? 'VERIFIED INSIDE' : 'GEOFENCE BREACH'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[minmax(110px,1.2fr)_minmax(100px,auto)] gap-2 items-center border-b border-[var(--border-subtle)] pb-2.5">
                    <span className="text-[var(--text-tertiary)] font-medium">Timestamp:</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] text-right whitespace-nowrap tabular-nums">
                      {selectedPin.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-[minmax(100px,1fr)_minmax(130px,auto)] gap-2 items-center border-b border-[var(--border-subtle)] pb-2.5">
                    <span className="text-[var(--text-tertiary)] font-medium">Coordinates:</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] text-right whitespace-nowrap tabular-nums">
                      {selectedPin.coords}
                    </span>
                  </div>

                  <div className="grid grid-cols-[minmax(110px,1.2fr)_minmax(100px,auto)] gap-2 items-center border-b border-[var(--border-subtle)] pb-2.5">
                    <span className="text-[var(--text-tertiary)] font-medium">GPS Accuracy:</span>
                    <span className="font-mono font-extrabold text-[var(--accent-500)] text-right whitespace-nowrap tabular-nums">
                      ±{selectedPin.accuracyRadiusMeters}m
                    </span>
                  </div>

                  <div className="grid grid-cols-[minmax(100px,1fr)_minmax(120px,auto)] gap-2 items-center pt-0.5">
                    <span className="text-[var(--text-tertiary)] font-medium">Device Terminal:</span>
                    <span className="font-semibold text-[var(--text-primary)] text-right text-[11px] truncate">
                      {selectedPin.device}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-xs text-[var(--text-tertiary)] text-center py-10">
                Click any pin on the map to inspect punch telemetry.
              </div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};
