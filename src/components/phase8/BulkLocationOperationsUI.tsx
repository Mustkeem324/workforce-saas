import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, Download, ShieldCheck, RotateCcw, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface LocationRow {
  id: string;
  name: string;
  region: string;
  activeRoster: number;
  overtimeCap: string;
  status: 'Compliant' | 'Overtime Risk';
}

const SAMPLE_LOCATIONS: LocationRow[] = [
  { id: 'loc-1', name: 'Austin Distribution Hub', region: 'Texas Cluster', activeRoster: 184, overtimeCap: '40.0h Cap', status: 'Compliant' },
  { id: 'loc-2', name: 'Dallas Field Facility', region: 'Texas Cluster', activeRoster: 42, overtimeCap: '40.0h Cap', status: 'Compliant' },
  { id: 'loc-3', name: 'Houston Freight Terminal', region: 'Texas Cluster', activeRoster: 68, overtimeCap: '45.0h Cap', status: 'Overtime Risk' },
  { id: 'loc-4', name: 'Phoenix Distribution Center', region: 'Western Cluster', activeRoster: 64, overtimeCap: '40.0h Cap', status: 'Compliant' },
  { id: 'loc-5', name: 'Denver Fulfillment Hub', region: 'Western Cluster', activeRoster: 38, overtimeCap: '48.0h Cap', status: 'Overtime Risk' }
];

export const BulkLocationOperationsUI: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['loc-1', 'loc-2', 'loc-3']);
  const [locations, setLocations] = useState<LocationRow[]>(SAMPLE_LOCATIONS);
  const [undoToast, setUndoToast] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === locations.length) setSelectedIds([]);
    else setSelectedIds(locations.map(l => l.id));
  };

  const handleApplyBulkPolicy = () => {
    setLocations(prev => prev.map(l => {
      if (selectedIds.includes(l.id)) {
        return { ...l, overtimeCap: '40.0h Cap (Strict)', status: 'Compliant' };
      }
      return l;
    }));

    setUndoToast(`Enforced 40.0h Policy across ${selectedIds.length} locations.`);
    setTimeout(() => setUndoToast(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative pb-20">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Bulk Location Operations & Policy Engine</h2>
            <Badge variant="accent">FLOATING ACTION BAR</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Multi-select across locations with a persistent floating bottom action bar and undo buffer.
          </p>
        </div>
      </div>

      {/* Undo Toast Notification */}
      <AnimatePresence>
        {undoToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{undoToast}</span>
            </div>
            <button className="underline text-xs hover:opacity-80">Undo Action</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-Select Table */}
      <Card elevation={2} className="overflow-hidden p-0">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === locations.length}
                  onChange={toggleSelectAll}
                  className="rounded border-[var(--border-default)] accent-[var(--accent-500)]"
                />
              </th>
              <th className="py-3 px-4">Facility Name</th>
              <th className="py-3 px-4">Cluster / Region</th>
              <th className="py-3 px-4 text-right">Active Roster</th>
              <th className="py-3 px-4 text-center">Overtime Policy</th>
              <th className="py-3 px-4 text-center">Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {locations.map(loc => {
              const isSelected = selectedIds.includes(loc.id);
              return (
                <tr
                  key={loc.id}
                  className={`hover:bg-[var(--bg-element-hover)]/70 transition-colors ${
                    isSelected ? 'bg-[var(--accent-500)]/10' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(loc.id)}
                      className="rounded border-[var(--border-default)] accent-[var(--accent-500)]"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[var(--text-primary)]">{loc.name}</td>
                  <td className="py-3.5 px-4 text-xs text-[var(--text-tertiary)]">{loc.region}</td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-[var(--text-primary)]">{loc.activeRoster}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-[var(--accent-500)] font-semibold">{loc.overtimeCap}</td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant={loc.status === 'Compliant' ? 'success' : 'danger'}>{loc.status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* PERSISTENT FLOATING BOTTOM ACTION BAR */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[var(--ink-950)] text-white p-4 rounded-2xl border-2 border-[var(--accent-500)] shadow-[var(--shadow-4)] flex items-center gap-6 text-xs max-w-2xl w-full"
          >
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-500)] text-white font-extrabold text-xs flex items-center justify-center font-mono">
                {selectedIds.length}
              </div>
              <span className="font-bold">Facilities Selected</span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Button variant="accent" size="sm" onClick={handleApplyBulkPolicy} leftIcon={<ShieldCheck className="w-4 h-4" />}>
                Apply Strict 40h Policy
              </Button>

              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" leftIcon={<Download className="w-4 h-4" />}>
                Export Consolidated CSV
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
