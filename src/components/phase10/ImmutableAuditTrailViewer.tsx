import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, History, Filter, Search, ArrowRight, Eye, User, Clock, MapPin, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  category: 'Payroll' | 'Attendance' | 'Permissions' | 'Shift Roster';
  ipAddress: string;
  location: string;
  beforeValue: string;
  afterValue: string;
}

const AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'aud-9481',
    timestamp: '2026-08-02 05:24:12 PM',
    actor: 'Alex Rivera',
    actorRole: 'Global Admin',
    action: 'Modified Hourly Base Rate',
    category: 'Payroll',
    ipAddress: '192.168.1.104',
    location: 'Austin Distribution Hub',
    beforeValue: '{"employee": "Jordan Chen", "hourlyRate": 28.50, "currency": "USD"}',
    afterValue: '{"employee": "Jordan Chen", "hourlyRate": 34.00, "currency": "USD"}'
  },
  {
    id: 'aud-9482',
    timestamp: '2026-08-02 04:12:00 PM',
    actor: 'Taylor Reed',
    actorRole: 'Facility Manager',
    action: 'Overrode Overtime Cap Limit',
    category: 'Attendance',
    ipAddress: '172.16.0.42',
    location: 'Dallas Field Facility',
    beforeValue: '{"facility": "DAL-02", "overtimeCap": "40.0h Strict", "complianceLock": true}',
    afterValue: '{"facility": "DAL-02", "overtimeCap": "48.0h Temporary Override", "complianceLock": false}'
  },
  {
    id: 'aud-9483',
    timestamp: '2026-08-02 02:45:30 PM',
    actor: 'Jordan Chen',
    actorRole: 'Shift Operations Lead',
    action: 'Updated Shift Roster Slot',
    category: 'Shift Roster',
    ipAddress: '10.0.4.18',
    location: 'Austin Distribution Hub',
    beforeValue: '{"shiftId": "sft-04", "assignedTo": "Unassigned", "duration": "8.0h"}',
    afterValue: '{"shiftId": "sft-04", "assignedTo": "Taylor Reed", "duration": "8.0h"}'
  }
];

export const ImmutableAuditTrailViewer: React.FC = () => {
  const [records] = useState<AuditRecord[]>(AUDIT_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter(r => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch = r.action.toLowerCase().includes(searchQuery.toLowerCase()) || r.actor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Immutable System Audit Trail Log</h2>
            <Badge variant="accent">ENTERPRISE TRUST SIGNAL</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Filterable cryptographic audit timeline (who changed what, when, from where) with side-by-side diff inspection.
          </p>
        </div>

        <Input
          placeholder="Filter audit log..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="w-52"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {['All', 'Payroll', 'Attendance', 'Permissions', 'Shift Roster'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`
              px-3.5 py-1.5 rounded-xl font-semibold border transition-all
              ${categoryFilter === cat 
                ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-xs' 
                : 'bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <Card elevation={2} className="overflow-hidden p-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Actor / User</th>
              <th className="py-3.5 px-4">Action Summary</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">IP Address & Location</th>
              <th className="py-3.5 px-4 text-center">Diff Inspection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] font-mono tabular-nums">
            {filteredRecords.map(rec => (
              <tr key={rec.id} className="hover:bg-[var(--bg-element-hover)]/70 transition-colors">
                <td className="py-3.5 px-4 text-[var(--text-tertiary)]">{rec.timestamp}</td>
                <td className="py-3.5 px-4 font-sans font-bold text-[var(--text-primary)]">
                  <div>{rec.actor}</div>
                  <span className="text-[10px] text-[var(--accent-500)] font-mono font-normal">{rec.actorRole}</span>
                </td>
                <td className="py-3.5 px-4 font-sans font-bold text-[var(--text-primary)]">{rec.action}</td>
                <td className="py-3.5 px-4 font-sans">
                  <Badge variant="neutral">{rec.category}</Badge>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--text-tertiary)]">
                  <div>{rec.ipAddress}</div>
                  <span className="font-sans text-[10px]">{rec.location}</span>
                </td>
                <td className="py-3.5 px-4 text-center font-sans">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(rec)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-[var(--accent-500)]" />}
                  >
                    View Diff
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Side-by-Side Diff Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl p-6 max-w-2xl w-full shadow-[var(--shadow-4)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">Audit Diff Inspection — {selectedRecord.action}</h3>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono">{selectedRecord.actor} • {selectedRecord.timestamp}</p>
                </div>
                <button onClick={() => setSelectedRecord(null)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Side-by-Side JSON Diff Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-sans font-bold text-rose-400 block">BEFORE VALUE (PREVIOUS)</span>
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 overflow-x-auto text-[11px]">
                    <pre>{JSON.stringify(JSON.parse(selectedRecord.beforeValue), null, 2)}</pre>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-sans font-bold text-emerald-400 block">AFTER VALUE (UPDATED)</span>
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 overflow-x-auto text-[11px]">
                    <pre>{JSON.stringify(JSON.parse(selectedRecord.afterValue), null, 2)}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
