import React from 'react';
import { Award, Trophy, Medal, Star, CheckCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Achievements: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Hall of Honor</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Achievements & Awards</h1>
          <p className="text-slate-600 text-sm">
            Celebrating national Olympiad medals, board examination excellence, debate trophies, and sports glory.
          </p>
        </div>

        {/* Board Examination Milestones */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">National Board Examination Milestones (BISE Dhaka)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-100 text-center">
              <span className="text-3xl font-extrabold text-blue-600">100%</span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">SSC Pass Rate</h3>
              <p className="text-xs text-slate-500 mt-1">Consistent 100% pass record over the last 10 consecutive years.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100 text-center">
              <span className="text-3xl font-extrabold text-amber-600">84</span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">GPA 5.0 (Golden A+)</h3>
              <p className="text-xs text-slate-500 mt-1">In SSC Examination 2025 across Science and Commerce streams.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 text-center">
              <span className="text-3xl font-extrabold text-emerald-600">12</span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">Government Talent Scholarships</h3>
              <p className="text-xs text-slate-500 mt-1">Awarded by the Ministry of Education for outstanding merit.</p>
            </div>
          </div>
        </div>

        {/* Recent External Competition Laurels */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Co-Curricular & Olympiad Laurels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Medal className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">National Math Olympiad 2025</h3>
                  <Badge variant="warning" size="sm">Champion</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">Arif Hossain (Class 10)</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Secured 1st position in the Dhaka Divisional Math Olympiad and represented Bangladesh in the Asia-Pacific Mathematics contest.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">National Children Science Congress</h3>
                  <Badge variant="primary" size="sm">Gold Medal</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">Nusrat Jahan & Tasnim Akter</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Developed an automated flood-alert microcontroller model utilizing smart sensors, recognized by the Science Museum, Dhaka.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">Inter-School Cricket Championship</h3>
                  <Badge variant="success" size="sm">Winners</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">Greenfield Senior Cricket XI</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Emerged champions in the Mirpur Zonal Inter-School Sports Tournament defeating 16 competing institutions.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">National English Parliamentary Debate</h3>
                  <Badge variant="primary" size="sm">Runners Up</Badge>
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">Debate Club Delegation</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Demonstrated exceptional oratorical mastery and critical rebuttals in the prestigious Dhaka University Interschool Fest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
