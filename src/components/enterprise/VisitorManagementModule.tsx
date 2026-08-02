import React, { useState } from 'react';
import { UserCheck, QrCode, ShieldCheck, Clock, CheckCircle2, Plus, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface VisitorRecord {
  id: string;
  visitorName: string;
  company: string;
  hostName: string;
  purpose: string;
  badgeCode: string;
  status: 'CHECKED_IN' | 'CHECKED_OUT' | 'PENDING_APPROVAL';
  checkInTime: string;
}

export const VisitorManagementModule: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([
    {
      id: 'vis-101',
      visitorName: 'Rajesh Kumar',
      company: 'Tata Consultancy Services',
      hostName: 'Alex Rivera',
      purpose: 'Enterprise Audit Meeting',
      badgeCode: 'VIS-2026-9481',
      status: 'CHECKED_IN',
      checkInTime: '10:15 AM'
    },
    {
      id: 'vis-102',
      visitorName: 'Priya Sharma',
      company: 'Infosys Logistics',
      hostName: 'Jordan Chen',
      purpose: 'Supply Chain Sync',
      badgeCode: 'VIS-2026-9482',
      status: 'CHECKED_IN',
      checkInTime: '11:00 AM'
    }
  ]);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState({ visitorName: '', company: '', hostName: '', purpose: '' });

  const handleRegister = () => {
    if (!newVisitor.visitorName) return;
    const record: VisitorRecord = {
      id: `vis-${Date.now()}`,
      visitorName: newVisitor.visitorName,
      company: newVisitor.company || 'External Vendor',
      hostName: newVisitor.hostName || 'Alex Rivera',
      purpose: newVisitor.purpose || 'Site Visit',
      badgeCode: `VIS-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: 'CHECKED_IN',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setVisitors([record, ...visitors]);
    setIsRegisterOpen(false);
    setNewVisitor({ visitorName: '', company: '', hostName: '', purpose: '' });
  };

  const handleCheckOut = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'CHECKED_OUT' } : v));
  };

  return (
    <Card elevation={2} className="p-6 space-y-6 max-w-5xl mx-auto border-2 border-[var(--border-default)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Visitor & Contractor Management</h3>
            <Badge variant="accent">ENTRY AUDIT</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Pre-registration, QR visitor passes, host authorization, and real-time emergency evacuation roster.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={() => setIsRegisterOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Pre-Register Visitor
        </Button>
      </div>

      {/* Emergency Evacuation Summary */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="text-xs font-bold text-amber-300 block">Emergency Evacuation Roster</span>
            <span className="text-xs text-amber-200/80">Currently {visitors.filter(v => v.status === 'CHECKED_IN').length} active visitors on-site at Mumbai Logistics Hub.</span>
          </div>
        </div>
        <Badge variant="warning">EMERGENCY MANIFEST</Badge>
      </div>

      {/* Active Visitors List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Active Visitor Manifest</h4>

        {visitors.map(vis => (
          <div key={vis.id} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[var(--text-primary)]">{vis.visitorName}</span>
                <span className="text-xs text-[var(--text-tertiary)] font-mono">({vis.company})</span>
                <Badge variant={vis.status === 'CHECKED_IN' ? 'success' : 'neutral'}>
                  {vis.status}
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Host: <span className="font-semibold">{vis.hostName}</span> • Purpose: {vis.purpose}</p>
              <div className="text-[10px] text-[var(--text-tertiary)] font-mono">BADGE CODE: {vis.badgeCode} • ENTRY: {vis.checkInTime}</div>
            </div>

            {vis.status === 'CHECKED_IN' && (
              <Button variant="outline" size="sm" onClick={() => handleCheckOut(vis.id)}>
                Check-Out Visitor
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Pre-Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <Card elevation={3} className="w-full max-w-md p-6 space-y-4 border-2 border-[var(--border-default)]">
            <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Pre-Register Visitor</h4>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Visitor Full Name"
                value={newVisitor.visitorName}
                onChange={e => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-primary)]"
              />
              <input
                type="text"
                placeholder="Company / Vendor Name"
                value={newVisitor.company}
                onChange={e => setNewVisitor({ ...newVisitor, company: e.target.value })}
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-primary)]"
              />
              <input
                type="text"
                placeholder="Host Employee Name"
                value={newVisitor.hostName}
                onChange={e => setNewVisitor({ ...newVisitor, hostName: e.target.value })}
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-primary)]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsRegisterOpen(false)}>Cancel</Button>
              <Button variant="accent" className="flex-1" onClick={handleRegister}>Generate Badge Pass</Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};
