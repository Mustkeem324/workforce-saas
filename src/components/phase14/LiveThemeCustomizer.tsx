import React, { useState } from 'react';
import { Palette, Eye, Upload, Check, RefreshCw, Sparkles, Building2, Globe } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const LiveThemeCustomizer: React.FC = () => {
  const [brandName, setBrandName] = useState('Apex Logistics Fleet');
  const [customDomain, setCustomDomain] = useState('admin.apex-logistics.com');
  const [primaryInk, setPrimaryInk] = useState('#0B0F19');
  const [accentColor, setAccentColor] = useState('#E05A47');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const presetAccents = ['#E05A47', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  const presetInks = ['#0B0F19', '#062C1B', '#0A192F', '#18181B'];

  const handleSaveTheme = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">White-Label Live Theme & Branding Customizer</h2>
            <Badge variant="accent">RESELLER & FRANCHISE GROWTH LEVER</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Instantly re-skin the admin console preview pane with custom logo, primary ink, and accent colors.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={handleSaveTheme}
          leftIcon={savedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        >
          {savedSuccess ? 'Theme Saved & Applied!' : 'Publish Custom Theme'}
        </Button>
      </div>

      {/* Grid: Left Customizer Controls, Right Live Preview Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Branding Controls */}
        <Card elevation={2} className="space-y-6">
          <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
            Tenant Identity & Color Palette
          </h3>

          <div className="space-y-4">
            <Input
              label="Reseller / Tenant Brand Name"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              leftIcon={<Building2 className="w-4 h-4" />}
            />

            <Input
              label="Custom CNAME Domain Binding"
              value={customDomain}
              onChange={e => setCustomDomain(e.target.value)}
              leftIcon={<Globe className="w-4 h-4" />}
              helperText="SSL auto-provisioned via Let's Encrypt"
            />

            {/* Accent Color Picker */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] block">Brand Primary Accent Color</span>
              <div className="flex items-center gap-2">
                {presetAccents.map(color => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`
                      w-8 h-8 rounded-xl transition-all border-2
                      ${accentColor === color ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={accentColor}
                  onChange={e => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded-xl bg-transparent border-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Primary Ink Color Picker */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] block">Admin Canvas Ink Theme</span>
              <div className="flex items-center gap-2">
                {presetInks.map(color => (
                  <button
                    key={color}
                    onClick={() => setPrimaryInk(color)}
                    className={`
                      w-8 h-8 rounded-xl transition-all border-2
                      ${primaryInk === color ? 'scale-110 border-[var(--accent-500)] shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column: Live Admin Re-Skin Preview Pane */}
        <Card elevation={2} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--accent-500)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Real-Time Admin Console Preview Pane</h3>
            </div>
            <Badge variant="neutral font-mono">{customDomain}</Badge>
          </div>

          {/* Mini Live Preview Window Styled with User Selected Colors! */}
          <div
            className="p-5 rounded-2xl border text-white space-y-4 transition-colors duration-200"
            style={{ backgroundColor: primaryInk, borderColor: `${accentColor}40` }}
          >
            {/* Mini Header */}
            <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: `${accentColor}30` }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  {brandName.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-extrabold text-xs">{brandName}</span>
              </div>
              <span className="text-[10px] font-mono opacity-80" style={{ color: accentColor }}>WHITE-LABEL ACTIVE</span>
            </div>

            {/* Mini Dashboard Widget */}
            <div className="p-4 rounded-xl space-y-2 text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${accentColor}30` }}>
              <div className="flex justify-between">
                <span className="opacity-80">Active Roster punches:</span>
                <span className="font-bold font-mono text-emerald-400">184 On-Shift</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Primary Accent:</span>
                <span className="font-mono font-bold" style={{ color: accentColor }}>{accentColor}</span>
              </div>
            </div>

            <button
              className="w-full py-2 rounded-xl text-xs font-bold text-white transition-opacity shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              Custom Styled Action Button
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
