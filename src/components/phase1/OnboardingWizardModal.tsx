import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, User, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

export interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState(1); // 1: Org Setup, 2: Location Setup, 3: Admin Account
  const [orgName, setOrgName] = useState('Workforce Logistics Corp');
  const [locationName, setLocationName] = useState('Austin Distribution Hub');
  const [geofenceRadius, setGeofenceRadius] = useState('150m');
  const [adminName, setAdminName] = useState('Alex Rivera');
  const [adminEmail, setAdminEmail] = useState('alex.rivera@workforce-logistics.com');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-[var(--bg-surface-overlay)] border border-[var(--border-default)] rounded-3xl p-8 max-w-xl w-full shadow-[var(--shadow-4)] space-y-6 relative overflow-hidden"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[var(--accent-500)] animate-pulse" />
                <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Organization Onboarding Wizard</h2>
              </div>
              <Badge variant="accent">FIRST-IMPRESSION MOMENT</Badge>
            </div>

            {/* Animated Step Indicator Bar */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center font-bold">
              {[
                { s: 1, label: '1. Org Identity' },
                { s: 2, label: '2. First Location' },
                { s: 3, label: '3. Admin Account' }
              ].map((item) => (
                <div
                  key={item.s}
                  className={`
                    py-2 rounded-xl border transition-all text-[11px]
                    ${step === item.s 
                      ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-[var(--shadow-accent-glow)]' 
                      : step > item.s ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'}
                  `}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Animated Step Content Viewport */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    label="Organization Name"
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    leftIcon={<Building2 className="w-4 h-4" />}
                    helperText="Your company workspace identifier"
                  />

                  <div className="p-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Brand Identity Palette Preview</span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[var(--ink-950)] border border-slate-700 flex items-center justify-center text-white text-[10px] font-bold font-mono">INK</div>
                      <div className="w-8 h-8 rounded-xl bg-[var(--accent-500)] flex items-center justify-center text-white text-[10px] font-bold font-mono">WARM</div>
                      <span className="text-xs text-[var(--text-tertiary)]">Obsidian Charcoal + Copper Terracotta Token Theme</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    label="Primary Facility Location Name"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    leftIcon={<MapPin className="w-4 h-4" />}
                    helperText="First active geofenced facility"
                  />

                  <Input
                    label="Geofence GPS Radius"
                    value={geofenceRadius}
                    onChange={e => setGeofenceRadius(e.target.value)}
                    helperText="Maximum allowed punch-in boundary radius"
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    label="Super Admin Name"
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                    leftIcon={<User className="w-4 h-4" />}
                  />

                  <Input
                    label="Admin Corporate Email"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                    helperText="Receives payroll approval audit signatures"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Previous
                </Button>
              ) : <div />}

              <Button variant="accent" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                {step === 3 ? 'Launch Workspace' : 'Continue Step'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
