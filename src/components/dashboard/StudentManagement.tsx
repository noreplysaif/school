import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { ExportService } from '../../services/exportService';
import { PdfService } from '../../services/pdfService';
import { Student } from '../../types';
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  FileCheck,
  CreditCard,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const StudentManagement: React.FC = () => {
  const { user, addToast } = useAuth();
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  // Modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    classId: '10',
    section: 'Science',
    roll: '06',
    gender: 'Male',
    dob: '2010-05-15',
    bloodGroup: 'B+',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: 'Mirpur, Dhaka',
    admissionDate: new Date().toISOString().slice(0, 10),
    status: 'active',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 95,
  });

  const refreshList = () => {
    setStudents(StorageService.getStudents());
  };

  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === 'All' || s.classId === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm) ||
      s.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    const nextNum = students.length + 1;
    setFormData({
      id: `STU-2026-${String(nextNum).padStart(3, '0')}`,
      name: '',
      classId: '10',
      section: 'Science',
      roll: String(nextNum).padStart(2, '0'),
      gender: 'Male',
      dob: '2010-05-15',
      bloodGroup: 'B+',
      guardianName: '',
      guardianPhone: '+880 1711-000000',
      guardianEmail: '',
      address: 'Mirpur, Dhaka',
      admissionDate: new Date().toISOString().slice(0, 10),
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      attendanceRate: 96,
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setIsAddEditModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.id) {
      addToast('error', 'Validation Error', 'Please complete required student fields.');
      return;
    }

    const studentToSave: Student = {
      id: formData.id,
      name: formData.name.trim(),
      classId: formData.classId || '10',
      section: formData.section || 'A',
      roll: formData.roll || '01',
      gender: formData.gender as any || 'Male',
      dob: formData.dob || '2010-01-01',
      bloodGroup: formData.bloodGroup || 'A+',
      guardianName: formData.guardianName?.trim() || 'Guardian',
      guardianPhone: formData.guardianPhone?.trim() || '+880 1711-000000',
      guardianEmail: formData.guardianEmail?.trim() || '',
      address: formData.address?.trim() || 'Mirpur, Dhaka',
      admissionDate: formData.admissionDate || new Date().toISOString().slice(0, 10),
      status: (formData.status as any) || 'active',
      photoUrl: formData.photoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      attendanceRate: formData.attendanceRate ?? 95,
    };

    StorageService.saveStudent(studentToSave);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'super_admin',
      editingStudent ? 'UPDATE_STUDENT' : 'CREATE_STUDENT',
      'Students',
      `${editingStudent ? 'Updated' : 'Registered new'} student ${studentToSave.name} (${studentToSave.id})`
    );

    addToast('success', 'Student Saved', `${studentToSave.name} saved successfully.`);
    setIsAddEditModalOpen(false);
    refreshList();
  };

  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;
    StorageService.deleteStudent(studentToDelete.id);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'super_admin',
      'DELETE_STUDENT',
      'Students',
      `Archived/deleted student ${studentToDelete.name} (${studentToDelete.id})`
    );
    addToast('warning', 'Student Deleted', `${studentToDelete.name} was removed from the roster.`);
    setStudentToDelete(null);
    refreshList();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await ExportService.parseStudentFile(file);
      parsed.forEach((st) => {
        if (st.name && st.id) {
          StorageService.saveStudent(st as Student);
        }
      });
      addToast('success', 'Bulk Import Complete', `Imported ${parsed.length} student records from file.`);
      refreshList();
    } catch (err) {
      addToast('error', 'Import Failed', 'Unable to parse Excel / CSV file format.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Information & Roster Management
          </h1>
          <p className="text-xs text-slate-500">
            Total Enrolled: {students.length} students across Junior & Secondary sections
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Bulk Import */}
          <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Import Excel/CSV</span>
            <input type="file" accept=".xlsx,.csv,.xls" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Bulk Export Excel */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => ExportService.exportStudents(students, 'xlsx')}
            icon={<Download className="w-3.5 h-3.5 text-emerald-600" />}
          >
            Export Excel
          </Button>

          {/* Add Student Button (Workflow 1) */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAdd}
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Student
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Class:
          </span>
          {['All', '10', '9', '8', '7', '6'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedClass === cls
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cls === 'All' ? 'All Classes' : `Class ${cls}`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, roll, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No students matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.photoUrl}
                          alt={st.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <strong className="text-slate-900 block font-semibold">{st.name}</strong>
                          <span className="text-[11px] font-mono text-slate-400">{st.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800">
                      Class {st.classId} ({st.section})
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">{st.roll}</td>

                    <td className="py-3 px-4">
                      <span className="text-slate-800 block">{st.guardianName}</span>
                      <span className="text-slate-400 text-[11px]">{st.guardianPhone}</span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-blue-600">
                      {st.attendanceRate ?? 95}%
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={st.status === 'active' ? 'success' : 'neutral'} size="sm">
                        {st.status.toUpperCase()}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setViewingStudent(st)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => PdfService.generateStudentIdCard(st)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Download ID Card PDF"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(st)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setStudentToDelete(st)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal (Workflow 1) */}
      {isAddEditModalOpen && (
        <Modal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          title={editingStudent ? `Edit Student: ${editingStudent.name}` : 'Register New Student (Workflow 1)'}
          subtitle="Assign academic cohort, guardian particulars, and roll number"
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveStudent} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name of Student *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Shakib Al Hasan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Class *
                </label>
                <select
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
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
                  Section *
                </label>
                <input
                  type="text"
                  required
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  placeholder="e.g. Science or A"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Class Roll *
                </label>
                <input
                  type="text"
                  required
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  placeholder="e.g. 06"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="e.g. Md. Mostafa Kamal"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Guardian Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  placeholder="+880 1819-xxxxxx"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Residential Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House, Road, Area, Dhaka"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsAddEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                {editingStudent ? 'Save Modifications' : 'Confirm Registration (Save)'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Details Modal */}
      {viewingStudent && (
        <Modal
          isOpen={!!viewingStudent}
          onClose={() => setViewingStudent(null)}
          title={`Student Profile: ${viewingStudent.name}`}
          subtitle={`Student ID: ${viewingStudent.id} • Class ${viewingStudent.classId}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <img
                src={viewingStudent.photoUrl}
                alt={viewingStudent.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{viewingStudent.name}</h3>
                <p className="text-xs text-blue-600 font-semibold">Class {viewingStudent.classId} ({viewingStudent.section}) • Roll {viewingStudent.roll}</p>
                <p className="text-xs text-slate-400 mt-1">Enrolled on: {viewingStudent.admissionDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50">
                <span className="text-slate-400 block">Blood Group:</span>
                <strong className="text-slate-800">{viewingStudent.bloodGroup}</strong>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <span className="text-slate-400 block">Date of Birth:</span>
                <strong className="text-slate-800">{viewingStudent.dob}</strong>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <span className="text-slate-400 block">Guardian:</span>
                <strong className="text-slate-800">{viewingStudent.guardianName}</strong>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <span className="text-slate-400 block">Phone:</span>
                <strong className="text-slate-800">{viewingStudent.guardianPhone}</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => PdfService.generateStudentIdCard(viewingStudent)}
                icon={<CreditCard className="w-4 h-4" />}
                className="flex-1 justify-center"
              >
                Download ID Card PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => PdfService.generateCertificate('character', viewingStudent)}
                icon={<FileCheck className="w-4 h-4" />}
                className="flex-1 justify-center"
              >
                Character Certificate
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialog
        isOpen={!!studentToDelete}
        title="Delete Student Record?"
        message={`Are you sure you want to permanently remove student "${studentToDelete?.name}" (${studentToDelete?.id})? This will archive their enrollment status.`}
        confirmLabel="Confirm Deletion"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setStudentToDelete(null)}
      />
    </div>
  );
};
