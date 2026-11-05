import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { DEFAULT_GRADING_RULES } from '../../services/grading';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const SettingsModule: React.FC = () => {
  const { user, addToast, resetDemoDatabase } = useAuth();
  const db = StorageService.getDB();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(db, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Greenfield_Database_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', 'Backup Exported', 'JSON database backup downloaded.');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            System Settings & Security Audit Logs
          </h1>
          <p className="text-xs text-slate-500">
            Grading policy, enterprise audit logging, database backup, and factory reset
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadBackup}
            icon={<Download className="w-4 h-4" />}
          >
            Export Backup (JSON)
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Factory Reset Seed Data
          </Button>
        </div>
      </div>

      {/* Grading Scale Configuration Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Configured Grading Policy (Dhaka & Gazipur Education Board)
            </h3>
          </div>
          <Badge variant="success" size="sm">Active Policy</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
          {DEFAULT_GRADING_RULES.map((rule) => (
            <div key={rule.grade} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">{rule.minMarks} - {rule.maxMarks} Marks</span>
              <strong className="text-lg font-bold text-slate-900 block mt-1">{rule.grade}</strong>
              <span className="text-blue-600 font-semibold text-xs">GPA {rule.gpa.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Strict Failure Policy Enforced: </strong>
            If a student fails any required subject (obtaining marks &lt; 33, grade F), the institutional result automatically sets the overall GPA to 0.00 and overall Grade to 'F'.
          </div>
        </div>
      </div>

      {/* Security Audit Trail Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Role-Based Access Control (RBAC) & Audit Log Trail
            </h3>
          </div>
          <span className="text-xs text-slate-400">Total Audit Entries: {db.auditLogs.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Timestamp</th>
                <th className="py-2.5 px-3">Operator</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Module</th>
                <th className="py-2.5 px-3 rounded-r-lg">Operation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {db.auditLogs.slice(0, 10).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 font-mono text-[11px]">
                  <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-bold font-sans text-slate-900">{log.userName}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <Badge variant="primary" size="sm">{log.userRole}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-blue-700 font-bold">{log.action}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500">{log.module}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-800">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog for Factory Reset */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Factory Reset Demonstration Data?"
        message="This will re-initialize the entire EduNexus database to the 20 demonstration students, 6 teachers, original exam results, attendance logs, and sample invoices. Any data entered during testing will be reset to factory defaults."
        confirmLabel="Reset All Data"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          resetDemoDatabase();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
