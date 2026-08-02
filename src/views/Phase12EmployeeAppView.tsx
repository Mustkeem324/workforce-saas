import React, { useState } from 'react';
import { User, DollarSign, HeartPulse } from 'lucide-react';
import { EmployeeHomeDashboard } from '../components/phase12/EmployeeHomeDashboard';
import { PayslipCarouselHistory } from '../components/phase12/PayslipCarouselHistory';
import { LowFrictionPulseSurvey } from '../components/phase12/LowFrictionPulseSurvey';
import { Badge } from '../components/ui/badge';

export const Phase12EmployeeAppView: React.FC = () => {
  const [subTab, setSubTab] = useState<'home' | 'payslip' | 'pulse'>('home');

  const subTabs = [
    { id: 'home', label: '1. Personal Home Dashboard', icon: <User className="w-4 h-4" />, desc: 'Personal metrics, payday countdown & shift schedule' },
    { id: 'payslip', label: '2. Payslip History Carousel', icon: <DollarSign className="w-4 h-4" />, desc: 'Monthly payslip carousel & YTD earnings chart' },
    { id: 'pulse', label: '3. Low-Friction Pulse Survey', icon: <HeartPulse className="w-4 h-4" />, desc: 'Single-question 1-tap emoji feedback widget' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 12 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">EMPLOYEE SELF-SERVICE & ENGAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 12 — Employee Self-Service Mobile Experience</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Personalized dashboard, swipeable payslip carousel history, and low-friction 1-tap emoji pulse survey.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] p-2 rounded-2xl shadow-xs">
        {subTabs.map(tab => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                ${isActive 
                  ? 'bg-[var(--accent-500)] text-white shadow-[var(--shadow-accent-glow)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] hover:text-[var(--text-primary)]'}
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-view Viewport */}
      <div>
        {subTab === 'home' && <EmployeeHomeDashboard />}
        {subTab === 'payslip' && <PayslipCarouselHistory />}
        {subTab === 'pulse' && <LowFrictionPulseSurvey />}
      </div>
    </div>
  );
};
