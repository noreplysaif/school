import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { ExportService } from '../../services/exportService';
import { calculateAttendanceStats } from '../../services/grading';
import { AttendanceStatus } from '../../types';
import {
  Clock,
  Calendar,
  Save,
  Download,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AttendanceModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const db = StorageService.getDB();

  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('Science');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const classStudents = db.students.filter(
    (s) => s.classId === selectedClass && (selectedSection === 'All' || s.section === selectedSection)
  );

  const recordId = `${selectedDate}_${selectedClass}_${selectedSection}`;
  const existingRecord = db.attendance.find((a) => a.id === recordId);

  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((st) => {
      map[st.id] = existingRecord?.records[st.id] || 'present';
    });
    return map;
  });

  const handleStatusChange = (stId: string, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [stId]: status }));
  };

  const handleSaveAttendance = () => {
    StorageService.saveAttendance({
      id: recordId,
      date: selectedDate,
      classId: selectedClass,
      section: selectedSection,
      markedBy: user?.name || 'Administrator',
      records: statuses,
    });

    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'admin',
      'RECORD_ATTENDANCE',
      'Attendance',
      `Saved attendance for Class ${selectedClass} (${selectedSection}) on ${selectedDate}`
    );

    addToast('success', 'Attendance Recorded', `Class ${selectedClass} (${selectedSection}) saved successfully.`);
  };

  const stats = calculateAttendanceStats(Object.values(statuses));

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Classroom Attendance Administration
          </h1>
          <p className="text-xs text-slate-500">
            Daily roll call, status tracking, and monthly percentage reports
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => ExportService.exportAttendance(db.attendance, db.students)}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Export Attendance (Excel)
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveAttendance}
            icon={<Save className="w-4 h-4" />}
          >
            Save Daily Attendance
          </Button>
        </div>
      </div>

      {/* Selectors and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Selectors */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
            >
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
              <option value="7">Class 7</option>
              <option value="6">Class 6</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
            >
              <option value="Science">Science</option>
              <option value="Humanities">Humanities</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Attendance Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-mono"
            />
          </div>
        </div>

        {/* Calculated Stats */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-around text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Present</span>
            <strong className="text-xl font-bold text-emerald-600">{stats.present}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Late</span>
            <strong className="text-xl font-bold text-amber-600">{stats.late}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Absent</span>
            <strong className="text-xl font-bold text-rose-600">{stats.absent}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rate</span>
            <strong className="text-xl font-bold text-blue-600">{stats.rate}%</strong>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Historical Attendance</th>
                <th className="py-3 px-4 text-center">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {classStudents.map((st) => {
                const currentStatus = statuses[st.id] || 'present';
                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{st.roll}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <img
                          src={st.photoUrl}
                          alt={st.name}
                          className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                        />
                        <span>{st.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{st.id}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">
                      {st.attendanceRate ?? 95}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        {(['present', 'absent', 'late', 'leave'] as AttendanceStatus[]).map((stt) => (
                          <button
                            key={stt}
                            onClick={() => handleStatusChange(st.id, stt)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              currentStatus === stt
                                ? stt === 'present'
                                  ? 'bg-emerald-600 text-white'
                                  : stt === 'absent'
                                  ? 'bg-rose-600 text-white'
                                  : stt === 'late'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-sky-600 text-white'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {stt.toUpperCase()}
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
    </div>
  );
};
