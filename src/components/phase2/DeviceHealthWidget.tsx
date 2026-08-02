import React, { useState } from 'react';
import { Cpu, Wifi, WifiOff, RefreshCw, AlertTriangle, CheckCircle2, Server, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface DeviceStatus {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  firmware: string;
  status: 'Online' | 'Offline' | 'Syncing';
  lastPingMs: number;
  unSyncedBufferLogs: number;
  totalPunchesToday: number;
}

const SAMPLE_DEVICES: DeviceStatus[] = [
  {
    id: 'dev-01',
    name: 'Biometric Face ID Terminal #01',
    location: 'Austin Hub — Main Intake Gate',
    ipAddress: '192.168.10.104',
    firmware: 'v4.2.8-prod',
    status: 'Online',
    lastPingMs: 240,
    unSyncedBufferLogs: 0,
    totalPunchesToday: 412
  },
  {
    id: 'dev-02',
    name: 'Touchless Palm Scanner #02',
    location: 'Austin Hub — Warehouse West',
    ipAddress: '192.168.10.108',
    firmware: 'v4.2.8-prod',
    status: 'Online',
    lastPingMs: 310,
    unSyncedBufferLogs: 0,
    totalPunchesToday: 284
  },
  {
    id: 'dev-03',
    name: 'NFC Timecard Kiosk #03',
    location: 'Dallas Facility — Dock B',
    ipAddress: '10.0.4.52',
    firmware: 'v4.1.2-legacy',
    status: 'Offline',
    lastPingMs: 84000,
    unSyncedBufferLogs: 14,
    totalPunchesToday: 156
  }
];

export const DeviceHealthWidget: React.FC = () => {
  const [devices, setDevices] = useState<DeviceStatus[]>(SAMPLE_DEVICES);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleForceSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setDevices(prev => prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            status: 'Online',
            unSyncedBufferLogs: 0,
            lastPingMs: 120
          };
        }
        return d;
      }));
      setSyncingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Biometric & Terminal Device Health Hub</h2>
            <Badge variant="accent" dot>HARDWARE PROTOCOL ACTIVE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Reduces support tickets by making device offline states and un-synced logs visually obvious.
          </p>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map(device => {
          const isOnline = device.status === 'Online';
          const isSyncing = syncingId === device.id;

          return (
            <Card key={device.id} elevation={2} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Status Indicator Bar */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      {isOnline && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </span>
                    <span className="text-xs font-bold font-mono text-[var(--text-primary)]">
                      {isSyncing ? 'SYNCING HARDWARE...' : device.status.toUpperCase()}
                    </span>
                  </div>

                  <Badge variant={isOnline ? 'success' : 'danger'}>
                    {isOnline ? 'HEARTBEAT OK' : 'HARDWARE DISCONNECTED'}
                  </Badge>
                </div>

                {/* Device Title & Meta */}
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{device.name}</h3>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{device.location}</p>
                </div>

                {/* Telemetry Details Table */}
                <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-tertiary)] font-sans">IP Address:</span>
                    <span className="font-bold text-[var(--text-primary)]">{device.ipAddress}</span>
                  </div>

                  <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                    <span className="text-[var(--text-tertiary)] font-sans">Firmware:</span>
                    <span className="text-[var(--text-secondary)]">{device.firmware}</span>
                  </div>

                  <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                    <span className="text-[var(--text-tertiary)] font-sans">Ping Latency:</span>
                    <span className={device.lastPingMs < 1000 ? 'text-emerald-500 font-bold' : 'text-rose-400 font-bold'}>
                      {device.lastPingMs}ms
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                    <span className="text-[var(--text-tertiary)] font-sans">Un-synced Offline Buffer:</span>
                    <span className={device.unSyncedBufferLogs > 0 ? 'text-amber-500 font-bold' : 'text-[var(--text-primary)]'}>
                      {device.unSyncedBufferLogs} logs
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  variant={isOnline ? 'secondary' : 'accent'}
                  className="w-full"
                  isLoading={isSyncing}
                  onClick={() => handleForceSync(device.id)}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  {isSyncing ? 'Synchronizing Logs...' : 'Force Hardware Re-sync'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
