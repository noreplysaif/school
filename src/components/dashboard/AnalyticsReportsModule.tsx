import React from 'react';
import { StorageService } from '../../services/storage';
import { ExportService } from '../../services/exportService';
import {
  BarChart3,
  Download,
  Users,
  Award,
  DollarSign,
  Clock,
  BookOpen,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AnalyticsReportsModule: React.FC = () => {
  const db = StorageService.getDB();

  const totalCollectedFees = db.invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDueFees = db.invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Analytics & Export Reports
          </h1>
          <p className="text-xs text-slate-500">
            Export academic, attendance, and financial data into Microsoft Excel (.xlsx) and CSV
          </p>
        </div>
      </div>

      {/* Exportable Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Report 1: Student Roster */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Student Enrollment Master Roster</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Complete student dataset with IDs, birth dates, blood groups, guardian contacts, and classes.
            </p>
            <div className="mt-3 text-xs font-semibold text-slate-700">
              Total Records: {db.students.length} Students
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 justify-center"
              onClick={() => ExportService.exportStudents(db.students, 'csv')}
            >
              Export CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1 justify-center"
              onClick={() => ExportService.exportStudents(db.students, 'xlsx')}
              icon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Export Excel
            </Button>
          </div>
        </div>

        {/* Report 2: Attendance Ledger */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Classroom Attendance Log</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Daily recorded student sessions, present/absent/late timestamps, and teacher verifications.
            </p>
            <div className="mt-3 text-xs font-semibold text-slate-700">
              Recorded Days: {db.attendance.length} Sessions
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => ExportService.exportAttendance(db.attendance, db.students)}
              icon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Export Attendance (Excel)
            </Button>
          </div>
        </div>

        {/* Report 3: Examination Merit List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Examination Merit & Marks Sheet</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Subject marks breakdown, calculated GPA, final letter grades, and merit positions.
            </p>
            <div className="mt-3 text-xs font-semibold text-slate-700">
              Exam: First Term Examination 2026
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() =>
                ExportService.exportExamResults(
                  db.examResults,
                  db.examinations[0]?.name || 'Exam_Merit_List'
                )
              }
              icon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Export Merit List (Excel)
            </Button>
          </div>
        </div>

        {/* Report 4: Financial Fee Ledger */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Fee Collections & Financial Dues</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Realized payments (৳{totalCollectedFees.toLocaleString()}), outstanding balances, and bKash/Nagad transactions.
            </p>
            <div className="mt-3 text-xs font-semibold text-slate-700">
              Invoices Logged: {db.invoices.length} Vouchers
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => ExportService.exportFeeInvoices(db.invoices)}
              icon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Export Fee Ledger (Excel)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
