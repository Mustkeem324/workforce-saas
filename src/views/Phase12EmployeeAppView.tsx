import React from 'react';
import { UserCheck, Smartphone, DollarSign, Smile } from 'lucide-react';
import { EmployeeHomeDashboard } from '../components/phase12/EmployeeHomeDashboard';
import { PayslipCarouselHistory } from '../components/phase12/PayslipCarouselHistory';
import { LowFrictionPulseSurvey } from '../components/phase12/LowFrictionPulseSurvey';
import { Badge } from '../components/ui/badge';

export const Phase12EmployeeAppView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">EMPLOYEE HUB</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">SELF-SERVICE & PAYDAY COUNTDOWN</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Employee Self-Service Mobile Hub</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Personal employee dashboard (attendance %, payday countdown, leave balance), swipeable payslip carousel with YTD earnings, and 1-tap emoji pulse survey.
          </p>
        </div>
      </div>

      {/* Personal Employee Home Dashboard */}
      <EmployeeHomeDashboard />

      {/* Swipeable Monthly Payslip Carousel & YTD Chart */}
      <PayslipCarouselHistory />

      {/* Single-Question 1-Tap Emoji Pulse Survey */}
      <LowFrictionPulseSurvey />
    </div>
  );
};
