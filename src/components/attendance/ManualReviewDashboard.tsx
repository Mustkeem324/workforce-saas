import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, User, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export interface AttendanceReviewItem {
  id: string;
  employee_id: string;
  employee_name: string;
  reason: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export const ManualReviewDashboard: React.FC = () => {
  const [reviews, setReviews] = useState<AttendanceReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/attendance/suspicious-attempts');
      const data = await res.json();
      if (data.status === 'success') {
        setReviews(data.data);
      }
    } catch (err) {
      // Fallback sample queue
      setReviews([
        {
          id: 'rev-101',
          employee_id: 'emp-104',
          employee_name: 'Taylor Reed',
          reason: 'Low-light face match score below threshold (0.68)',
          risk_level: 'MEDIUM',
          status: 'PENDING',
          created_at: new Date().toISOString()
        },
        {
          id: 'rev-102',
          employee_id: 'emp-105',
          employee_name: 'Morgan Smith',
          reason: 'High device risk: Unrecognized browser user-agent',
          risk_level: 'HIGH',
          status: 'PENDING',
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/attendance/manual-review/${id}/approve`, { method: 'POST' });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
    } catch (err) {}
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/attendance/manual-review/${id}/reject`, { method: 'POST' });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r));
    } catch (err) {}
  };

  return (
    <Card elevation={2} className="p-6 space-y-6 max-w-5xl mx-auto border-2 border-[var(--border-default)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">Biometric Manual Review Queue</h3>
            <Badge variant="warning">HR AUDIT</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Flagged attendance attempts requiring human manager authorization before payroll sync.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={fetchReviews} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Refresh Queue
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-xs text-[var(--text-tertiary)]">Loading review queue...</div>
      ) : (
        <div className="space-y-3">
          {reviews.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[var(--text-primary)]">{item.employee_name}</span>
                  <Badge variant={item.risk_level === 'HIGH' || item.risk_level === 'CRITICAL' ? 'danger' : 'warning'}>
                    RISK: {item.risk_level}
                  </Badge>
                  <Badge variant={item.status === 'APPROVED' ? 'success' : item.status === 'REJECTED' ? 'danger' : 'neutral'}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-mono">{item.reason}</p>
                <div className="text-[10px] text-[var(--text-tertiary)] font-mono">FLAGGED AT: {new Date(item.created_at).toLocaleString()}</div>
              </div>

              {item.status === 'PENDING' && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleReject(item.id)}
                    leftIcon={<XCircle className="w-4 h-4" />}
                    className="flex-1 sm:flex-none min-touch"
                  >
                    Reject Punch
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleApprove(item.id)}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    className="flex-1 sm:flex-none min-touch"
                  >
                    Authorize Attendance
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
