import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { ExportService } from '../../services/exportService';
import { PdfService } from '../../services/pdfService';
import { StudentExamResult, Examination } from '../../types';
import {
  Award,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  BookOpen,
  Send,
  FileText,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const ExamResultsModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const db = StorageService.getDB();

  const [examinations, setExaminations] = useState<Examination[]>(() =>
    StorageService.getExaminations()
  );
  const [selectedExamId, setSelectedExamId] = useState(examinations[0]?.id || 'EXAM-2026-T1');
  const [results, setResults] = useState<StudentExamResult[]>(() => StorageService.getExamResults());
  const [viewingResult, setViewingResult] = useState<StudentExamResult | null>(null);

  const selectedExam = examinations.find((e) => e.id === selectedExamId);
  const examResultsList = results.filter((r) => r.examId === selectedExamId);

  const refreshData = () => {
    setExaminations(StorageService.getExaminations());
    setResults(StorageService.getExamResults());
  };

  const handleTogglePublish = (publish: boolean) => {
    if (!selectedExam) return;
    StorageService.publishExam(selectedExam.id, publish);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'principal',
      publish ? 'PUBLISH_EXAM_RESULTS' : 'UNPUBLISH_EXAM_RESULTS',
      'Examinations',
      `${publish ? 'Published and released' : 'Unpublished'} results for ${selectedExam.name}`
    );
    addToast(
      publish ? 'success' : 'info',
      publish ? 'Results Published' : 'Results Withdrawn',
      `Examination results for ${selectedExam.name} are now ${publish ? 'live for public and students' : 'hidden'}.`
    );
    refreshData();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Examinations & Academic Merit Rankings
          </h1>
          <p className="text-xs text-slate-500">
            Automated GPA calculations, merit positioning, and official report card publishing
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              selectedExam && ExportService.exportExamResults(examResultsList, selectedExam.name)
            }
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Export Merit List (Excel)
          </Button>

          {selectedExam && (
            <Button
              variant={selectedExam.status === 'published' ? 'outline' : 'primary'}
              size="sm"
              onClick={() => handleTogglePublish(selectedExam.status !== 'published')}
              icon={
                selectedExam.status === 'published' ? (
                  <XCircle className="w-4 h-4 text-rose-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                )
              }
            >
              {selectedExam.status === 'published'
                ? 'Unpublish Results'
                : 'Approve & Publish Results (Workflow 3)'}
            </Button>
          )}
        </div>
      </div>

      {/* Exam Selector Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Active Examination Cohort
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="font-bold text-slate-900 text-sm bg-transparent border-none p-0 focus:outline-none cursor-pointer mt-0.5"
            >
              {examinations.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} (Class {ex.classId})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={selectedExam?.status === 'published' ? 'success' : 'warning'}
            size="md"
          >
            STATUS: {selectedExam?.status.toUpperCase()}
          </Badge>
          <span className="text-xs text-slate-400">Total Evaluated: {examResultsList.length} Students</span>
        </div>
      </div>

      {/* Merit List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Merit Rank</th>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Total Marks</th>
                <th className="py-3 px-4">GPA (5.00)</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {examResultsList.map((res) => (
                <tr key={res.studentId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-700">
                    {res.meritPosition ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-[11px]">
                        #{res.meritPosition}
                      </span>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{res.roll}</td>
                  <td className="py-3 px-4">
                    <strong className="text-slate-900 block">{res.studentName}</strong>
                    <span className="text-[11px] font-mono text-slate-400">{res.studentId}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {res.totalMarks} / {res.totalFullMarks}
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-600">
                    {res.gpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        res.grade === 'A+'
                          ? 'success'
                          : res.grade === 'F'
                          ? 'danger'
                          : 'primary'
                      }
                      size="sm"
                    >
                      {res.grade}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        res.isPassed ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {res.isPassed ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingResult(res)}
                        icon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Inspect
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const student = db.students.find((s) => s.id === res.studentId);
                          PdfService.generateReportCard(res, student);
                        }}
                        icon={<Download className="w-3.5 h-3.5" />}
                      >
                        PDF
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Marks Breakdown Modal */}
      {viewingResult && (
        <Modal
          isOpen={!!viewingResult}
          onClose={() => setViewingResult(null)}
          title={`Academic Transcript: ${viewingResult.studentName}`}
          subtitle={`${viewingResult.examName} • ID: ${viewingResult.studentId} • Roll: ${viewingResult.roll}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Total Marks</span>
                <strong className="block text-sm text-slate-900">{viewingResult.totalMarks}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">GPA</span>
                <strong className="block text-sm text-blue-600">{viewingResult.gpa.toFixed(2)}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Grade</span>
                <strong className="block text-sm text-emerald-600">{viewingResult.grade}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Merit Rank</span>
                <strong className="block text-sm text-purple-600">
                  {viewingResult.meritPosition ? `#${viewingResult.meritPosition}` : 'Failed'}
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Full Marks</th>
                    <th className="py-2.5 px-3">Pass Marks</th>
                    <th className="py-2.5 px-3">Obtained</th>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {viewingResult.subjectMarks.map((sm) => (
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

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setViewingResult(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const student = db.students.find((s) => s.id === viewingResult.studentId);
                  PdfService.generateReportCard(viewingResult, student);
                }}
                icon={<Download className="w-4 h-4" />}
              >
                Download PDF Report Card
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
