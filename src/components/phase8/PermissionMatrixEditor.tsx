import React, { useState } from 'react';
import { ShieldCheck, Lock, Check, X, ShieldAlert, Sparkles, Building2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface PermissionRow {
  key: string;
  name: string;
  category: 'Payroll' | 'Scheduling' | 'Attendance' | 'Admin';
}

export interface RoleColumn {
  key: string;
  name: string;
  code: string;
}

const PERMISSIONS: PermissionRow[] = [
  { key: 'p_payroll_execute', name: 'Execute Payroll Disbursal', category: 'Payroll' },
  { key: 'p_payroll_view', name: 'View Salary & Hourly Wage Rates', category: 'Payroll' },
  { key: 'p_shift_edit', name: 'Edit Shift Builder Schedule', category: 'Scheduling' },
  { key: 'p_overtime_approve', name: 'Approve Overtime Risk Outliers', category: 'Scheduling' },
  { key: 'p_geofence_override', name: 'Override GPS Geofence Boundary', category: 'Attendance' },
  { key: 'p_org_edit', name: 'Edit Facility Org Hierarchy', category: 'Admin' }
];

const ROLES: RoleColumn[] = [
  { key: 'role_global', name: 'Global Admin', code: 'SYS-01' },
  { key: 'role_regional', name: 'Regional Director', code: 'REG-02' },
  { key: 'role_facility', name: 'Facility Manager', code: 'FAC-03' },
  { key: 'role_lead', name: 'Shift Lead', code: 'LEAD-04' },
  { key: 'role_employee', name: 'Staff Employee', code: 'EMP-05' }
];

export const PermissionMatrixEditor: React.FC = () => {
  // Matrix state: roleKey_permissionKey -> boolean
  const [matrix, setMatrix] = useState<Record<string, boolean>>({
    'role_global_p_payroll_execute': true,
    'role_global_p_payroll_view': true,
    'role_global_p_shift_edit': true,
    'role_global_p_overtime_approve': true,
    'role_global_p_geofence_override': true,
    'role_global_p_org_edit': true,

    'role_regional_p_payroll_execute': false,
    'role_regional_p_payroll_view': true,
    'role_regional_p_shift_edit': true,
    'role_regional_p_overtime_approve': true,
    'role_regional_p_geofence_override': true,
    'role_regional_p_org_edit': false,

    'role_facility_p_payroll_execute': false,
    'role_facility_p_payroll_view': false,
    'role_facility_p_shift_edit': true,
    'role_facility_p_overtime_approve': true,
    'role_facility_p_geofence_override': false,
    'role_facility_p_org_edit': false,

    'role_lead_p_payroll_execute': false,
    'role_lead_p_payroll_view': false,
    'role_lead_p_shift_edit': true,
    'role_lead_p_overtime_approve': false,
    'role_lead_p_geofence_override': false,
    'role_lead_p_org_edit': false,

    'role_employee_p_payroll_execute': false,
    'role_employee_p_payroll_view': false,
    'role_employee_p_shift_edit': false,
    'role_employee_p_overtime_approve': false,
    'role_employee_p_geofence_override': false,
    'role_employee_p_org_edit': false
  });

  const togglePermission = (roleKey: string, permKey: string) => {
    const key = `${roleKey}_${permKey}`;
    setMatrix(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Enterprise Role-Based Access Matrix (RBAC)</h2>
            <Badge variant="accent">PROCUREMENT EVALUATION READY</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Visual Roles × Permissions grid designed specifically for enterprise procurement compliance evaluation.
          </p>
        </div>

        <Button variant="accent" size="sm">
          Save RBAC Matrix
        </Button>
      </div>

      {/* Roles x Permissions Visual Grid */}
      <Card elevation={2} className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-element-hover)] text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                <th className="py-4 px-4 w-72">Permission Capability</th>
                {ROLES.map(r => (
                  <th key={r.key} className="py-4 px-4 text-center border-l border-[var(--border-subtle)]">
                    <div className="font-bold text-[var(--text-primary)]">{r.name}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] font-mono font-normal">{r.code}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {PERMISSIONS.map(p => (
                <tr key={p.key} className="hover:bg-[var(--bg-element-hover)]/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-[var(--text-primary)] text-xs">{p.name}</div>
                    <Badge variant="neutral">{p.category}</Badge>
                  </td>

                  {ROLES.map(r => {
                    const isGranted = matrix[`${r.key}_${p.key}`];
                    return (
                      <td key={r.key} className="py-4 px-4 text-center border-l border-[var(--border-subtle)]">
                        <button
                          onClick={() => togglePermission(r.key, p.key)}
                          className={`
                            w-8 h-8 rounded-xl border flex items-center justify-center mx-auto transition-all select-none
                            ${isGranted ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-[var(--bg-canvas)] border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-accent)]'}
                          `}
                        >
                          {isGranted ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
