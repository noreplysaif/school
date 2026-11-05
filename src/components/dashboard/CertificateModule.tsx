import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { PdfService } from '../../services/pdfService';
import { Student } from '../../types';
import {
  FileCheck,
  CreditCard,
  Award,
  Download,
  Search,
  User,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const CertificateModule: React.FC = () => {
  const db = StorageService.getDB();
  const [students] = useState<Student[]>(() => StorageService.getStudents());
  const [selectedStudentId, setSelectedStudentId] = useState('STU-2026-001');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Certificate & ID Generator
          </h1>
          <p className="text-xs text-slate-500">
            Generate and export official signed PDF certificates with school branding and verification
          </p>
        </div>
      </div>

      {/* Student Selector Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img
            src={selectedStudent.photoUrl}
            alt={selectedStudent.name}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
          />
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Select Student Record
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="font-bold text-slate-900 text-sm bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.id} • Class {st.classId} {st.section} • Roll {st.roll})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500 hidden sm:block">
          <div>Guardian: <strong className="text-slate-800">{selectedStudent.guardianName}</strong></div>
          <div>Session: <strong className="text-blue-600">2026 Regular</strong></div>
        </div>
      </div>

      {/* 4 Downloadable Document Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Certificate 1: ID Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Student ID Card (CR80)</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Official landscape photo identification card with school seal, barcode simulation, and principal signature.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => PdfService.generateStudentIdCard(selectedStudent)}
              icon={<Download className="w-4 h-4" />}
            >
              Generate ID PDF
            </Button>
          </div>
        </div>

        {/* Certificate 2: Character Certificate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Character & Conduct</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Attests to the student’s moral behavior, regular attendance ({selectedStudent.attendanceRate ?? 95}%), and good standing.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => PdfService.generateCertificate('character', selectedStudent)}
              icon={<Download className="w-4 h-4" />}
            >
              Download Certificate
            </Button>
          </div>
        </div>

        {/* Certificate 3: Enrollment Certificate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Enrollment Bonafide</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Legal institutional certification for passport, visa, scholarship, or bank account verification.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => PdfService.generateCertificate('enrollment', selectedStudent)}
              icon={<Download className="w-4 h-4" />}
            >
              Download Certificate
            </Button>
          </div>
        </div>

        {/* Certificate 4: Transfer Certificate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Transfer Certificate (TC)</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Official school clearance and transfer documentation verifying completion of studies and dues settlement.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => PdfService.generateCertificate('transfer', selectedStudent)}
              icon={<Download className="w-4 h-4" />}
            >
              Download TC PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
