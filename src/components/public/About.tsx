import React from 'react';
import { Award, BookOpen, CheckCircle, ShieldCheck, Target, HeartHandshake, Building2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">About Greenfield Model School & College</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Two Decades of Academic Distinction in Dhaka
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Founded in 2005, Greenfield Model School & College has transformed from a modest community campus into one of Dhaka’s most reputed educational landmarks.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Institutional Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To provide an inclusive, technologically advanced, and ethically grounded learning ecosystem that develops independent thinkers, scientific innovators, and patriotic global citizens capable of navigating 21st-century challenges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Long-term Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To stand as the benchmark model school in Bangladesh for blended digital learning, academic excellence, sporting triumph, and moral leadership under the EduNexus modern school enterprise framework.
            </p>
          </div>
        </div>

        {/* Campus Infrastructure */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Campus Facilities & Infrastructure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Building2 className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">6-Story Modern Campus</h3>
              <p className="text-xs text-slate-500 mt-1">Air-conditioned digital multimedia classrooms with interactive smart boards.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <BookOpen className="w-6 h-6 text-sky-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Central Digital Library</h3>
              <p className="text-xs text-slate-500 mt-1">Over 15,000 reference books, journals, and national board curriculum archives.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Award className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Olympiad Standard Labs</h3>
              <p className="text-xs text-slate-500 mt-1">Dedicated Physics, Chemistry, Biology, and 60-terminal high-speed ICT lab.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-amber-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">24/7 CCTV & Security</h3>
              <p className="text-xs text-slate-500 mt-1">Campus-wide perimeter security, biometric access, and nurse first-aid infirmary.</p>
            </div>
          </div>
        </div>

        {/* Governing Body & Accreditations */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold">Accreditation & Institutional Governance</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            Greenfield Model School & College operates under official authorization from the Directorate of Secondary and Higher Education (DSHE) and the Board of Intermediate and Secondary Education (BISE), Dhaka. Our managing committee comprises distinguished university professors, educationists, and parent representatives.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">EIIN Number</span>
              <strong className="text-white text-sm">134250</strong>
            </div>
            <div>
              <span className="text-slate-400 block">BISE College Code</span>
              <strong className="text-white text-sm">1045</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Location</span>
              <strong className="text-white text-sm">Mirpur-10, Dhaka</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Official Currency</span>
              <strong className="text-white text-sm">BDT (৳)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
