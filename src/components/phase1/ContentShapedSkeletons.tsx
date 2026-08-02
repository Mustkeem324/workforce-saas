import React from 'react';

export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] p-4 space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-6 bg-[var(--bg-element-hover)] rounded-lg w-1/3" />

      {/* Row Skeletons */}
      <div className="space-y-3 pt-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-element-hover)] shrink-0" />
              <div className="space-y-1.5">
                <div className="h-4 bg-[var(--bg-element-hover)] rounded w-32" />
                <div className="h-3 bg-[var(--bg-element-hover)] rounded w-20" />
              </div>
            </div>
            <div className="h-4 bg-[var(--bg-element-hover)] rounded w-16" />
            <div className="h-4 bg-[var(--bg-element-hover)] rounded w-24" />
            <div className="h-6 bg-[var(--bg-element-hover)] rounded-full w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-[var(--bg-element-hover)] rounded w-24" />
        <div className="w-8 h-8 rounded-lg bg-[var(--bg-element-hover)]" />
      </div>
      <div className="h-8 bg-[var(--bg-element-hover)] rounded w-36" />
      <div className="h-3 bg-[var(--bg-element-hover)] rounded w-48" />
    </div>
  );
};
