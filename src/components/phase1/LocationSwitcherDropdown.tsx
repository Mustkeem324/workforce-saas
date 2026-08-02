import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Check, Plus, Radio, Building2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface LocationItem {
  id: string;
  name: string;
  code: string;
  activeCount: number;
  geofenceRadius: string;
  isPrimary?: boolean;
}

export const LocationSwitcherDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState('loc-1');

  const locations: LocationItem[] = [
    { id: 'loc-1', name: 'Austin Distribution Hub', code: 'AUS-01', activeCount: 184, geofenceRadius: '150m', isPrimary: true },
    { id: 'loc-2', name: 'Dallas Field Facility', code: 'DAL-02', activeCount: 42, geofenceRadius: '200m' },
    { id: 'loc-3', name: 'Remote Dispatch Fleet', code: 'RMT-03', activeCount: 18, geofenceRadius: 'Global' }
  ];

  const currentLoc = locations.find(l => l.id === selectedLocId) || locations[0];

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] hover:border-[var(--border-accent)] transition-all text-xs text-left"
      >
        <MapPin className="w-4 h-4 text-[var(--accent-500)] shrink-0" />
        <div>
          <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
            <span>{currentLoc.name}</span>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)]">({currentLoc.code})</span>
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] flex items-center gap-2">
            <span>{currentLoc.activeCount} Active Roster</span>
            <span>•</span>
            <span>Geofence: {currentLoc.geofenceRadius}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 mt-2 w-72 bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl shadow-[var(--shadow-3)] overflow-hidden z-30 p-2 space-y-1"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] px-3 py-1">
              SELECT ACTIVE FACILITY
            </div>

            {locations.map(loc => {
              const isSelected = loc.id === selectedLocId;
              return (
                <div
                  key={loc.id}
                  onClick={() => { setSelectedLocId(loc.id); setIsOpen(false); }}
                  className={`
                    p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs transition-colors
                    ${isSelected ? 'bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/40 text-[var(--text-primary)]' : 'hover:bg-[var(--bg-element-hover)] text-[var(--text-secondary)]'}
                  `}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>{loc.name}</span>
                      {loc.isPrimary && <Badge variant="accent">PRIMARY</Badge>}
                    </div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                      {loc.activeCount} Roster • Geofence {loc.geofenceRadius}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[var(--accent-500)] shrink-0" />}
                </div>
              );
            })}

            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[var(--accent-500)] hover:bg-[var(--bg-element-hover)] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Facility Location</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
