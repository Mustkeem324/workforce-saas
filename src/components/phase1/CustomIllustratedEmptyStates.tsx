import React from 'react';
import { Calendar, Plus, ShieldCheck, Users, Radio, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export interface EmptyStateProps {
  title: string;
  description: string;
  ctaText: string;
  onAction: () => void;
  illustrationType?: 'shifts' | 'devices' | 'approvals';
}

export const CustomIllustratedEmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  ctaText,
  onAction,
  illustrationType = 'shifts'
}) => {
  return (
    <div className="p-8 md:p-12 rounded-3xl border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-canvas)] flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
      {/* Custom Vector Art Illustration Container */}
      <div className="w-20 h-20 rounded-3xl bg-[var(--accent-50)] dark:bg-[rgba(224,90,71,0.15)] text-[var(--accent-500)] flex items-center justify-center shadow-[var(--shadow-accent-glow)] relative">
        {illustrationType === 'shifts' && <Calendar className="w-10 h-10" />}
        {illustrationType === 'devices' && <Radio className="w-10 h-10" />}
        {illustrationType === 'approvals' && <ShieldCheck className="w-10 h-10" />}
        <Sparkles className="w-4 h-4 text-[var(--accent-400)] absolute -top-1 -right-1 animate-bounce" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-[var(--text-primary)]">{title}</h3>
        <p className="text-xs text-[var(--text-tertiary)] max-w-xs leading-relaxed">{description}</p>
      </div>

      <div className="pt-2">
        <Button variant="accent" size="sm" onClick={onAction} leftIcon={<Plus className="w-4 h-4" />}>
          {ctaText}
        </Button>
      </div>
    </div>
  );
};
