import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { AdmissionApplication, Student } from '../../types';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  GraduationCap,
  FileText,
  UserPlus,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const AdmissionAdminModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() =>
    StorageService.getAdmissions()
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewingApp, setReviewingApp] = useState<AdmissionApplication | null>(null);

  const refreshList = () => {
    setAdmissions(StorageService.getAdmissions());
  };

  const filtered = admissions.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch =
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApproveAndEnroll = (app: AdmissionApplication) => {
    // Generate new student ID
    const allStudents = StorageService.getStudents();
    const nextRoll = allStudents.filter((s) => s.classId === app.appliedClass).length + 1;
    const newStudentId = `STU-2026-${String(allStudents.length + 1).padStart(3, '0')}`;

    // Create enrolled student
    const newStudent: Student = {
      id: newStudentId,
      name: app.studentName,
      classId: app.appliedClass,
      section: 'A',
      roll: String(nextRoll).padStart(2, '0'),
      gender: app.gender,
      dob: app.dob,
      bloodGroup: 'B+',
      guardianName: app.guardianName,
      guardianPhone: app.guardianPhone,
      guardianEmail: app.guardianEmail,
      address: app.address,
      admissionDate: new Date().toISOString().slice(0, 10),
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      attendanceRate: 100,
    };

    StorageService.saveStudent(newStudent);

    // Update application
    const updatedApp: AdmissionApplication = {
      ...app,
      status: 'approved',
      assignedStudentId: newStudentId,
      notes: `Approved by ${user?.name || 'Administrator'}. Automatically registered into Class ${app.appliedClass} Section A.`,
    };

    StorageService.saveAdmission(updatedApp);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'admin',
      'APPROVE_ADMISSION',
      'Admissions',
      `Approved application ${app.id} for ${app.studentName}. Created student ${newStudentId}.`
    );

    addToast(
      'success',
      'Admission Approved & Enrolled',
      `${app.studentName} is now registered with Student ID ${newStudentId}`
    );

    setReviewingApp(null);
    refreshList();
  };

  const handleReject = (app: AdmissionApplication) => {
    const updatedApp: AdmissionApplication = {
      ...app,
      status: 'rejected',
      notes: 'Prerequisites not fulfilled or seats occupied.',
    };

    StorageService.saveAdmission(updatedApp);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'admin',
      'REJECT_ADMISSION',
      'Admissions',
      `Rejected application ${app.id} for ${app.studentName}`
    );

    addToast('warning', 'Application Rejected', `Application ${app.id} marked as rejected.`);
    setReviewingApp(null);
    refreshList();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admissions & Student Intake Portal
          </h1>
          <p className="text-xs text-slate-500">
            Review online applications, verify academic credentials, and trigger automatic enrollment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" size="md">
            Pending Review: {admissions.filter((a) => a.status === 'pending').length}
          </Badge>
          <Badge variant="success" size="md">
            Approved: {admissions.filter((a) => a.status === 'approved').length}
          </Badge>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Applications' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'approved', label: 'Approved & Enrolled' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{app.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{app.studentName}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">Class {app.appliedClass}</td>
                  <td className="py-3 px-4">
                    <span className="block text-slate-800">{app.guardianName}</span>
                    <span className="text-[11px] text-slate-400">{app.guardianPhone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{app.appliedDate}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'success'
                          : app.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {app.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewingApp(app)}
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal with Approve/Reject */}
      {reviewingApp && (
        <Modal
          isOpen={!!reviewingApp}
          onClose={() => setReviewingApp(null)}
          title={`Review Admission Application: ${reviewingApp.id}`}
          subtitle={`Student: ${reviewingApp.studentName} • Class ${reviewingApp.appliedClass}`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Applicant Name:</span>
                <strong className="text-slate-900 text-sm">{reviewingApp.studentName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Applied Class:</span>
                <strong className="text-blue-600 text-sm">Class {reviewingApp.appliedClass}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Birth:</span>
                <strong className="text-slate-800">{reviewingApp.dob} ({reviewingApp.gender})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Previous School:</span>
                <strong className="text-slate-800">{reviewingApp.prevSchool || 'N/A'} (GPA: {reviewingApp.prevGpa || 'N/A'})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Guardian Details:</span>
                <strong className="text-slate-800">{reviewingApp.guardianName} ({reviewingApp.guardianPhone})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Address:</span>
                <span className="text-slate-700">{reviewingApp.address}</span>
              </div>
            </div>

            {reviewingApp.assignedStudentId && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Enrolled as active student: <strong className="font-mono">{reviewingApp.assignedStudentId}</strong></span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <span className="font-bold block mb-0.5">Notes:</span>
              <p>{reviewingApp.notes || 'Awaiting committee assessment.'}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setReviewingApp(null)}>
                Close
              </Button>

              {reviewingApp.status !== 'rejected' && (
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => handleReject(reviewingApp)}
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Reject Application
                </Button>
              )}

              {reviewingApp.status !== 'approved' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleApproveAndEnroll(reviewingApp)}
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  Approve & Automatically Enroll Student
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
