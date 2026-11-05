import React from 'react';
import { StorageService } from '../../services/storage';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Calendar,
  Bell,
  ArrowRight,
  CheckCircle2,
  Quote,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const db = StorageService.getDB();
  const topStudents = db.students.slice(0, 4);
  const topTeachers = db.teachers.slice(0, 4);
  const notices = db.notices.slice(0, 3);
  const events = db.events.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-20 lg:py-28 px-4 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Admission Open for Academic Session 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Shaping Leaders with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
                  Intellect & Integrity
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Welcome to Greenfield Model School & College (Mirpur, Dhaka). Delivering top SSC & HSC board results, world-class science laboratories, modern ICT infrastructure, and comprehensive character building.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('admission')}
                  icon={<FileText className="w-5 h-5" />}
                  className="shadow-lg shadow-blue-600/30 text-base"
                >
                  Apply for Admission 2026
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('results')}
                  className="border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white"
                >
                  Search Exam Results
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => onNavigate('about')}
                  className="text-slate-300 hover:text-white"
                >
                  Explore Campus →
                </Button>
              </div>

              {/* Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400">Board Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-400">GPA 5.0</div>
                  <div className="text-xs text-slate-400">84+ Students (2025)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">21+ Yrs</div>
                  <div className="text-xs text-slate-400">Legacy in Dhaka</div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">EduNexus Direct Portal</h4>
                      <p className="text-[11px] text-slate-400">Instant Student & Parent Login</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">System Online</Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <div
                    onClick={() => onNavigate('login')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-blue-500 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                        ST
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-blue-300">
                          Student Portal
                        </div>
                        <div className="text-[11px] text-slate-400">Routine, marks, homework & fees</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div
                    onClick={() => onNavigate('login')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-blue-500 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                        PR
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-sky-300">
                          Parent Portal
                        </div>
                        <div className="text-[11px] text-slate-400">Live attendance & progress card</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div
                    onClick={() => onNavigate('login')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-blue-500 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                        TC
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                          Teacher Portal
                        </div>
                        <div className="text-[11px] text-slate-400">Class management & marks entry</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Demo Mode Credentials Loaded</span>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    Explore Demo Accounts →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headmaster's Welcome Message */}
      <section className="py-16 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Principal Dr. M. A. Rahman"
                  className="w-72 sm:w-80 h-96 object-cover rounded-2xl shadow-xl border-4 border-slate-50"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg text-center">
                  <div className="text-xl font-bold">25+</div>
                  <div className="text-[10px] uppercase font-semibold text-blue-100">Years in Education</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Quote className="w-4 h-4" /> Message from Principal's Desk
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                "Empowering Minds to Innovate, Lead, and Inspire"
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                At Greenfield Model School & College, we recognize that true education is not merely the transmission of textbook facts, but the ignition of curiosity, scientific reason, and moral compassion. Our institution in Mirpur, Dhaka has consistently fostered students who excel in both national Olympiads and board examinations.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                With the deployment of the <strong>EduNexus ERP ecosystem</strong>, we bridge the communication between parents, teachers, and students in real time—enabling transparent attendance, prompt feedback on homework, and detailed GPA analytics.
              </p>
              <div className="pt-2">
                <h4 className="text-lg font-bold text-slate-900">Dr. Mohammad A. Rahman</h4>
                <p className="text-xs text-blue-600 font-medium">Principal & Academic Secretary, Ph.D. in Education</p>
                <p className="text-xs text-slate-400">Greenfield Model School & College, Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Comprehensive Academic Programs</h2>
            <p className="text-slate-600 mt-2 text-sm">
              Structured curriculum aligned with the National Curriculum and Textbook Board (NCTB) with English version and Bangla version streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Junior Secondary (Class 6 - 8)</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Focus on mathematical reasoning, English communication skills, introductory computer science, and creative arts.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Bangla & English Medium</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Dedicated STEM Lab Classes</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-md ring-1 ring-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <Badge variant="primary" size="sm">Flagship</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secondary SSC (Class 9 - 10)</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Specialized tracks in Science and Business Studies with modern Physics, Chemistry, Biology labs and Olympiad coaching.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Science & Commerce Groups</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% GPA 5.0 Track Record</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Higher Secondary HSC (College)</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Rigorous preparation for university admissions (BUET, Medical Colleges, DU) with seasoned faculty and regular model tests.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Science, Arts & Commerce</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> University Admission Guidance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Students Spotlight */}
      <section className="py-16 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Academic Merit</div>
              <h2 className="text-3xl font-bold text-slate-900">Best Performing Students</h2>
              <p className="text-slate-500 text-sm mt-1">First Term Examination 2026 Honor Roll</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('results')}
            >
              View Full Merit List →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topStudents.map((st, idx) => (
              <div
                key={st.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 hover:shadow-md transition-all text-center relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <Badge variant={idx === 0 ? 'warning' : 'primary'} size="sm">
                    {idx === 0 ? '🏆 Rank 1' : `Rank ${idx + 1}`}
                  </Badge>
                </div>
                <img
                  src={st.photoUrl}
                  alt={st.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-sm"
                />
                <h3 className="font-bold text-slate-900 text-base">{st.name}</h3>
                <p className="text-xs text-slate-500">ID: {st.id}</p>
                <p className="text-xs font-medium text-blue-600 mt-1">Class {st.classId} ({st.section}) • Roll {st.roll}</p>
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-around text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">GPA</span>
                    <strong className="text-emerald-600 font-bold">5.00</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Attendance</span>
                    <strong className="text-blue-600 font-bold">{st.attendanceRate}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices & Events Dual Section */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Notices */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Official Notices & Circulars</h2>
              </div>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                All Notices ({db.notices.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  onClick={() => onNavigate('notices')}
                  className="bg-white rounded-xl p-4 border border-slate-200/80 hover:border-blue-300 shadow-xs cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Badge variant={n.priority === 'high' ? 'danger' : 'info'} size="sm">
                      {n.category}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{n.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {n.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
              </div>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-xs text-sky-600 hover:underline font-semibold cursor-pointer"
              >
                Full Calendar →
              </button>
            </div>

            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 shrink-0 flex flex-col items-center justify-center font-bold">
                    <span className="text-[10px] uppercase font-semibold text-blue-400">
                      {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-base leading-none">
                      {new Date(ev.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{ev.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{ev.description}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section className="py-16 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Experienced Educators</div>
              <h2 className="text-3xl font-bold text-slate-900">Our Distinguished Faculty</h2>
              <p className="text-slate-500 text-sm mt-1">Dedicated mentors with Master's and Ph.D. credentials</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('teachers')}
            >
              All Faculty Members →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTeachers.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 text-center hover:shadow-md transition-shadow"
              >
                <img
                  src={t.photoUrl}
                  alt={t.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white shadow-sm"
                />
                <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                <p className="text-xs font-semibold text-blue-600">{t.designation}</p>
                <p className="text-xs text-slate-500 mt-1">{t.subject} Department</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.qualification}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Admission CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-sky-600 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your Child’s Journey at Greenfield?
          </h2>
          <p className="text-blue-100 text-base max-w-2xl mx-auto leading-relaxed">
            Apply online in minutes. Receive an instant application tracking reference and stay informed with transparent updates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('admission')}
              className="bg-slate-950 hover:bg-slate-900 text-white shadow-xl"
            >
              Start Admission Application
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              Schedule Campus Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
