import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { Teacher } from '../../types';
import {
  GraduationCap,
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  BookOpen,
  UserCheck,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const TeacherManagement: React.FC = () => {
  const { user, addToast } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>(() => StorageService.getTeachers());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    subject: 'Mathematics',
    email: '',
    phone: '',
    designation: 'Senior Teacher',
    qualification: 'M.Sc. in Mathematics',
    joiningDate: '2020-01-01',
    assignedClasses: ['Class 10 - Science'],
    status: 'active',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  });

  const refreshList = () => {
    setTeachers(StorageService.getTeachers());
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    const nextNum = teachers.length + 1;
    setFormData({
      id: `TCH-${String(nextNum).padStart(3, '0')}`,
      name: '',
      subject: 'Mathematics',
      email: `teacher${nextNum}@greenfield.edu.bd`,
      phone: '+880 1711-000000',
      designation: 'Assistant Teacher',
      qualification: 'M.Sc. / M.A.',
      joiningDate: new Date().toISOString().slice(0, 10),
      assignedClasses: ['Class 9 - Science'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.id) return;

    const teacherToSave: Teacher = {
      id: formData.id,
      name: formData.name.trim(),
      subject: formData.subject || 'General',
      email: formData.email?.trim() || 'teacher@greenfield.edu.bd',
      phone: formData.phone?.trim() || '+880 1711-000000',
      designation: formData.designation || 'Teacher',
      qualification: formData.qualification || 'M.Sc.',
      joiningDate: formData.joiningDate || new Date().toISOString().slice(0, 10),
      assignedClasses: typeof formData.assignedClasses === 'string'
        ? (formData.assignedClasses as string).split(',').map((s) => s.trim())
        : formData.assignedClasses || ['Class 10 - Science'],
      status: (formData.status as any) || 'active',
      photoUrl: formData.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    };

    StorageService.saveTeacher(teacherToSave);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'super_admin',
      editingTeacher ? 'UPDATE_TEACHER' : 'CREATE_TEACHER',
      'Teachers',
      `${editingTeacher ? 'Updated' : 'Appointed new'} faculty ${teacherToSave.name} (${teacherToSave.id})`
    );

    addToast('success', 'Faculty Saved', `${teacherToSave.name} profile recorded successfully.`);
    setIsModalOpen(false);
    refreshList();
  };

  const handleDeleteConfirm = () => {
    if (!teacherToDelete) return;
    StorageService.deleteTeacher(teacherToDelete.id);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'super_admin',
      'DELETE_TEACHER',
      'Teachers',
      `Removed faculty ${teacherToDelete.name} (${teacherToDelete.id})`
    );
    addToast('warning', 'Faculty Removed', `${teacherToDelete.name} was removed from the directory.`);
    setTeacherToDelete(null);
    refreshList();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Faculty & Teacher Administration
          </h1>
          <p className="text-xs text-slate-500">
            Total Faculty: {teachers.length} certified educators across science, commerce, and language departments
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          icon={<Plus className="w-4 h-4" />}
        >
          Appoint New Teacher
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, department, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={t.photoUrl}
                  alt={t.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                    <Badge variant="primary" size="sm">{t.id}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{t.designation}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.qualification}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>Subject: <strong className="text-slate-900">{t.subject}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Classes: {t.assignedClasses.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[150px]">{t.email}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit Teacher"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTeacherToDelete(t)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Delete Teacher"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTeacher ? `Edit Faculty: ${editingTeacher.name}` : 'Appoint New Faculty Member'}
          subtitle="Configure department specialization and assigned classes"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Teacher ID *
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Mahmud Hasan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Academic Qualification
              </label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Save Faculty Record
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!teacherToDelete}
        title="Remove Faculty Member?"
        message={`Are you sure you want to remove ${teacherToDelete?.name} (${teacherToDelete?.id}) from the academic faculty directory?`}
        confirmLabel="Confirm Removal"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTeacherToDelete(null)}
      />
    </div>
  );
};
