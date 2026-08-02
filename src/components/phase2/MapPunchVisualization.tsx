import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Crosshair, ZoomIn, ZoomOut, MapPin, Smartphone, ShieldCheck, ShieldAlert } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MapPinPoint {
  id: string;
  employeeName: string;
  avatar: string;
  role: string;
  time: string;
  lat: number;
  lng: number;
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
    lat: 19.0760,
    lng: 72.8777,
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
    lat: 19.0765,
    lng: 72.8782,
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
    lat: 19.0755,
    lng: 72.8765,
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
    lat: 19.0900,
    lng: 72.8900,
    accuracyRadiusMeters: 28.5,
    isGeofenced: false,
    coords: '19.0900° N, 72.8900° E',
    device: 'Mobile GPS (Unverified)'
  }
];

export const MapPunchVisualization: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MapPinPoint | null>(MAP_POINTS[0]);
  const [showGeofenceBoundary, setShowGeofenceBoundary] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleLayerRef = useRef<L.Circle | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize Real Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map centered on Mumbai Logistics Hub
    const map = L.map(mapContainerRef.current, {
      center: [19.0760, 72.8777],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    // CartoDB Dark Matter Real Map Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Facility 150m Radius Geofence Circle
    const geofenceCircle = L.circle([19.0760, 72.8777], {
      color: '#E05A47',
      fillColor: '#E05A47',
      fillOpacity: 0.12,
      radius: 150,
      dashArray: '6, 6',
      weight: 2
    }).addTo(map);

    circleLayerRef.current = geofenceCircle;

    // Plot Real Employee Marker Pins
    MAP_POINTS.forEach(pt => {
      const pinHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xl border-2 transition-transform hover:scale-125 ${
            pt.isGeofenced ? 'bg-[#E05A47] border-white' : 'bg-rose-600 border-white'
          }">
            ${pt.avatar}
          </div>
          <span class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
            pt.isGeofenced ? 'bg-emerald-400' : 'bg-rose-500'
          }"></span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-leaflet-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedPin(pt);
        map.flyTo([pt.lat, pt.lng], 16, { duration: 0.8 });
      });

      markersRef.current.set(pt.id, marker);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Geofence Circle visibility
  useEffect(() => {
    if (!mapInstanceRef.current || !circleLayerRef.current) return;
    if (showGeofenceBoundary) {
      circleLayerRef.current.addTo(mapInstanceRef.current);
    } else {
      circleLayerRef.current.remove();
    }
  }, [showGeofenceBoundary]);

  // Pan map when selected pin changes
  const handleSelectPin = (pt: MapPinPoint) => {
    setSelectedPin(pt);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([pt.lat, pt.lng], 16, { duration: 0.8 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

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
              Real OpenStreetMap Vector Geofence Inspector
            </h2>
          </div>
          <Badge variant="accent" className="shrink-0 whitespace-nowrap">LIVE MAP TILES</Badge>
        </div>

        <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
          Real CartoDB dark tile map with live GPS markers, 150m geofence perimeter ring, and telemetry inspector.
        </p>

        <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
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

          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
            MUMBAI HUB: 19.0760° N, 72.8777° E
          </span>
        </div>
      </div>

      {/* Map Viewport & Inspector Sub-Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] gap-6 items-start min-w-0">
        {/* Real Interactive Leaflet Tile Map Canvas Container */}
        <div className="w-full min-w-0 relative bg-[var(--ink-950)] border-2 border-[var(--border-default)] rounded-3xl h-[380px] sm:h-[460px] md:h-[500px] overflow-hidden shadow-[var(--shadow-3)]">
          {/* Leaflet Map DOM Mount Node */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Interactive Zoom Controls Overlay */}
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <button 
              onClick={handleZoomIn}
              aria-label="Zoom in map"
              className="p-2.5 rounded-xl bg-[var(--ink-900)] text-white border border-[var(--ink-700)] shadow-md hover:bg-[var(--ink-800)] min-touch flex items-center justify-center"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={handleZoomOut}
              aria-label="Zoom out map"
              className="p-2.5 rounded-xl bg-[var(--ink-900)] text-white border border-[var(--ink-700)] shadow-md hover:bg-[var(--ink-800)] min-touch flex items-center justify-center"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Select Employee Pins Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-[400] bg-[var(--ink-950)]/90 backdrop-blur-md border border-[var(--border-subtle)] p-2.5 rounded-2xl flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] px-2 shrink-0">
              PUNCH LOCATIONS:
            </span>
            {MAP_POINTS.map(pt => (
              <button
                key={pt.id}
                onClick={() => handleSelectPin(pt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedPin?.id === pt.id 
                    ? 'bg-[var(--accent-500)] text-white shadow-sm' 
                    : 'bg-[var(--ink-900)] text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <span>{pt.avatar}</span>
                <span>{pt.employeeName.split(' ')[0]}</span>
              </button>
            ))}
          </div>
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
