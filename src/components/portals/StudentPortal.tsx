import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { StorageService } from '../../services/storage';
import { PdfService } from '../../services/pdfService';
import {
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  BookOpen,
  DollarSign,
  Award,
  Bell,
  Upload,
  FileCheck,
  CreditCard,
  FileText,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const StudentPortal: React.FC = () => {
  const { user, addToast } = useAuth();
  const db = StorageService.getDB();

  // Student resolution: active user relatedId or default STU-2026-001
  const studentId = user?.relatedId || 'STU-2026-001';
  const student = db.students.find((s) => s.id === studentId) || db.students[0];

  // Modules active tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'attendance'
    | 'results'
    | 'routine'
    | 'homework'
    | 'fees'
    | 'notices'
    | 'certificates'
  >('overview');

  // Student specific data
  const studentResults = db.examResults.filter(
    (r) => r.studentId === student.id && r.published
  );
  const latestResult = studentResults[0];

  const studentInvoices = db.invoices.filter((i) => i.studentId === student.id);
  const studentHomeworks = db.homeworks.filter(
    (h) => h.classId === student.classId
  );
  const routines = db.routines[student.classId] || [];

  // Homework submission modal state
  const [submitHwModal, setSubmitHwModal] = useState<any | null>(null);
  const [hwSubmissionText, setHwSubmissionText] = useState('');

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitHwModal || !hwSubmissionText.trim()) return;

    const homework = db.homeworks.find((h) => h.id === submitHwModal.id);
    if (homework) {
      const existingIdx = homework.submissions.findIndex(
        (s) => s.studentId === student.id
      );
      const newSubmission = {
        studentId: student.id,
        studentName: student.name,
        submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        content: hwSubmissionText.trim(),
        attachmentName: `${student.name.replace(/\s+/g, '_')}_HW_File.pdf`,
        status: 'submitted' as const,
      };

      if (existingIdx >= 0) {
        homework.submissions[existingIdx] = newSubmission;
      } else {
        homework.submissions.push(newSubmission);
      }

      StorageService.saveHomework(homework);
      StorageService.logAction(
        student.name,
        'student',
        'SUBMIT_HOMEWORK',
        'Homework',
        `Submitted assignment for ${homework.title}`
      );
      addToast('success', 'Homework Submitted', 'Your assignment has been recorded for teacher evaluation.');
    }

    setSubmitHwModal(null);
    setHwSubmissionText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Student Profile Hero Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
                  STUDENT PORTAL
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {student.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Class {student.classId} • Section: {student.section} • Roll Number: {student.roll} • Session 2026
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => PdfService.generateStudentIdCard(student)}
              icon={<Download className="w-4 h-4" />}
              className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700"
            >
              Download ID Card
            </Button>
            {latestResult && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => PdfService.generateReportCard(latestResult, student)}
                icon={<Award className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/30"
              >
                Latest Report Card (PDF)
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: GraduationCap },
            { id: 'attendance', label: 'My Attendance', icon: Clock },
            { id: 'results', label: 'Exam Results', icon: Award },
            { id: 'routine', label: 'Class Routine', icon: Calendar },
            { id: 'homework', label: 'Homework & Tasks', icon: BookOpen },
            { id: 'fees', label: 'Fee Records', icon: DollarSign },
            { id: 'certificates', label: 'Certificates', icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-400 block">Attendance Rate</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-slate-900">{student.attendanceRate ?? 96.5}%</span>
                  <Badge variant="success" size="sm">Regular</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Total recorded sessions in session 2026</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-400 block">Latest Exam GPA</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {latestResult ? `${latestResult.gpa.toFixed(2)}` : '5.00'}
                  </span>
                  <Badge variant="primary" size="sm">
                    {latestResult ? latestResult.grade : 'A+'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">First Term Examination 2026</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-400 block">Merit Position</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {latestResult?.meritPosition ? `#${latestResult.meritPosition}` : '#1'}
                  </span>
                  <Badge variant="warning" size="sm">Class Top</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Class 10 Science cohort</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-400 block">Pending Homework</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-amber-600">
                    {studentHomeworks.length}
                  </span>
                  <Badge variant="neutral" size="sm">Active</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Due within this week</p>
              </div>
            </div>

            {/* Quick Profile Bio & Next Classes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Profile Details */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Student Bio & Guardian Details
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Date of Birth:</span>
                    <strong className="text-slate-800">{student.dob}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Blood Group:</span>
                    <strong className="text-rose-600 font-bold">{student.bloodGroup}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Guardian Name:</span>
                    <strong className="text-slate-800">{student.guardianName}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Guardian Contact:</span>
                    <strong className="text-slate-800">{student.guardianPhone}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Residential Address:</span>
                    <span className="text-slate-700 text-right max-w-[200px] truncate">{student.address}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Admission Date:</span>
                    <strong className="text-slate-800">{student.admissionDate}</strong>
                  </div>
                </div>
              </div>

              {/* Today's Routine Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Today's Class Schedule (Sunday)
                  </h3>
                  <button
                    onClick={() => setActiveTab('routine')}
                    className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    Full Routine →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {routines.slice(0, 4).map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[11px]">
                          {slot.time}
                        </span>
                        <div>
                          <strong className="text-slate-900 block text-xs">{slot.subject}</strong>
                          <span className="text-slate-400 text-[11px]">{slot.teacherName}</span>
                        </div>
                      </div>
                      <Badge variant="neutral" size="sm">{slot.room}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Log & History</h3>
                <p className="text-xs text-slate-500">Official daily biometric and classroom attendance record</p>
              </div>
              <Badge variant="success" size="md">Overall Attendance: {student.attendanceRate ?? 96.5}%</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Date</th>
                    <th className="py-3 px-4">Class & Section</th>
                    <th className="py-3 px-4">Attendance Status</th>
                    <th className="py-3 px-4 rounded-r-lg">Authorized By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {db.attendance
                    .filter((a) => a.classId === student.classId && a.records[student.id])
                    .map((a) => {
                      const status = a.records[student.id];
                      return (
                        <tr key={a.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-mono font-medium text-slate-900">{a.date}</td>
                          <td className="py-3 px-4">Class {a.classId} ({a.section})</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                status === 'present'
                                  ? 'success'
                                  : status === 'late'
                                  ? 'warning'
                                  : status === 'leave'
                                  ? 'info'
                                  : 'danger'
                              }
                              size="sm"
                            >
                              {status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{a.markedBy}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Exam Results */}
        {activeTab === 'results' && (
          <div className="space-y-6 animate-in fade-in">
            {studentResults.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Published Examination Results Yet</h3>
                <p className="text-xs text-slate-500 mt-1">Results will appear here once approved by the examination controller.</p>
              </div>
            ) : (
              studentResults.map((res) => (
                <div
                  key={res.examId}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{res.examName}</span>
                      <h3 className="text-xl font-bold mt-1">Official Academic Transcript</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Class {res.classId} ({res.section}) • Roll {res.roll}</p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => PdfService.generateReportCard(res, student)}
                      icon={<Download className="w-4 h-4" />}
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Download Report Card (PDF)
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 border-b border-slate-200 text-center">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Marks</span>
                      <strong className="text-base font-bold text-slate-900">{res.totalMarks} / {res.totalFullMarks}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">GPA</span>
                      <strong className="text-base font-bold text-blue-600">{res.gpa.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Letter Grade</span>
                      <strong className="text-base font-bold text-emerald-600">{res.grade}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Merit Position</span>
                      <strong className="text-base font-bold text-purple-600">
                        {res.meritPosition ? `#${res.meritPosition}` : 'N/A'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Marks Breakdown</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                          <tr>
                            <th className="py-2.5 px-3 rounded-l-lg">Subject</th>
                            <th className="py-2.5 px-3">Full Marks</th>
                            <th className="py-2.5 px-3">Pass Marks</th>
                            <th className="py-2.5 px-3">Marks Obtained</th>
                            <th className="py-2.5 px-3">Letter Grade</th>
                            <th className="py-2.5 px-3 rounded-r-lg">GPA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {res.subjectMarks.map((sm) => (
                            <tr key={sm.subject}>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{sm.subject}</td>
                              <td className="py-2.5 px-3 text-slate-500">{sm.fullMarks}</td>
                              <td className="py-2.5 px-3 text-slate-500">{sm.passMarks}</td>
                              <td className="py-2.5 px-3 font-bold text-slate-900">{sm.marks}</td>
                              <td className="py-2.5 px-3 font-semibold text-emerald-600">{sm.grade}</td>
                              <td className="py-2.5 px-3 font-semibold text-blue-600">{sm.gpa.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Routine */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Class Routine (Class {student.classId})</h3>
              <p className="text-xs text-slate-500">Weekly class periods, assigned faculty, and laboratory rooms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routines.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                      {slot.day} • {slot.time}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{slot.subject}</h4>
                    <p className="text-xs text-slate-500">{slot.teacherName}</p>
                  </div>
                  <Badge variant="primary" size="sm">{slot.room}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Homework */}
        {activeTab === 'homework' && (
          <div className="space-y-4 animate-in fade-in">
            {studentHomeworks.map((hw) => {
              const mySubmission = hw.submissions.find((s) => s.studentId === student.id);
              return (
                <div
                  key={hw.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="primary" size="sm">{hw.subject}</Badge>
                      <span className="text-xs text-slate-400">Due: {hw.dueDate}</span>
                      {mySubmission ? (
                        <Badge variant="success" size="sm">
                          {mySubmission.status === 'graded' ? `Graded: ${mySubmission.marks}/100` : 'Submitted'}
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm">Pending Submission</Badge>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{hw.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{hw.description}</p>
                    <p className="text-[11px] text-slate-400">Assigned by: {hw.teacherName}</p>
                  </div>

                  <div className="shrink-0">
                    <Button
                      variant={mySubmission ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => {
                        setSubmitHwModal(hw);
                        setHwSubmissionText(mySubmission?.content || '');
                      }}
                      icon={<Upload className="w-4 h-4" />}
                    >
                      {mySubmission ? 'Edit Submission' : 'Submit Assignment'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 6: Fees */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fee Invoices & Money Receipts</h3>
                <p className="text-xs text-slate-500">Download authenticated fee receipts in BDT (৳)</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Invoice ID</th>
                    <th className="py-3 px-4">Fee Particulars</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Paid Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 rounded-r-lg">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {studentInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">{inv.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{inv.title}</td>
                      <td className="py-3 px-4">৳{inv.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">৳{inv.paidAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            inv.status === 'Paid'
                              ? 'success'
                              : inv.status === 'Partially Paid'
                              ? 'warning'
                              : 'danger'
                          }
                          size="sm"
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => PdfService.generateFeeReceipt(inv, student)}
                          icon={<Download className="w-3.5 h-3.5" />}
                        >
                          Receipt PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: Certificates */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Student Certificates Generator</h3>
              <p className="text-xs text-slate-500">Instantly generate and download signed institutional certificates</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <Award className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Character Certificate</h4>
                  <p className="text-xs text-slate-500 mt-1">Official certificate of character and moral conduct for session 2026.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => PdfService.generateCertificate('character', student)}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <FileCheck className="w-8 h-8 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Enrollment Certificate</h4>
                  <p className="text-xs text-slate-500 mt-1">Proof of active student bonafide enrollment in Class {student.classId}.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => PdfService.generateCertificate('enrollment', student)}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <GraduationCap className="w-8 h-8 text-amber-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Digital Student ID Card</h4>
                  <p className="text-xs text-slate-500 mt-1">Official printable photo identity card (Standard CR80 size).</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => PdfService.generateStudentIdCard(student)}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download ID PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Homework Submission Modal */}
        {submitHwModal && (
          <Modal
            isOpen={!!submitHwModal}
            onClose={() => setSubmitHwModal(null)}
            title={`Submit Assignment: ${submitHwModal.title}`}
            subtitle={`Subject: ${submitHwModal.subject} • Due: ${submitHwModal.dueDate}`}
          >
            <form onSubmit={handleHomeworkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Submission Notes / Text Solution
                </label>
                <textarea
                  rows={4}
                  required
                  value={hwSubmissionText}
                  onChange={(e) => setHwSubmissionText(e.target.value)}
                  placeholder="Explain your answers, equations, or submission reference..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <span className="font-bold block mb-0.5">Attached Digital File:</span>
                <span className="font-mono">{student.name.replace(/\s+/g, '_')}_HW_File.pdf (Simulated Upload)</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" size="md" onClick={() => setSubmitHwModal(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" icon={<Upload className="w-4 h-4" />}>
                  Confirm & Submit to Teacher
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};
