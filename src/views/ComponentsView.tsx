import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import type { ButtonVariant, ButtonSize } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import type { BadgeVariant } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { Modal } from '../components/ui/modal';
import { Drawer } from '../components/ui/drawer';
import { ToastContainer } from '../components/ui/toast';
import type { ToastMessage } from '../components/ui/toast';
import { Plus, Search, Mail, Lock, Bell, CheckCircle2, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export const ComponentsView: React.FC = () => {
  // Button interactive state
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>('accent');
  const [btnSize, setBtnSize] = useState<ButtonSize>('md');
  const [btnLoading, setBtnLoading] = useState(false);

  // Input state
  const [inputValue, setInputValue] = useState('42.50');
  const [inputError, setInputError] = useState('');

  // Switch state
  const [switchChecked, setSwitchChecked] = useState(true);

  // Overlay states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const triggerToast = (type: 'success' | 'warning' | 'danger' | 'info') => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      title: `${type.toUpperCase()} Notification`,
      description: `Action processed with 150ms token animation.`
    };
    setToasts(prev => [...prev, newToast]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">LIVING STORYBOOK</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">Re-skinned Primitives</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Re-skinned Component Library</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          Built on top of shadcn primitive contracts but customized with custom border radiuses, warm accent focus rings, 
          and spring micro-interactions. No component reads as "default Bootstrap/shadcn".
        </p>
      </div>

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* 1. Buttons Sandbox */}
      <Card elevation={2} className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">1. Button Primitive Matrix</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Includes Obsidian Ink, Warm Accent, Outline, Ghost, and Loading states</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-tertiary)]">Variant:</span>
              <select
                value={btnVariant}
                onChange={(e) => setBtnVariant(e.target.value as ButtonVariant)}
                className="bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded px-2 py-1 text-xs text-[var(--text-primary)]"
              >
                <option value="primary">primary (Obsidian Ink)</option>
                <option value="accent">accent (Warm Copper)</option>
                <option value="secondary">secondary</option>
                <option value="outline">outline</option>
                <option value="ghost">ghost</option>
                <option value="destructive">destructive</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-tertiary)]">Size:</span>
              <select
                value={btnSize}
                onChange={(e) => setBtnSize(e.target.value as ButtonSize)}
                className="bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded px-2 py-1 text-xs text-[var(--text-primary)]"
              >
                <option value="sm">sm (32px)</option>
                <option value="md">md (40px)</option>
                <option value="lg">lg (48px)</option>
                <option value="icon">icon</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setBtnLoading(!btnLoading)}
            >
              {btnLoading ? 'Stop Loading' : 'Simulate Loading'}
            </Button>
          </div>
        </div>

        {/* Live Playground */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex flex-wrap items-center justify-center gap-4">
          <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} leftIcon={<Sparkles className="w-4 h-4" />}>
            Interactive Button
          </Button>

          <Button variant="accent" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            Create Shift
          </Button>

          <Button variant="primary" size="md">
            Save Workforce Policy
          </Button>

          <Button variant="secondary" size="md" leftIcon={<Filter className="w-4 h-4" />}>
            Filter Schedule
          </Button>

          <Button variant="destructive" size="sm">
            Terminate Shift
          </Button>
        </div>
      </Card>

      {/* 2. Inputs & Form Controls */}
      <Card elevation={2} className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">2. Form Inputs & Controls</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Custom focus ring offsets with warm copper glow + tabular numerics option</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Search Employees"
            placeholder="Type name, role or ID..."
            leftIcon={<Search className="w-4 h-4" />}
            helperText="Searches active roster in real time"
          />

          <Input
            label="Base Hourly Rate ($)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            isTabularNums
            helperText="Tabular figures enabled for wage calculation"
          />

          <Input
            label="Validation Error State"
            value="invalid-rate-over-max"
            error="Hourly wage exceeds policy cap ($150.00/hr)"
          />
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Switch
            checked={switchChecked}
            onChange={setSwitchChecked}
            label="Enable Overtime Compliance Safeguards"
            description="Automatically caps employee scheduled hours at 40 hrs/week"
          />
        </div>
      </Card>

      {/* 3. Badges & Pills */}
      <Card elevation={2} className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">3. Status Badges & Pills</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Semantic color tokens with status dot indicators</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success">Approved</Badge>
          <Badge variant="warning">Overtime Risk</Badge>
          <Badge variant="danger">Compliance Breach</Badge>
          <Badge variant="info">Schedule Update</Badge>
          <Badge variant="accent">In Progress</Badge>
          <Badge variant="neutral">Draft Shift</Badge>
        </div>
      </Card>

      {/* 4. Overlay & Feedback Components */}
      <Card elevation={2} className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">4. Overlays & Feedback Systems</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Modals with backdrop blur, slide-over sheet drawers, and spring toasts</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Reskinned Modal
          </Button>

          <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
            Open Slide-Over Drawer
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-tertiary)]">Trigger Toast:</span>
            <Button variant="outline" size="sm" onClick={() => triggerToast('success')}>Success</Button>
            <Button variant="outline" size="sm" onClick={() => triggerToast('warning')}>Warning</Button>
            <Button variant="outline" size="sm" onClick={() => triggerToast('danger')}>Danger</Button>
          </div>
        </div>
      </Card>

      {/* Rendered Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Approve Weekly Payroll Batch"
        description="Verify 184 employee timesheets before sending to payroll provider."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="accent" size="sm" onClick={() => { setIsModalOpen(false); triggerToast('success'); }}>Confirm Payroll Payout</Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-[var(--text-secondary)]">
          <p>
            You are about to authorize <span className="font-mono tabular-nums font-bold text-[var(--text-primary)]">$142,850.40</span> in net payroll disbursal.
          </p>
          <div className="p-3 rounded-lg bg-[var(--warning-bg)] border border-[var(--warning-border)] text-[var(--warning-text)]">
            <span className="font-bold">Notice:</span> 12 overtime exceptions require supervisor sign-off.
          </div>
        </div>
      </Modal>

      {/* Rendered Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Employee Shift Editor"
        subtitle="Alex Rivera • Senior Tech Lead"
        footer={
          <Button variant="accent" className="w-full" onClick={() => setIsDrawerOpen(false)}>Save Changes</Button>
        }
      >
        <div className="space-y-4 text-xs">
          <Input label="Shift Title" value="Morning Distribution Lead" readOnly />
          <Input label="Start Time" value="08:00 AM" isTabularNums readOnly />
          <Input label="End Time" value="04:30 PM" isTabularNums readOnly />
          <Input label="Hourly Rate" value="$48.50" isTabularNums readOnly />
        </div>
      </Drawer>
    </div>
  );
};
