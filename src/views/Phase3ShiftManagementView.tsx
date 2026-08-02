import React, { useState } from 'react';
import { Calendar, Bot, RefreshCw, AlertTriangle } from 'lucide-react';
import { DragDropShiftCalendar } from '../components/phase3/DragDropShiftCalendar';
import { AISuggestionOverlay } from '../components/phase3/AISuggestionOverlay';
import { ShiftSwapApprovalQueue } from '../components/phase3/ShiftSwapApprovalQueue';
import { MobileShiftCalendar } from '../components/mobile/MobileShiftCalendar';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export const Phase3ShiftManagementView: React.FC = () => {
  const [isAiOverlayActive, setIsAiOverlayActive] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Brief */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">SHIFT MANAGEMENT ENGINE</Badge>
            <span className="text-xs text-[var(--text-tertiary)] font-mono font-bold">ROSTER BUILDER & AI CONFLICT DETECTION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">Shift Builder & Smart Roster</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Week/day calendar with real-time inline conflict detection (overtime & rest warnings during drag), ghost AI suggestion overlay, and swipeable shift swaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isAiOverlayActive ? 'accent' : 'outline'}
            size="sm"
            onClick={() => setIsAiOverlayActive(!isAiOverlayActive)}
            leftIcon={<Bot className="w-4 h-4" />}
          >
            {isAiOverlayActive ? 'Disable AI Roster Ghosting' : 'Enable AI Roster Ghost Preview'}
          </Button>
        </div>
      </div>

      {/* Mobile Shift Builder View for Phone screens (<640px) */}
      <div className="block md:hidden">
        <Card elevation={2} className="p-4 space-y-3 mb-4 border-l-4 border-l-[var(--accent-500)]">
          <div className="text-xs font-bold text-[var(--accent-500)] font-mono uppercase">MOBILE SHIFT ROSTER</div>
          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">Day-by-Day Tap-to-Assign Roster</h3>
        </Card>
        <MobileShiftCalendar />
      </div>

      {/* Main Drag-and-Drop Roster Grid with Inline Conflict Warnings (Desktop/Tablet) */}
      <div className="hidden md:block">
        <DragDropShiftCalendar />
      </div>

      {/* AI Suggestion Ghost Overlay Drawer */}
      <AISuggestionOverlay
        isOpen={isAiOverlayActive}
        onClose={() => setIsAiOverlayActive(false)}
        onApplySuggestions={() => setIsAiOverlayActive(false)}
      />

      {/* Swipeable Shift Swap Card Queue */}
      <ShiftSwapApprovalQueue />
    </div>
  );
};
