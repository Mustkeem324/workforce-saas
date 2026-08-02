import React, { useState } from 'react';
import { Download, CheckCircle2, ShieldCheck, RefreshCw, Archive, Database } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const OrgDataExportTool: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartExport = () => {
    setIsExporting(true);
    setExportComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Self-Serve Data Portability & Archive Exporter</h2>
            <Badge variant="accent">GDPR & ENTERPRISE PORTABILITY</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Export all organization data (attendance logs, payroll runs, employee documents) into a encrypted ZIP archive.
          </p>
        </div>
      </div>

      {/* Self-Serve Export Card */}
      <Card elevation={2} className="p-8 max-w-xl mx-auto space-y-6 border-2 border-[var(--border-accent)]/40 text-center">
        <div className="space-y-2">
          <Badge variant="neutral font-mono">COMPLETE ORG ARCHIVE</Badge>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">
            Export All Organization Data
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">
            Generates a encrypted JSON/CSV ZIP bundle containing all historical roster, attendance, and payroll records.
          </p>
        </div>

        {isExporting && (
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--accent-500)]">Bundling Org Archive...</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-[var(--bg-canvas)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <div className="bg-[var(--accent-500)] h-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {exportComplete ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <div className="font-bold text-sm">Archive Ready for Download!</div>
            <Button variant="accent" size="sm" className="w-full" leftIcon={<Download className="w-4 h-4" />}>
              Download org_export_2026-08-02.zip (14.2 MB)
            </Button>
          </div>
        ) : (
          <Button
            variant="accent"
            size="lg"
            onClick={handleStartExport}
            disabled={isExporting}
            className="w-full"
            leftIcon={<Archive className="w-5 h-5" />}
          >
            {isExporting ? 'Generating Archive...' : 'Start Self-Serve Org Export'}
          </Button>
        )}
      </Card>
    </div>
  );
};
