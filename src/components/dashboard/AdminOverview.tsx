import React from 'react';
import { StorageService } from '../../services/storage';
import {
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  UserCheck,
  Award,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const AdminOverview: React.FC = () => {
  const db = StorageService.getDB();

  // Calculated statistics from real records
  const totalStudents = db.students.length;
  const totalTeachers = db.teachers.length;
  const totalAdmissionsPending = db.admissions.filter((a) => a.status === 'pending').length;
  const totalClasses = db.classes.length;

  const totalCollectedFees = db.invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDueFees = db.invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);

  // Enrollment by Class Data
  const enrollmentData = db.classes.map((c) => ({
    name: c.name,
    students: db.students.filter((s) => s.classId === c.id).length,
  }));

  // Fee collection pie data
  const feePieData = [
    { name: 'Collected Fees', value: totalCollectedFees, color: '#2563EB' },
    { name: 'Outstanding Dues', value: totalDueFees, color: '#EF4444' },
  ];

  // Attendance trend data
  const attendanceTrend = [
    { day: 'Sun', rate: 95 },
    { day: 'Mon', rate: 94 },
    { day: 'Tue', rate: 98 },
    { day: 'Wed', rate: 92 },
    { day: 'Thu', rate: 96 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Welcome & KPI row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Administration Command
          </h1>
          <p className="text-xs text-slate-500">
            Real-time telemetry and calculated records for Greenfield Model School & College
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm">
            Database Synced (Demo Persistent)
          </Badge>
          <span className="text-xs text-slate-400 font-mono">Session: 2026</span>
        </div>
      </div>

      {/* 4 Primary KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Total Enrolled Students
            </span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              {totalStudents}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>100% Active Enrollment</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Active Faculty Members
            </span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              {totalTeachers}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-blue-600 mt-1">
              <span>Across 12 Subject Depts</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Total Fees Collected (BDT)
            </span>
            <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
              ৳{totalCollectedFees.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <span>Outstanding: ৳{totalDueFees.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Pending Admissions
            </span>
            <span className="text-2xl font-extrabold text-amber-600 mt-1 block">
              {totalAdmissionsPending}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-1">
              <span>Awaiting Document Review</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Enrollment per Class */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Class Enrollment Distribution</h3>
              <p className="text-xs text-slate-500">Student count across Classes 6 to 10</p>
            </div>
            <Badge variant="primary" size="sm">Academic Year 2026</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="students" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Fee Collections vs Dues Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Fee Financial Breakdown</h3>
              <p className="text-xs text-slate-500">BDT (৳) Realization vs Pending</p>
            </div>
            <Badge variant="success" size="sm">BDT Standard</Badge>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => `৳${Number(val).toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Realized</span>
                <strong className="text-slate-800">৳{totalCollectedFees.toLocaleString()}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Outstanding</span>
                <strong className="text-slate-800">৳{totalDueFees.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Audit Trail Log & Quick Shortcuts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Recent Enterprise Audit Activity Log</h3>
          </div>
          <span className="text-xs text-slate-400">Security Trace Verified</span>
        </div>

        <div className="space-y-2.5">
          {db.auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <Badge variant="primary" size="sm">{log.module}</Badge>
                <div>
                  <span className="font-bold text-slate-900">{log.userName}</span>
                  <span className="text-slate-500 ml-1.5 font-normal">{log.details}</span>
                </div>
              </div>
              <span className="text-slate-400 font-mono text-[11px] shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
