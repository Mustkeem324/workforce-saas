import React from 'react';
import { User, Calendar, Clock, DollarSign, HeartPulse, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const EmployeeHomeDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Welcome Back, Alex Rivera!</h2>
            <Badge variant="accent">EMPLOYEE MOBILE HUB</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Personal workforce portal — designed for employee empowerment, not just punch-in tracking.
          </p>
        </div>

        <Badge variant="success">ON SHIFT (AUSTIN HUB)</Badge>
      </div>

      {/* 3 Core Personal Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono tabular-nums">
        <Card elevation={1} className="space-y-2 border-l-4 border-l-emerald-500">
          <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">THIS MONTH'S ATTENDANCE</span>
          <div className="text-3xl font-extrabold text-emerald-400">98.4%</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">100% On-Time Punch Record</span>
        </Card>

        <Card elevation={1} className="space-y-2 border-l-4 border-l-[var(--accent-500)]">
          <span className="text-xs text-[var(--accent-500)] font-sans font-semibold">NEXT PAYDAY COUNTDOWN</span>
          <div className="text-3xl font-extrabold text-[var(--accent-500)]">5 Days</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">Est. Payout: $2,850.00 Net (Aug 7)</span>
        </Card>

        <Card elevation={1} className="space-y-2 border-l-4 border-l-indigo-500">
          <span className="text-xs text-[var(--text-tertiary)] font-sans font-semibold">PAID LEAVE BALANCE</span>
          <div className="text-3xl font-extrabold text-[var(--text-primary)]">14 Days</div>
          <span className="text-[10px] text-[var(--text-tertiary)] font-sans block">10 Days Annual + 4 Days Sick</span>
        </Card>
      </div>

      {/* Upcoming Shift & Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation={2} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-sans">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Next Scheduled Shift</h3>
            <Badge variant="accent">TOMORROW</Badge>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 font-mono text-xs">
            <div className="flex justify-between font-sans">
              <span className="font-bold text-[var(--text-primary)]">Morning Lead Shift</span>
              <span className="text-[var(--accent-500)] font-bold">08:00 AM - 04:00 PM</span>
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] font-sans">
              <span>Location: Austin Distribution Hub</span>
              <span>8.0 Hours Standard</span>
            </div>
          </div>
        </Card>

        <Card elevation={2} className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
            Quick Employee Self-Service Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="accent" size="sm" className="w-full">
              Request Time Off
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Request Shift Swap
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
