import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { AdmissionApplication } from '../../types';
import {
  FileText,
  CheckCircle2,
  Search,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  GraduationCap,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Admission: React.FC = () => {
  const { addToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    appliedClass: '6',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    prevSchool: '',
    prevGpa: '',
  });

  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Tracking State
  const [trackRef, setTrackRef] = useState('');
  const [trackedApp, setTrackedApp] = useState<AdmissionApplication | null>(null);
  const [hasTracked, setHasTracked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName.trim() || !formData.guardianPhone.trim() || !formData.dob) {
      addToast('error', 'Validation Error', 'Please fill in all required fields marked with *');
      return;
    }

    const refNumber = `ADM-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newApp: AdmissionApplication = {
      id: refNumber,
      studentName: formData.studentName.trim(),
      appliedClass: formData.appliedClass,
      gender: formData.gender,
      dob: formData.dob,
      guardianName: formData.guardianName.trim() || 'Parent/Guardian',
      guardianPhone: formData.guardianPhone.trim(),
      guardianEmail: formData.guardianEmail.trim() || 'parent@example.com',
      address: formData.address.trim() || 'Mirpur, Dhaka',
      prevSchool: formData.prevSchool.trim() || 'Community Primary School',
      prevGpa: formData.prevGpa.trim() || '4.50',
      status: 'pending',
      appliedDate: new Date().toISOString().slice(0, 10),
      notes: 'Online application submitted. Queued for document review.',
    };

    StorageService.saveAdmission(newApp);
    StorageService.logAction(
      newApp.guardianName,
      'parent',
      'SUBMIT_ADMISSION',
      'Admissions',
      `Submitted online application ${refNumber} for ${newApp.studentName} in Class ${newApp.appliedClass}`
    );

    setSubmittedApp(newApp);
    addToast('success', 'Application Submitted', `Your reference number is ${refNumber}`);

    // Reset Form
    setFormData({
      studentName: '',
      appliedClass: '6',
      gender: 'Male',
      dob: '',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      address: '',
      prevSchool: '',
      prevGpa: '',
    });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTracked(true);
    const db = StorageService.getDB();
    const clean = trackRef.trim().toUpperCase();
    const found = db.admissions.find((a) => a.id.toUpperCase() === clean);
    setTrackedApp(found || null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Academic Session 2026
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Online Admission Portal
          </h1>
          <p className="text-slate-600 text-sm">
            Join Greenfield Model School & College. Complete the online enrollment application or track an existing submission.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'apply'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            New Student Application Form
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Track Application Status
          </button>
        </div>

        {activeTab === 'apply' ? (
          <div>
            {/* If application just submitted, show success banner */}
            {submittedApp && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-slate-900 animate-in fade-in duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-emerald-950">
                      Admission Application Successfully Submitted!
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1">
                      Please note down your unique application tracking reference number for future inquiry:
                    </p>
                    <div className="mt-3 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-emerald-300 shadow-xs">
                      <span className="font-mono text-base font-bold text-emerald-800">
                        {submittedApp.id}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(submittedApp.id);
                          addToast('info', 'Copied to clipboard', submittedApp.id);
                        }}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                        title="Copy Reference Number"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-emerald-700 mt-3">
                      An administrator will review your academic prerequisites. You can test approving this application by switching to <strong>Super Admin</strong> or <strong>Administrator</strong> in the demo role switcher!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Application Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Student Identity & Bio Data
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name of Student *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="e.g. Mahir Abdullah"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Applied Class *
                      </label>
                      <select
                        value={formData.appliedClass}
                        onChange={(e) => setFormData({ ...formData, appliedClass: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                      >
                        <option value="6">Class 6 (Junior High)</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9 (Science / Commerce)</option>
                        <option value="10">Class 10 (Secondary Transfer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Parent / Guardian Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.guardianName}
                        onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                        placeholder="e.g. Md. Shahidul Islam"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.guardianPhone}
                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                        placeholder="+880 1711-xxxxxx"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.guardianEmail}
                        onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                        placeholder="parent@gmail.com"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. House 12, Road 4, Mirpur-2, Dhaka"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Previous School & Academic Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous School Attended
                      </label>
                      <input
                        type="text"
                        value={formData.prevSchool}
                        onChange={(e) => setFormData({ ...formData, prevSchool: e.target.value })}
                        placeholder="e.g. Dhaka Preparatory School"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous GPA / Marks %
                      </label>
                      <input
                        type="text"
                        value={formData.prevGpa}
                        onChange={(e) => setFormData({ ...formData, prevGpa: e.target.value })}
                        placeholder="e.g. 4.90 or 88%"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<FileText className="w-4 h-4" />}
                  >
                    Submit Official Admission Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Application Tracking Tab */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <form onSubmit={handleTrack} className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Enter Application Reference Number
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={trackRef}
                      onChange={(e) => setTrackRef(e.target.value)}
                      placeholder="e.g. ADM-2026-101 or ADM-2026-102"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono font-medium"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Search className="w-4 h-4" />}
                  >
                    Check Status
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Sample Track Refs:</span>
                  <button
                    type="button"
                    onClick={() => setTrackRef('ADM-2026-101')}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    ADM-2026-101 (Approved)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setTrackRef('ADM-2026-102')}
                    className="text-amber-600 hover:underline cursor-pointer"
                  >
                    ADM-2026-102 (Pending)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setTrackRef('ADM-2026-103')}
                    className="text-rose-600 hover:underline cursor-pointer"
                  >
                    ADM-2026-103 (Rejected)
                  </button>
                </div>
              </form>
            </div>

            {hasTracked && !trackedApp && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Reference Not Found</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    No application was located with reference "{trackRef}". Please check the spelling.
                  </p>
                </div>
              </div>
            )}

            {trackedApp && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Reference: <strong className="text-slate-800 font-mono">{trackedApp.id}</strong>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-0.5">{trackedApp.studentName}</h2>
                    <p className="text-xs text-slate-500">Applied for Class {trackedApp.appliedClass} • Date: {trackedApp.appliedDate}</p>
                  </div>

                  <div>
                    <Badge
                      variant={
                        trackedApp.status === 'approved'
                          ? 'success'
                          : trackedApp.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      size="md"
                    >
                      STATUS: {trackedApp.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Guardian Name & Contact</span>
                    <strong>{trackedApp.guardianName} ({trackedApp.guardianPhone})</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Previous Academic Record</span>
                    <strong>{trackedApp.prevSchool} (GPA: {trackedApp.prevGpa})</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-blue-900">Academic Committee Review Notes:</span>
                  <p className="text-slate-700">{trackedApp.notes || 'In review by principal committee.'}</p>
                  {trackedApp.assignedStudentId && (
                    <p className="font-bold text-emerald-700 pt-1">
                      Assigned Official Student ID: {trackedApp.assignedStudentId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
