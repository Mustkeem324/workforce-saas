import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, LayoutDashboard, Radio, Calendar, IndianRupee, PieChart, Bot, MapPin, Users, Plus, ShieldCheck, X, FileText, Globe, Lock, Building2, Gauge } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Employees' | 'Locations';
  title: string;
  subtitle: string;
  shortcut?: string;
  action: () => void;
}

export interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items: CommandItem[] = [
    { id: 'nav-p12', category: 'Navigation', title: 'Go to Employee Self-Service Mobile Hub', subtitle: 'Personal home dashboard & payslip carousel', action: () => { onNavigate('phase12'); onClose(); } },
    { id: 'nav-p4', category: 'Navigation', title: 'Go to Guarded Payroll Engine', subtitle: 'Disbursal wizard & Indian Rupee payslip studio', action: () => { onNavigate('phase4'); onClose(); } },
    { id: 'nav-p3', category: 'Navigation', title: 'Go to Shift Builder & Smart Roster', subtitle: 'Drag-and-drop calendar & conflict detection', action: () => { onNavigate('phase3'); onClose(); } },
    { id: 'nav-p2', category: 'Navigation', title: 'Go to Attendance Capture & Geofence Map', subtitle: 'Live stream & geofence vector map', action: () => { onNavigate('phase2'); onClose(); } },
    { id: 'nav-p5', category: 'Navigation', title: 'Go to Leave, Loans & Pivot Reports', subtitle: 'Team heatmap & Metabase report builder', action: () => { onNavigate('phase5'); onClose(); } },
    { id: 'nav-p6', category: 'Navigation', title: 'Go to AI Co-Pilot & Anomaly Digest', subtitle: 'Docked assistant & proactive anomaly digest', action: () => { onNavigate('phase6'); onClose(); } },
    { id: 'nav-p8', category: 'Navigation', title: 'Go to Enterprise Multi-Location Tree', subtitle: '50+ location hierarchy tree & RBAC matrix', action: () => { onNavigate('phase8'); onClose(); } },
    { id: 'nav-p10', category: 'Navigation', title: 'Go to Statutory Compliance & Audit Logs', subtitle: 'Immutable audit log & statutory compliance', action: () => { onNavigate('phase10'); onClose(); } },
    { id: 'nav-p11', category: 'Navigation', title: 'Go to Executive Intelligence & Cohorts', subtitle: 'Single-screen CFO summary & retention cohorts', action: () => { onNavigate('phase11'); onClose(); } },
    { id: 'nav-p9', category: 'Navigation', title: 'Go to Developer API & Integrations Marketplace', subtitle: 'Connector marketplace & Stripe-style API explorer', action: () => { onNavigate('phase9'); onClose(); } },
    { id: 'nav-blog', category: 'Navigation', title: 'Go to Blog & Editorial CMS Admin', subtitle: 'Article management, categories & publishing', action: () => { onNavigate('blog'); onClose(); } },
    { id: 'nav-p14', category: 'Navigation', title: 'Go to White-Label Customizer & Franchise Rollups', subtitle: 'Live theme customizer & franchise rollups', action: () => { onNavigate('phase14'); onClose(); } },
    { id: 'nav-p13', category: 'Navigation', title: 'Go to Offline-First Engine & Latency Audit', subtitle: 'IndexedDB sync banner & conflict resolution', action: () => { onNavigate('phase13'); onClose(); } },
    { id: 'nav-p16', category: 'Navigation', title: 'Go to Security Center & GDPR Data Exporter', subtitle: 'SAML/2FA security center & GDPR ZIP exporter', action: () => { onNavigate('phase16'); onClose(); } },
    { id: 'nav-p15', category: 'Navigation', title: 'Go to Accessibility & RTL Localized Engine', subtitle: 'WCAG 2.1 AA audit & RTL layout mirroring', action: () => { onNavigate('phase15'); onClose(); } },
    { id: 'nav-p17', category: 'Navigation', title: 'Go to Design Ops Changelog & Referral Loop', subtitle: 'Release notes changelog & PLG referral loop', action: () => { onNavigate('phase17'); onClose(); } },
    { id: 'nav-p7', category: 'Navigation', title: 'Go to Product Overview & Marketing Site', subtitle: 'Expressive hero & live interactive product demo', action: () => { onNavigate('phase7'); onClose(); } },
    { id: 'nav-p1', category: 'Navigation', title: 'Go to Admin Shell & Command Palette', subtitle: 'Location switcher & onboarding wizard', action: () => { onNavigate('phase1'); onClose(); } },
    
    { id: 'act-punch', category: 'Actions', title: 'Punch In / Clock Shift', subtitle: 'Optimistic mobile punch terminal', action: () => { onNavigate('phase2'); onClose(); } },
    { id: 'act-payroll', category: 'Actions', title: 'Authorize INR Payroll Run', subtitle: 'Start ₹1,42,736.40 disbursal pipeline', action: () => { onNavigate('phase4'); onClose(); } },
    { id: 'act-shift', category: 'Actions', title: 'Create Shift Slot', subtitle: 'Add shift to weekly roster grid', action: () => { onNavigate('phase3'); onClose(); } },

    { id: 'emp-alex', category: 'Employees', title: 'Alex Rivera', subtitle: 'Senior Tech Lead • Austin Hub', action: () => { onNavigate('phase2'); onClose(); } },
    { id: 'emp-jordan', category: 'Employees', title: 'Jordan Chen', subtitle: 'Shift Operations Lead • Austin Hub', action: () => { onNavigate('phase3'); onClose(); } },

    { id: 'loc-austin', category: 'Locations', title: 'Austin Distribution Hub', subtitle: 'Primary Facility • 184 Active Roster', action: () => { onNavigate('phase2'); onClose(); } },
    { id: 'loc-dallas', category: 'Locations', title: 'Dallas Field Facility', subtitle: 'Secondary Facility • 42 Active Roster', action: () => { onNavigate('phase2'); onClose(); } }
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Command Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-2xl shadow-[var(--shadow-4)] overflow-hidden z-10 text-[var(--text-primary)]"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
              <Search className="w-5 h-5 text-[var(--accent-500)] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Type a command, employee, location or page... (Cmd+K)"
                className="w-full text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--ink-500)] focus:outline-none font-medium"
              />
              <span className="font-mono text-[10px] bg-[var(--bg-element-hover)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--text-tertiary)] shrink-0">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={item.action}
                    className="p-3 rounded-xl hover:bg-[var(--bg-element-hover)] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-500)] transition-colors">
                          {item.title}
                        </span>
                        <Badge variant="neutral">{item.category}</Badge>
                      </div>
                      <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{item.subtitle}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent-500)] transition-all" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[var(--text-tertiary)]">
                  No matching commands found for "{searchQuery}"
                </div>
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-[10px] font-mono text-[var(--text-tertiary)] flex justify-between">
              <span>PRESS UP/DOWN OR CLICK TO SELECT</span>
              <span>ENTER TO SELECT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
