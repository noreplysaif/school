import React from 'react';
import { BookOpen, CheckCircle2, Award, Microscope, Calculator, Globe2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AcademicPrograms: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Curriculum & Disciplines</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Academic Programs & Streams</h1>
          <p className="text-slate-600 text-sm">
            Aligned with the Bangladesh NCTB National Curriculum standards, incorporating modern STEM pedagogy and global language proficiency.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-8">
          {/* Program 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Junior Secondary Program (Class 6 - 8)</h2>
                  <p className="text-xs text-slate-500">Core foundational schooling with progressive cognitive development</p>
                </div>
              </div>
              <Badge variant="primary">NCTB Standard</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Compulsory Subjects:</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bangla (Paper I & II) & Grammar</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> English Language & Creative Writing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> General Mathematics & Geometry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> General Science & Environmental Studies</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Information & Communication Technology (ICT)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Distinctive Highlights:</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily English spoken drill, basic computer coding in Python/Scratch, continuous weekly assessments, mental mathematics competitions, and physical education drill.
                </p>
              </div>
            </div>
          </div>

          {/* Program 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Secondary Science Stream (Class 9 - 10 SSC)</h2>
                  <p className="text-xs text-slate-500">Intensive scientific preparation for engineering and medical careers</p>
                </div>
              </div>
              <Badge variant="success">Most Popular</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Subject Combinations:</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Physics (Theory + Practical Lab)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Chemistry (Inorganic & Organic Synthesis)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Biology (Botany & Human Anatomy)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Higher Mathematics & Coordinate Geometry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ICT & Computer Architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Laboratory & Mentorship:</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students spend 4 hours weekly in fully equipped laboratories under the direct instruction of senior M.Sc. teachers. Regular model tests mirror board examination formats to eliminate exam anxiety.
                </p>
              </div>
            </div>
          </div>

          {/* Program 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Business Studies Stream (Class 9 - 10 SSC)</h2>
                  <p className="text-xs text-slate-500">Commercial foundations, corporate accounting, and entrepreneurial leadership</p>
                </div>
              </div>
              <Badge variant="warning">Commerce Wing</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Subject Combinations:</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Principles of Accounting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Business Entrepreneurship & Innovation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Finance & Banking Fundamentals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> General Science & Bangladesh Global Studies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Practical Business Exposure:</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Includes annual Young Entrepreneurs Fair where students draft mock balance sheets, market original products, and calculate profit margins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
