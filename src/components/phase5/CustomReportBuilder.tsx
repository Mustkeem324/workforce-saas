import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, BarChart3, Plus, X, Download, Sparkles, Filter, Layers, SlidersHorizontal } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface FieldItem {
  id: string;
  name: string;
  type: 'dimension' | 'metric';
}

const AVAILABLE_FIELDS: FieldItem[] = [
  { id: 'f-dept', name: 'Department', type: 'dimension' },
  { id: 'f-loc', name: 'Facility Location', type: 'dimension' },
  { id: 'f-shift', name: 'Shift Type', type: 'dimension' },
  { id: 'f-gross', name: 'Gross Pay ($)', type: 'metric' },
  { id: 'f-ot', name: 'Overtime Hours', type: 'metric' },
  { id: 'f-reg', name: 'Regular Hours', type: 'metric' },
  { id: 'f-tax', name: 'Tax Withheld ($)', type: 'metric' }
];

export const CustomReportBuilder: React.FC = () => {
  const [selectedDimensions, setSelectedDimensions] = useState<FieldItem[]>([
    { id: 'f-dept', name: 'Department', type: 'dimension' }
  ]);
  const [selectedMetrics, setSelectedMetrics] = useState<FieldItem[]>([
    { id: 'f-gross', name: 'Gross Pay ($)', type: 'metric' },
    { id: 'f-ot', name: 'Overtime Hours', type: 'metric' }
  ]);

  const toggleDimension = (field: FieldItem) => {
    if (selectedDimensions.some(d => d.id === field.id)) {
      setSelectedDimensions(prev => prev.filter(d => d.id !== field.id));
    } else {
      setSelectedDimensions(prev => [...prev, field]);
    }
  };

  const toggleMetric = (field: FieldItem) => {
    if (selectedMetrics.some(m => m.id === field.id)) {
      setSelectedMetrics(prev => prev.filter(m => m.id !== field.id));
    } else {
      setSelectedMetrics(prev => [...prev, field]);
    }
  };

  // Mock aggregated dataset generated based on active dimensions & metrics
  const mockReportData = [
    { department: 'Engineering & Tech', location: 'Austin Hub', shift: 'Morning', gross: 42850.00, ot: 14.5, reg: 320.0, tax: 8570.00 },
    { department: 'Shift Operations', location: 'Austin Hub', shift: 'Evening', gross: 38200.00, ot: 28.0, reg: 440.0, tax: 7640.00 },
    { department: 'Logistics & Warehouse', location: 'Dallas Facility', shift: 'Night', gross: 29400.00, ot: 42.5, reg: 380.0, tax: 5880.00 },
    { department: 'Quality Assurance', location: 'Dallas Facility', shift: 'Day', gross: 18600.00, ot: 0.0, reg: 240.0, tax: 3720.00 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Custom Pivot Report Builder</h2>
            <Badge variant="accent">METABASE-STYLE DRAG & BUILD</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Build lightweight custom pivot reports with live dynamic updates as fields & metrics are toggled.
          </p>
        </div>

        <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Export Report (CSV)
        </Button>
      </div>

      {/* Field Selector Palette */}
      <Card elevation={2} className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Available Schema Fields</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dimensions Palette */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--text-tertiary)] block">DIMENSIONS (GROUP BY)</span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_FIELDS.filter(f => f.type === 'dimension').map(f => {
                const isActive = selectedDimensions.some(d => d.id === f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleDimension(f)}
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5
                      ${isActive ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-sm' : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                    `}
                  >
                    <span>{f.name}</span>
                    {isActive ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metrics Palette */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--text-tertiary)] block">METRICS (AGGREGATE)</span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_FIELDS.filter(f => f.type === 'metric').map(f => {
                const isActive = selectedMetrics.some(m => m.id === f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleMetric(f)}
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5
                      ${isActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                    `}
                  >
                    <span>{f.name}</span>
                    {isActive ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Live Dynamic Preview Table & Chart */}
      <Card elevation={2} className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[var(--accent-500)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Pivot Results Preview</h3>
          </div>
          <Badge variant="success">REAL-TIME QUERY ENGINE</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                {selectedDimensions.map(d => (
                  <th key={d.id} className="py-3 px-4">{d.name}</th>
                ))}
                {selectedMetrics.map(m => (
                  <th key={m.id} className="py-3 px-4 text-right">{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono tabular-nums">
              {mockReportData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-element-hover)]/70 transition-colors">
                  {selectedDimensions.some(d => d.id === 'f-dept') && <td className="py-3.5 px-4 font-sans font-bold text-[var(--text-primary)]">{row.department}</td>}
                  {selectedDimensions.some(d => d.id === 'f-loc') && <td className="py-3.5 px-4 font-sans text-[var(--text-secondary)]">{row.location}</td>}
                  {selectedDimensions.some(d => d.id === 'f-shift') && <td className="py-3.5 px-4 font-sans text-[var(--text-tertiary)]">{row.shift}</td>}

                  {selectedMetrics.some(m => m.id === 'f-gross') && <td className="py-3.5 px-4 text-right font-bold text-emerald-400">${row.gross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>}
                  {selectedMetrics.some(m => m.id === 'f-ot') && <td className="py-3.5 px-4 text-right font-bold text-[var(--warning-text)]">{row.ot.toFixed(1)} hrs</td>}
                  {selectedMetrics.some(m => m.id === 'f-reg') && <td className="py-3.5 px-4 text-right text-[var(--text-secondary)]">{row.reg.toFixed(1)} hrs</td>}
                  {selectedMetrics.some(m => m.id === 'f-tax') && <td className="py-3.5 px-4 text-right text-[var(--text-tertiary)]">${row.tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
