import React, { useState } from 'react';
import { Rocket, Command, MapPin, Skull, Sparkles } from 'lucide-react';
import { CommandPaletteModal } from '../components/phase1/CommandPaletteModal';
import { LocationSwitcherDropdown } from '../components/phase1/LocationSwitcherDropdown';
import { OnboardingWizardModal } from '../components/phase1/OnboardingWizardModal';
import { TableSkeleton, CardSkeleton } from '../components/phase1/ContentShapedSkeletons';
import { CustomIllustratedEmptyState } from '../components/phase1/CustomIllustratedEmptyStates';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export interface Phase1Props {
  onNavigateTab: (tabId: string) => void;
}

export const Phase1AdminShellView: React.FC<Phase1Props> = ({ onNavigateTab }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSkeletonSimulating, setIsSkeletonSimulating] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Command Palette Listener Modal */}
      <CommandPaletteModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={onNavigateTab}
      />

      {/* Onboarding Wizard Modal */}
      <OnboardingWizardModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => setIsOnboardingOpen(false)}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">PHASE 1 DELIVERABLE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">CORE AUTH, ORG & ADMIN SHELL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Phase 1 — Admin Shell & Investor-Ready Polish</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Command Palette (Cmd+K), persistent location switcher, animated onboarding wizard, content-shaped skeletons, and custom empty states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Location Switcher */}
          <LocationSwitcherDropdown />

          {/* Trigger Cmd+K button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsCommandOpen(true)}
            leftIcon={<Command className="w-4 h-4 text-[var(--accent-500)]" />}
          >
            Command Palette (Cmd+K)
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsOnboardingOpen(true)}
            leftIcon={<Rocket className="w-4 h-4" />}
          >
            Trigger Onboarding Wizard
          </Button>
        </div>
      </div>

      {/* Demo Section 1: Command Palette & Location Switcher Brief */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation={2} className="space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">1. Command Palette (Cmd+K / Ctrl+K)</h3>
            <Badge variant="accent" className="font-mono">Cmd+K</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Press <code className="font-mono text-[var(--accent-500)] font-bold">Cmd + K</code> anywhere to trigger instant keyboard search across pages, employees, shift actions, and facility locations.
          </p>
          <Button variant="outline" size="sm" onClick={() => setIsCommandOpen(true)} className="w-full">
            Test Command Search Window
          </Button>
        </Card>

        <Card elevation={2} className="space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">2. Persistent Location Switcher</h3>
            <Badge variant="success">MULTI-LOCATION</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Multi-facility organizations live in this dropdown constantly. Displays active roster count, geofence radius, and system status per location.
          </p>
          <div className="flex justify-start">
            <LocationSwitcherDropdown />
          </div>
        </Card>
      </div>

      {/* Demo Section 2: Content-Shaped Skeleton Loading States */}
      <Card elevation={2} className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">3. Content-Shaped Skeletons vs Spinners</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Skeletons match exact layout geometry to reduce perceived load time</p>
          </div>

          <Button
            variant={isSkeletonSimulating ? 'accent' : 'outline'}
            size="sm"
            onClick={() => setIsSkeletonSimulating(!isSkeletonSimulating)}
          >
            {isSkeletonSimulating ? 'Showing Skeleton Loading...' : 'Simulate Async Skeleton Loading'}
          </Button>
        </div>

        {isSkeletonSimulating ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <TableSkeleton />
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs text-center text-[var(--text-tertiary)]">
            Click "Simulate Async Skeleton Loading" above to test content-shaped skeletons.
          </div>
        )}
      </Card>

      {/* Demo Section 3: Custom Illustrated Empty States */}
      <Card elevation={2} className="space-y-4">
        <div className="border-b border-[var(--border-subtle)] pb-3">
          <h3 className="text-base font-bold text-[var(--text-primary)]">4. Custom Illustrated Empty States</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Every empty state features custom vector art and a clear primary CTA—no generic "No data found."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomIllustratedEmptyState
            title="No Shifts Scheduled for Today"
            description="Your team roster is clear for this facility. Click below to add a shift template or run AI auto-rostering."
            ctaText="Build Today's Schedule"
            onAction={() => onNavigateTab('phase3')}
            illustrationType="shifts"
          />

          <CustomIllustratedEmptyState
            title="All Biometric Terminals Synced"
            description="No pending offline sync logs detected across active hardware terminals."
            ctaText="Inspect Terminal Health"
            onAction={() => onNavigateTab('phase2')}
            illustrationType="devices"
          />
        </div>
      </Card>
    </div>
  );
};
