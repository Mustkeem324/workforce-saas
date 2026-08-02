import React, { useState } from 'react';
import { ShiftCard } from '../components/workforce/shift-card';
import type { Shift } from '../components/workforce/shift-card';
import { TimeClockWidget } from '../components/workforce/time-clock';
import { PayrollSummaryCards } from '../components/workforce/payroll-summary';
import { PayrollTable } from '../components/ui/table';
import type { PayrollRow } from '../components/ui/table';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Plus, RefreshCw } from 'lucide-react';

const INITIAL_SHIFTS: Shift[] = [
  {
    id: 's1',
    employeeName: 'Alex Rivera',
    role: 'Senior Tech Lead',
    startTime: '08:00 AM',
    endTime: '04:30 PM',
    durationHours: 8.0,
    breakMins: 30,
    location: 'Austin Hub',
    status: 'In-Progress'
  },
  {
    id: 's2',
    employeeName: 'Jordan Chen',
    role: 'Shift Operations Lead',
    startTime: '07:30 AM',
    endTime: '05:30 PM',
    durationHours: 9.5,
    breakMins: 30,
    location: 'Austin Hub',
    isOvertime: true,
    status: 'Scheduled'
  },
  {
    id: 's3',
    employeeName: 'Morgan Smith',
    role: 'Dispatch Coordinator',
    startTime: '12:00 PM',
    endTime: '08:30 PM',
    durationHours: 8.0,
    breakMins: 30,
    location: 'Remote Dispatch',
    status: 'Open'
  }
];

const INITIAL_PAYROLL_DATA: PayrollRow[] = [
  {
    id: 'pr-1',
    employeeName: 'Alex Rivera',
    role: 'Senior Tech Lead',
    regularHours: '40.00',
    overtimeHours: '04.50',
    hourlyRate: '$48.50',
    grossPay: '$2,267.25',
    taxDeduction: '$453.45',
    netPay: '$1,813.80',
    status: 'Approved'
  },
  {
    id: 'pr-2',
    employeeName: 'Jordan Chen',
    role: 'Shift Operations Lead',
    regularHours: '38.50',
    overtimeHours: '00.00',
    hourlyRate: '$52.00',
    grossPay: '$2,002.00',
    taxDeduction: '$400.40',
    netPay: '$1,601.60',
    status: 'Paid'
  },
  {
    id: 'pr-3',
    employeeName: 'Morgan Smith',
    role: 'Dispatch Coordinator',
    regularHours: '42.75',
    overtimeHours: '02.75',
    hourlyRate: '$36.25',
    grossPay: '$1,699.22',
    taxDeduction: '$339.84',
    netPay: '$1,359.38',
    status: 'Pending'
  },
  {
    id: 'pr-4',
    employeeName: 'Taylor Reed',
    role: 'Logistics Specialist',
    regularHours: '40.00',
    overtimeHours: '06.00',
    hourlyRate: '$42.00',
    grossPay: '$2,058.00',
    taxDeduction: '$411.60',
    netPay: '$1,646.40',
    status: 'Flagged'
  }
];

export const WorkforcePatternsView: React.FC = () => {
  const [shifts] = useState<Shift[]>(INITIAL_SHIFTS);
  const [tabularNumsEnabled, setTabularNumsEnabled] = useState(true);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">WORKFORCE COMPONENT PATTERNS</Badge>
          <span className="text-xs text-[var(--text-tertiary)] font-mono">Shift Drag • Time Clock • Payroll Engine</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">Workforce SaaS Domain Showcase</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-3xl">
          Demonstration of real SaaS workforce controls built strictly using Phase 0 design tokens and re-skinned primitives.
        </p>
      </div>

      {/* 1. Payroll Metrics Row */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Executive Metric Indicators
        </h3>
        <PayrollSummaryCards />
      </div>

      {/* 2. Shift Builder & Time Clock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Shift Cards (Drag enabled) */}
        <div className="lg:col-span-2 space-y-4">
          <Card elevation={1} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">Shift Roster Grid (Interactive Drag)</h3>
                <p className="text-xs text-[var(--text-tertiary)]">Drag cards to preview spring motion and shadow elevation 4</p>
              </div>
              <Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Add Shift Slot
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shifts.map(shift => (
                <ShiftCard key={shift.id} shift={shift} />
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Timecard Clock Punch Terminal */}
        <div>
          <TimeClockWidget />
        </div>
      </div>

      {/* 3. Payroll Table with Tabular Numerics toggle */}
      <Card elevation={2} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Payroll Disbursal Table</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Strict column width alignment with tabular numerics</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={tabularNumsEnabled ? 'accent' : 'secondary'}
              size="sm"
              onClick={() => setTabularNumsEnabled(!tabularNumsEnabled)}
            >
              {tabularNumsEnabled ? 'Tabular Nums: ON' : 'Tabular Nums: OFF'}
            </Button>
          </div>
        </div>

        <PayrollTable data={INITIAL_PAYROLL_DATA} enableTabularNums={tabularNumsEnabled} />
      </Card>
    </div>
  );
};
