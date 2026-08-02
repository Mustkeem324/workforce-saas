import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye, Filter, ArrowUpDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface MobileDataRow {
  id: string;
  primaryTitle: string;
  secondarySubtitle: string;
  badgeLabel: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
  detailFields: { label: string; value: string }[];
}

export interface MobileStackedDataListProps {
  title: string;
  rows: MobileDataRow[];
}

export const MobileStackedDataList: React.FC<MobileStackedDataListProps> = ({
  title,
  rows
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Sticky Top Filter & Sort Bar */}
      <div className="sticky top-14 z-20 bg-[var(--bg-surface-raised)]/95 backdrop-blur-md border border-[var(--border-subtle)] p-3 rounded-2xl flex items-center justify-between shadow-xs">
        <span className="font-bold text-xs text-[var(--text-primary)]">{title} ({rows.length})</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="min-touch text-xs" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Stacked Cards List */}
      <div className="space-y-3">
        {rows.map(row => {
          const isExpanded = expandedId === row.id;
          return (
            <Card key={row.id} elevation={1} className="p-4 space-y-3">
              {/* Primary 2-3 Fields */}
              <div 
                onClick={() => toggleExpand(row.id)}
                className="flex items-center justify-between cursor-pointer select-none min-touch"
              >
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--text-primary)]">{row.primaryTitle}</h4>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono mt-0.5">{row.secondarySubtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={row.badgeVariant || 'neutral'}>{row.badgeLabel}</Badge>
                  <button className="text-[var(--text-tertiary)] p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Details Tray */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-[var(--border-subtle)] space-y-2 text-xs font-mono tabular-nums"
                  >
                    {row.detailFields.map((df, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-[var(--bg-canvas)]">
                        <span className="font-sans text-[var(--text-tertiary)]">{df.label}:</span>
                        <span className="font-bold text-[var(--text-primary)]">{df.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
