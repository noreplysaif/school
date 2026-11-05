import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { PdfService } from '../../services/pdfService';
import { Search, Download, Award, AlertCircle, CheckCircle2, FileText, User } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StudentExamResult } from '../../types';

export const PublicResults: React.FC = () => {
  const db = StorageService.getDB();
  const [searchMethod, setSearchMethod] = useState<'id' | 'roll'>('id');
  const [studentIdInput, setStudentIdInput] = useState('STU-2026-001');
  const [classInput, setClassInput] = useState('10');
  const [rollInput, setRollInput] = useState('01');
  const [searchResult, setSearchResult] = useState<StudentExamResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setErrorMessage('');
    setSearchResult(null);

    const publishedResults = db.examResults.filter((r) => r.published);

    let match: StudentExamResult | undefined;
    if (searchMethod === 'id') {
      const cleanId = studentIdInput.trim().toUpperCase();
      match = publishedResults.find((r) => r.studentId.toUpperCase() === cleanId);
    } else {
      match = publishedResults.find(
        (r) => r.classId === classInput && r.roll.padStart(2, '0') === rollInput.trim().padStart(2, '0')
      );
    }

    if (match) {
      setSearchResult(match);
    } else {
      setErrorMessage(
        'No published examination result found for the provided credentials. Please ensure the student ID or Class & Roll number are correct.'
      );
    }
  };

  const handleDownloadPdf = () => {
    if (!searchResult) return;
    const student = db.students.find((s) => s.id === searchResult.studentId);
    PdfService.generateReportCard(searchResult, student);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Award className="w-4 h-4" /> Official Examination Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Result Verification
          </h1>
          <p className="text-slate-600 text-sm">
            Check official First Term Examination 2026 transcripts and download authenticated PDF report cards.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {/* Method selector */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <button
              onClick={() => setSearchMethod('id')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                searchMethod === 'id' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Search by Student ID
            </button>
            <button
              onClick={() => setSearchMethod('roll')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                searchMethod === 'roll' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Search by Class & Roll
            </button>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            {searchMethod === 'id' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enter Student ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    placeholder="e.g. STU-2026-001"
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span>Demo IDs:</span>
                  <button
                    type="button"
                    onClick={() => setStudentIdInput('STU-2026-001')}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    STU-2026-001 (Arif)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setStudentIdInput('STU-2026-002')}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    STU-2026-002 (Nusrat)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setStudentIdInput('STU-2026-005')}
                    className="text-rose-600 hover:underline cursor-pointer"
                  >
                    STU-2026-005 (Failing test)
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Class
                  </label>
                  <select
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  >
                    <option value="10">Class 10</option>
                    <option value="9">Class 9</option>
                    <option value="8">Class 8</option>
                    <option value="7">Class 7</option>
                    <option value="6">Class 6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Class Roll
                  </label>
                  <input
                    type="text"
                    required
                    value={rollInput}
                    onChange={(e) => setRollInput(e.target.value)}
                    placeholder="e.g. 01, 02, 05"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<Search className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Search & Verify Result
              </Button>
            </div>
          </form>
        </div>

        {/* Error message */}
        {hasSearched && errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Result Not Found</p>
              <p className="text-xs text-rose-600 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Display Search Result Card */}
        {searchResult && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden animate-in fade-in duration-300">
            {/* Result Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  {searchResult.examName}
                </span>
                <h2 className="text-2xl font-bold mt-1">{searchResult.studentName}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
                  <span>ID: <strong className="text-white">{searchResult.studentId}</strong></span>
                  <span>•</span>
                  <span>Class: <strong className="text-white">{searchResult.classId} ({searchResult.section})</strong></span>
                  <span>•</span>
                  <span>Roll: <strong className="text-white">{searchResult.roll}</strong></span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleDownloadPdf}
                icon={<Download className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20"
              >
                Download Official PDF
              </Button>
            </div>

            {/* GPA Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200 text-center">
              <div>
                <span className="text-xs text-slate-500 block">Total Marks</span>
                <strong className="text-lg font-bold text-slate-900">{searchResult.totalMarks} / {searchResult.totalFullMarks}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Grade Point Average</span>
                <strong className={`text-lg font-bold ${searchResult.isPassed ? 'text-blue-600' : 'text-rose-600'}`}>
                  {searchResult.gpa.toFixed(2)} / 5.00
                </strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Letter Grade</span>
                <strong className={`text-lg font-bold ${searchResult.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {searchResult.grade}
                </strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Merit Position</span>
                <strong className="text-lg font-bold text-purple-600">
                  {searchResult.meritPosition ? `#${searchResult.meritPosition}` : 'Failed (N/A)'}
                </strong>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Subject Wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-4 rounded-l-lg">Subject</th>
                      <th className="py-2.5 px-4">Full</th>
                      <th className="py-2.5 px-4">Pass</th>
                      <th className="py-2.5 px-4">Obtained</th>
                      <th className="py-2.5 px-4">Grade</th>
                      <th className="py-2.5 px-4 rounded-r-lg">GPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {searchResult.subjectMarks.map((sm) => (
                      <tr key={sm.subject} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-medium text-slate-900">{sm.subject}</td>
                        <td className="py-3 px-4 text-slate-500">{sm.fullMarks}</td>
                        <td className="py-3 px-4 text-slate-500">{sm.passMarks}</td>
                        <td className="py-3 px-4 font-bold">
                          <span className={sm.marks < sm.passMarks ? 'text-rose-600 font-extrabold' : 'text-slate-900'}>
                            {sm.marks}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={sm.grade === 'F' ? 'danger' : sm.grade === 'A+' ? 'success' : 'primary'} size="sm">
                            {sm.grade}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{sm.gpa.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Evaluation note */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Faculty Remarks: </span>
                  <span>{searchResult.remarks}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Officially Verified Result</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
