import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { StorageService } from '../../services/storage';
import { PdfService } from '../../services/pdfService';
import {
  Users,
  User,
  GraduationCap,
  Calendar,
  Clock,
  DollarSign,
  Award,
  Bell,
  MessageSquare,
  Download,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const ParentPortal: React.FC = () => {
  const { user, addToast } = useAuth();
  const db = StorageService.getDB();

  // Multi-child link: Arif Hossain (STU-2026-001) & Samiul Islam (STU-2026-003)
  const childIds = user?.studentIds && user.studentIds.length > 0
    ? user.studentIds
    : ['STU-2026-001', 'STU-2026-003'];

  const [selectedChildId, setSelectedChildId] = useState<string>(childIds[0]);
  const currentChild = db.students.find((s) => s.id === selectedChildId) || db.students[0];

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'results' | 'fees' | 'communication'>('overview');

  // Child specific data
  const childResults = db.examResults.filter((r) => r.studentId === currentChild.id && r.published);
  const latestResult = childResults[0];
  const childInvoices = db.invoices.filter((i) => i.studentId === currentChild.id);
  const childAttendance = db.attendance.filter(
    (a) => a.classId === currentChild.classId && a.records[currentChild.id]
  );

  // Communication message state
  const [commSubject, setCommSubject] = useState('Academic Consultation');
  const [commTeacher, setCommTeacher] = useState('Rahim Ahmed (Mathematics)');
  const [commMessage, setCommMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<any[]>([
    {
      id: 'MSG-01',
      date: '2026-03-02',
      teacher: 'Rahim Ahmed (Mathematics)',
      subject: 'Mathematics Progress Inquiry',
      reply: 'Arif is performing exceptionally well in calculus and polynomial equations. Keep encouraging his Olympiad interest.',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commMessage.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      teacher: commTeacher,
      subject: commSubject,
      reply: 'Message sent to teacher. Expected response within 24 hours.',
    };

    setSentMessages([newMsg, ...sentMessages]);
    StorageService.logAction(
      user?.name || 'Parent',
      'parent',
      'PARENT_TEACHER_COMMUNICATION',
      'Communication',
      `Sent consultation message to ${commTeacher} regarding student ${currentChild.name}`
    );
    addToast('success', 'Message Sent to Teacher', `Your consultation request was delivered to ${commTeacher}`);
    setCommMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Parent Portal Header Card with Child Selector */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
              PARENT MONITORING PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Welcome, {user?.name || 'Md. Kamal Hossain'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Active Guardian of {childIds.length} enrolled students at Greenfield Model School & College
            </p>
          </div>

          {/* Child Switcher Dropdown */}
          <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-2xl flex items-center gap-3">
            <Users className="w-5 h-5 text-sky-400" />
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Child to Monitor
              </label>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-0.5 cursor-pointer"
              >
                {childIds.map((cid) => {
                  const ch = db.students.find((s) => s.id === cid);
                  return (
                    <option key={cid} value={cid}>
                      {ch?.name} (Class {ch?.classId} {ch?.section} • Roll {ch?.roll})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Child Quick Glance Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentChild.photoUrl}
              alt={currentChild.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">{currentChild.name}</h3>
                <Badge variant="primary" size="sm">{currentChild.id}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Class {currentChild.classId} ({currentChild.section}) • Roll: {currentChild.roll} • Blood Group: {currentChild.bloodGroup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => PdfService.generateStudentIdCard(currentChild)}
              icon={<Download className="w-4 h-4" />}
            >
              Student ID Card (PDF)
            </Button>
            {latestResult && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => PdfService.generateReportCard(latestResult, currentChild)}
                icon={<Award className="w-4 h-4" />}
              >
                Official Report Card (PDF)
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Academic Overview', icon: GraduationCap },
            { id: 'attendance', label: 'Attendance Monitor', icon: Clock },
            { id: 'results', label: 'Examination Results', icon: Award },
            { id: 'fees', label: 'Fees & Payment Records', icon: DollarSign },
            { id: 'communication', label: 'Teacher Consultation', icon: MessageSquare },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-400 block font-semibold">Attendance Rate</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-slate-900">{currentChild.attendanceRate ?? 95}%</span>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Classroom attendance</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-400 block font-semibold">Latest GPA</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {latestResult ? latestResult.gpa.toFixed(2) : '5.00'}
                  </span>
                  <Badge variant="primary" size="sm">
                    {latestResult ? latestResult.grade : 'A+'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">First Term Examination 2026</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-400 block font-semibold">Class Position</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {latestResult?.meritPosition ? `#${latestResult.meritPosition}` : '#1'}
                  </span>
                  <Badge variant="warning" size="sm">Top Merit</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Official section merit</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-400 block font-semibold">Outstanding Fees</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-slate-900">
                    ৳{childInvoices.reduce((acc, curr) => acc + curr.dueAmount, 0).toLocaleString()}
                  </span>
                  <Badge variant={childInvoices.some((i) => i.dueAmount > 0) ? 'warning' : 'success'} size="sm">
                    {childInvoices.some((i) => i.dueAmount > 0) ? 'Due Pending' : 'Cleared'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Total pending institutional dues</p>
              </div>
            </div>

            {/* School Notice preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                Latest Parent Circulars
              </h3>
              <div className="space-y-3">
                {db.notices.slice(0, 2).map((n) => (
                  <div key={n.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge variant="primary" size="sm">{n.category}</Badge>
                      <span className="text-[11px] text-slate-400">{n.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Attendance Log: {currentChild.name}</h3>
                <p className="text-xs text-slate-500">Monitor daily arrival times and approved leaves</p>
              </div>
              <Badge variant="success" size="md">Attendance: {currentChild.attendanceRate ?? 95}%</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Date</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Recorded Status</th>
                    <th className="py-3 px-4 rounded-r-lg">Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {childAttendance.map((a) => {
                    const status = a.records[currentChild.id];
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

        {/* Tab 3: Results */}
        {activeTab === 'results' && (
          <div className="space-y-6 animate-in fade-in">
            {childResults.map((res) => (
              <div key={res.examId} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{res.examName}</span>
                    <h3 className="text-xl font-bold mt-1">Official Result: {currentChild.name}</h3>
                    <p className="text-xs text-slate-300">GPA: {res.gpa.toFixed(2)} • Grade: {res.grade} • Merit Rank: #{res.meritPosition ?? 'N/A'}</p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => PdfService.generateReportCard(res, currentChild)}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download Transcript (PDF)
                  </Button>
                </div>

                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 rounded-l-lg">Subject</th>
                          <th className="py-2.5 px-3">Full Marks</th>
                          <th className="py-2.5 px-3">Marks Obtained</th>
                          <th className="py-2.5 px-3">Grade</th>
                          <th className="py-2.5 px-3 rounded-r-lg">GPA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {res.subjectMarks.map((sm) => (
                          <tr key={sm.subject}>
                            <td className="py-2.5 px-3 font-semibold text-slate-900">{sm.subject}</td>
                            <td className="py-2.5 px-3 text-slate-500">{sm.fullMarks}</td>
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
            ))}
          </div>
        )}

        {/* Tab 4: Fees */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Fee Invoices & Digital Receipts</h3>
              <p className="text-xs text-slate-500">Official fee ledger for {currentChild.name}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Invoice ID</th>
                    <th className="py-3 px-4">Fee Details</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Paid</th>
                    <th className="py-3 px-4">Due Balance</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 rounded-r-lg">PDF Voucher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {childInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">{inv.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{inv.title}</td>
                      <td className="py-3 px-4">৳{inv.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">৳{inv.paidAmount.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-rose-600">৳{inv.dueAmount.toLocaleString()}</td>
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
                          onClick={() => PdfService.generateFeeReceipt(inv, currentChild)}
                          icon={<Download className="w-3.5 h-3.5" />}
                        >
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Teacher Consultation */}
        {activeTab === 'communication' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
            {/* Consultation Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Direct Teacher Consultation
              </h3>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Faculty</label>
                  <select
                    value={commTeacher}
                    onChange={(e) => setCommTeacher(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  >
                    {db.teachers.map((t) => (
                      <option key={t.id} value={`${t.name} (${t.subject})`}>
                        {t.name} ({t.subject} Department)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject of Inquiry</label>
                  <input
                    type="text"
                    required
                    value={commSubject}
                    onChange={(e) => setCommSubject(e.target.value)}
                    placeholder="e.g. Science Olympiad Preparation"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message to Teacher</label>
                  <textarea
                    rows={4}
                    required
                    value={commMessage}
                    onChange={(e) => setCommMessage(e.target.value)}
                    placeholder={`Write your inquiry regarding ${currentChild.name}...`}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                  Dispatch Consultation Message
                </Button>
              </form>
            </div>

            {/* Conversation History */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Consultation History & Teacher Feedback
              </h3>

              <div className="space-y-3">
                {sentMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{msg.teacher}</span>
                      <span className="text-slate-400">{msg.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-blue-700">{msg.subject}</p>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong>Teacher Response: </strong>
                      {msg.reply}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
