import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { StorageService } from '../../services/storage';
import { calculateExamResult, assignMeritPositions } from '../../services/grading';
import {
  Users,
  CheckCircle2,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Plus,
  Save,
  Check,
  Edit,
  FileText,
  Upload,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { AttendanceStatus } from '../../types';

export const TeacherPortal: React.FC = () => {
  const { user, addToast } = useAuth();
  const db = StorageService.getDB();

  // Find active teacher record: Rahim Ahmed TCH-001 or fallback
  const teacherId = user?.relatedId || 'TCH-001';
  const teacher = db.teachers.find((t) => t.id === teacherId) || db.teachers[0];

  const [activeTab, setActiveTab] = useState<'classes' | 'attendance' | 'marks' | 'homework' | 'routine'>('classes');

  // --- ATTENDANCE STATE (Workflow 2) ---
  const [attClass, setAttClass] = useState('10');
  const [attSection, setAttSection] = useState('Science');
  const [attDate, setAttDate] = useState(new Date().toISOString().slice(0, 10));
  const classStudents = db.students.filter(
    (s) => s.classId === attClass && (attSection === 'All' || s.section === attSection)
  );

  // Initialize attendance statuses for students in this class
  const existingRecord = db.attendance.find(
    (a) => a.date === attDate && a.classId === attClass && a.section === attSection
  );
  const [attStatuses, setAttStatuses] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((st) => {
      map[st.id] = existingRecord?.records[st.id] || 'present';
    });
    return map;
  });

  const handleStatusChange = (stId: string, status: AttendanceStatus) => {
    setAttStatuses((prev) => ({ ...prev, [stId]: status }));
  };

  const handleSaveAttendance = () => {
    const recordId = `${attDate}_${attClass}_${attSection}`;
    StorageService.saveAttendance({
      id: recordId,
      date: attDate,
      classId: attClass,
      section: attSection,
      markedBy: `${teacher.name} (${teacher.id})`,
      records: attStatuses,
    });
    StorageService.logAction(
      teacher.name,
      'teacher',
      'SUBMIT_ATTENDANCE',
      'Attendance',
      `Marked attendance for Class ${attClass} ${attSection} on ${attDate}`
    );
    addToast('success', 'Attendance Saved', `Attendance for Class ${attClass} (${attSection}) on ${attDate} was recorded.`);
  };

  // --- MARKS ENTRY STATE (Workflow 3) ---
  const [examSelect, setExamSelect] = useState('EXAM-2026-T1');
  const [marksClass, setMarksClass] = useState('10');
  const [marksSubject, setMarksSubject] = useState(teacher.subject || 'Mathematics');
  const marksStudents = db.students.filter((s) => s.classId === marksClass);

  const [rawMarks, setRawMarks] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    marksStudents.forEach((st) => {
      const existing = db.examResults.find(
        (r) => r.examId === examSelect && r.studentId === st.id
      );
      const subMark = existing?.subjectMarks.find((sm) => sm.subject === marksSubject);
      map[st.id] = subMark ? subMark.marks : 85;
    });
    return map;
  });

  const handleMarksSave = () => {
    const exam = db.examinations.find((e) => e.id === examSelect) || db.examinations[0];

    marksStudents.forEach((st) => {
      let existingResult = db.examResults.find(
        (r) => r.examId === examSelect && r.studentId === st.id
      );

      const updatedMarksRecord: Record<string, number> = {};
      if (existingResult) {
        existingResult.subjectMarks.forEach((sm) => {
          updatedMarksRecord[sm.subject] = sm.marks;
        });
      }
      updatedMarksRecord[marksSubject] = rawMarks[st.id] ?? 80;

      const calculated = calculateExamResult(
        exam.id,
        exam.name,
        st.id,
        st.name,
        st.classId,
        st.section,
        st.roll,
        updatedMarksRecord,
        existingResult?.published ?? true
      );

      StorageService.saveExamResult(calculated);
    });

    StorageService.logAction(
      teacher.name,
      'teacher',
      'SUBMIT_MARKS',
      'Examinations',
      `Entered marks for ${marksSubject} in Class ${marksClass} (${exam.name})`
    );
    addToast('success', 'Marks Submitted', `Subject marks for ${marksSubject} have been calculated and saved.`);
  };

  // --- HOMEWORK STATE (Workflow 6) ---
  const teacherHomeworks = db.homeworks.filter((h) => h.teacherId === teacher.id);
  const [isCreateHwModalOpen, setIsCreateHwModalOpen] = useState(false);
  const [newHw, setNewHw] = useState({
    title: '',
    description: '',
    subject: teacher.subject || 'Mathematics',
    classId: '10',
    section: 'Science',
    dueDate: '2026-03-12',
  });

  // Homework grading modal state
  const [gradingTarget, setGradingTarget] = useState<{
    hwId: string;
    studentId: string;
    studentName: string;
    marks: number;
    feedback: string;
  } | null>(null);

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHw.title.trim()) return;

    const hwId = `HW-2026-${Date.now().toString().slice(-4)}`;
    const created = {
      id: hwId,
      title: newHw.title.trim(),
      description: newHw.description.trim(),
      subject: newHw.subject,
      classId: newHw.classId,
      section: newHw.section,
      teacherId: teacher.id,
      teacherName: teacher.name,
      assignedDate: new Date().toISOString().slice(0, 10),
      dueDate: newHw.dueDate,
      submissions: [],
    };

    StorageService.saveHomework(created);
    StorageService.logAction(
      teacher.name,
      'teacher',
      'CREATE_HOMEWORK',
      'Homework',
      `Published assignment "${created.title}" to Class ${created.classId}`
    );
    addToast('success', 'Homework Published', `New assignment assigned to Class ${created.classId}.`);
    setIsCreateHwModalOpen(false);
    setNewHw({
      title: '',
      description: '',
      subject: teacher.subject || 'Mathematics',
      classId: '10',
      section: 'Science',
      dueDate: '2026-03-12',
    });
  };

  const handleSaveGrade = (hwId: string, studentId: string, marks: number, feedback: string) => {
    const hw = db.homeworks.find((h) => h.id === hwId);
    if (hw) {
      const sub = hw.submissions.find((s) => s.studentId === studentId);
      if (sub) {
        sub.marks = marks;
        sub.feedback = feedback;
        sub.status = 'graded';
        StorageService.saveHomework(hw);
        addToast('success', 'Assignment Graded', `Grade of ${marks}/100 awarded.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Teacher Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={teacher.photoUrl}
              alt={teacher.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
                  TEACHER FACULTY PORTAL
                </span>
                <span className="text-xs font-mono text-slate-300">{teacher.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {teacher.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {teacher.designation} • Department of {teacher.subject} • {teacher.qualification}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateHwModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/30"
            >
              Post New Homework
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'classes', label: 'My Assigned Classes', icon: Users },
            { id: 'attendance', label: 'Mark Attendance (Workflow 2)', icon: Clock },
            { id: 'marks', label: 'Enter Exam Marks (Workflow 3)', icon: Award },
            { id: 'homework', label: 'Homework & Submissions (Workflow 6)', icon: BookOpen },
            { id: 'routine', label: 'Teaching Schedule', icon: Calendar },
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

        {/* Tab 1: Assigned Classes */}
        {activeTab === 'classes' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teacher.assignedClasses.map((clsName) => (
                <div key={clsName} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary">{clsName}</Badge>
                    <span className="text-xs text-slate-400">Session 2026</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{teacher.subject} Curriculum</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Syllabus progress: Chapter 4 (Quadratic Equations & Polynomials). Regular laboratory and problem sheets assigned.
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('attendance')}
                    >
                      Mark Attendance
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveTab('marks')}
                    >
                      Enter Marks
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Mark Attendance (Workflow 2) */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Mark Student Classroom Attendance</h3>
                <p className="text-xs text-slate-500">Record Present, Absent, Late arrival, or Approved Leave</p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleSaveAttendance}
                icon={<Save className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
              >
                Save Attendance Record
              </Button>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <select
                  value={attClass}
                  onChange={(e) => setAttClass(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="10">Class 10</option>
                  <option value="9">Class 9</option>
                  <option value="8">Class 8</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                <select
                  value={attSection}
                  onChange={(e) => setAttSection(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Science">Science</option>
                  <option value="Humanities">Humanities</option>
                  <option value="A">Section A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={attDate}
                  onChange={(e) => setAttDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Attendance Marking Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Roll</th>
                    <th className="py-3 px-4">Student ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4 text-center rounded-r-lg">Attendance Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {classStudents.map((st) => {
                    const currentStatus = attStatuses[st.id] || 'present';
                    return (
                      <tr key={st.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{st.roll}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{st.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{st.name}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            {(['present', 'absent', 'late', 'leave'] as AttendanceStatus[]).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(st.id, status)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  currentStatus === status
                                    ? status === 'present'
                                      ? 'bg-emerald-600 text-white'
                                      : status === 'absent'
                                      ? 'bg-rose-600 text-white'
                                      : status === 'late'
                                      ? 'bg-amber-600 text-white'
                                      : 'bg-sky-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {status.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Marks Entry (Workflow 3) */}
        {activeTab === 'marks' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Examination Subject Marks Entry</h3>
                <p className="text-xs text-slate-500">
                  Scores will automatically calculate letter grade, GPA, and update the merit list rankings.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleMarksSave}
                icon={<Save className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                Save & Recalculate Results
              </Button>
            </div>

            {/* Exam and Subject Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Examination</label>
                <select
                  value={examSelect}
                  onChange={(e) => setExamSelect(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  {db.examinations.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={marksSubject}
                  onChange={(e) => setMarksSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="ICT">ICT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <select
                  value={marksClass}
                  onChange={(e) => setMarksClass(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="10">Class 10</option>
                  <option value="9">Class 9</option>
                </select>
              </div>
            </div>

            {/* Marks Input Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg">Roll</th>
                    <th className="py-3 px-4">Student ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4 text-center rounded-r-lg">Marks Obtained (Out of 100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {marksStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{st.roll}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{st.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{st.name}</td>
                      <td className="py-3 px-4 text-blue-600 font-medium">{marksSubject}</td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rawMarks[st.id] ?? 80}
                          onChange={(e) =>
                            setRawMarks({
                              ...rawMarks,
                              [st.id]: Number(e.target.value),
                            })
                          }
                          className="w-24 text-center px-3 py-1.5 font-bold text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Homework Publishing & Grading (Workflow 6) */}
        {activeTab === 'homework' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Homework & Assignment Oversight</h3>
                <p className="text-xs text-slate-500">Publish coursework, review student attachments, and evaluate grades</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateHwModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Create Homework
              </Button>
            </div>

            <div className="space-y-4">
              {teacherHomeworks.map((hw) => (
                <div
                  key={hw.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">{hw.subject}</Badge>
                        <Badge variant="neutral">Class {hw.classId} ({hw.section})</Badge>
                        <span className="text-xs text-slate-400">Due Date: {hw.dueDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{hw.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{hw.description}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Submissions Received</span>
                      <strong className="text-sm font-bold text-blue-600">
                        {hw.submissions.length} Students
                      </strong>
                    </div>
                  </div>

                  {/* Submissions List */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Student Submissions & Evaluation
                    </h5>
                    {hw.submissions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No submissions submitted yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {hw.submissions.map((sub) => (
                          <div
                            key={sub.studentId}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-slate-900">{sub.studentName}</strong>
                                <span className="text-slate-400 font-mono">({sub.studentId})</span>
                                <Badge variant={sub.status === 'graded' ? 'success' : 'warning'} size="sm">
                                  {sub.status === 'graded' ? `Graded: ${sub.marks}/100` : 'Pending Grade'}
                                </Badge>
                              </div>
                              <p className="text-slate-600 mt-1">{sub.content}</p>
                              {sub.feedback && (
                                <p className="text-emerald-700 font-medium mt-0.5">
                                  Teacher Feedback: {sub.feedback}
                                </p>
                              )}
                            </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setGradingTarget({
                                      hwId: hw.id,
                                      studentId: sub.studentId,
                                      studentName: sub.studentName,
                                      marks: sub.marks ?? 90,
                                      feedback: sub.feedback || 'Good attempt. Excellent step-by-step clarity.',
                                    });
                                  }}
                                >
                                  {sub.status === 'graded' ? 'Edit Grade' : 'Grade Assignment'}
                                </Button>
                              </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Routine */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
              Teaching Schedule & Lecture Routine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(db.routines['10'] || []).map((slot, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-600 block">{slot.day} • {slot.time}</span>
                    <strong className="text-sm text-slate-900">{slot.subject}</strong>
                    <p className="text-slate-500">Class 10 (Science)</p>
                  </div>
                  <Badge variant="neutral">{slot.room}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Homework Modal */}
        {isCreateHwModalOpen && (
          <Modal
            isOpen={isCreateHwModalOpen}
            onClose={() => setIsCreateHwModalOpen(false)}
            title="Create New Homework Assignment"
            subtitle="Publish coursework with submission deadlines"
          >
            <form onSubmit={handleCreateHomework} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={newHw.title}
                  onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
                  placeholder="e.g. Chapter 4 Polynomial Equations Problem Set"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newHw.subject}
                    onChange={(e) => setNewHw({ ...newHw, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Class
                  </label>
                  <select
                    value={newHw.classId}
                    onChange={(e) => setNewHw({ ...newHw, classId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="10">Class 10</option>
                    <option value="9">Class 9</option>
                    <option value="8">Class 8</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={newHw.dueDate}
                  onChange={(e) => setNewHw({ ...newHw, dueDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Instructions & Exercises Details
                </label>
                <textarea
                  rows={3}
                  value={newHw.description}
                  onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
                  placeholder="List the specific questions and format expectations..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <Button variant="outline" size="md" onClick={() => setIsCreateHwModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Publish to Class
                </Button>
              </div>
            </form>
          </Modal>
        )}
        {/* Grade Homework In-App Modal */}
        {gradingTarget && (
          <Modal
            isOpen={Boolean(gradingTarget)}
            onClose={() => setGradingTarget(null)}
            title={`Evaluate Assignment: ${gradingTarget.studentName}`}
            subtitle={`Student ID: ${gradingTarget.studentId} • Scale: 0 to 100`}
            maxWidth="sm"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveGrade(
                  gradingTarget.hwId,
                  gradingTarget.studentId,
                  gradingTarget.marks,
                  gradingTarget.feedback
                );
                setGradingTarget(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Score Obtained (0 - 100) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradingTarget.marks}
                  onChange={(e) =>
                    setGradingTarget({
                      ...gradingTarget,
                      marks: Math.min(100, Math.max(0, Number(e.target.value))),
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Teacher Evaluation Feedback
                </label>
                <textarea
                  rows={3}
                  value={gradingTarget.feedback}
                  onChange={(e) =>
                    setGradingTarget({ ...gradingTarget, feedback: e.target.value })
                  }
                  placeholder="Provide constructive academic remarks..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <Button variant="outline" size="md" onClick={() => setGradingTarget(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Save Evaluation
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};
