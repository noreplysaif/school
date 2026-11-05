import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  Info,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface LoginProps {
  onNavigate: (view: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login, switchDemoRole } = useAuth();
  const [email, setEmail] = useState('admin@edunexus.demo');
  const [password, setPassword] = useState('Demo@123');

  const demoAccounts: {
    role: UserRole;
    name: string;
    email: string;
    pass: string;
    desc: string;
    badge: 'primary' | 'warning' | 'success' | 'info' | 'neutral';
  }[] = [
    {
      role: 'super_admin',
      name: 'Super Administrator',
      email: 'admin@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Full ERP Control & System Configuration',
      badge: 'primary',
    },
    {
      role: 'principal',
      name: 'Dr. M. A. Rahman (Principal)',
      email: 'principal@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Academic Approvals, Result Publishing',
      badge: 'warning',
    },
    {
      role: 'teacher',
      name: 'Rahim Ahmed (TCH-001)',
      email: 'teacher@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Math Senior Faculty, Class 10 Attendance & Marks',
      badge: 'success',
    },
    {
      role: 'accountant',
      name: 'Kabir Hossain',
      email: 'accountant@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Tuition Fees, BDT Payment Gateways (bKash/Nagad)',
      badge: 'info',
    },
    {
      role: 'librarian',
      name: 'Shahela Parveen',
      email: 'librarian@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Library Book Circulation & Overdue Fines',
      badge: 'neutral',
    },
    {
      role: 'student',
      name: 'Arif Hossain (STU-2026-001)',
      email: 'student@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Class 10 Science, Routine, Exam Transcript & ID Card',
      badge: 'primary',
    },
    {
      role: 'parent',
      name: 'Md. Kamal Hossain (Guardian)',
      email: 'parent@edunexus.demo',
      pass: 'Demo@123',
      desc: 'Multi-Child Monitor (Arif & Samiul Islam)',
      badge: 'warning',
    },
  ];

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      const match = demoAccounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
      if (match?.role === 'student') onNavigate('portal_student');
      else if (match?.role === 'parent') onNavigate('portal_parent');
      else if (match?.role === 'teacher') onNavigate('portal_teacher');
      else onNavigate('dashboard');
    }
  };

  const handleQuickDemoLaunch = (acc: typeof demoAccounts[0]) => {
    switchDemoRole(acc.role);
    if (acc.role === 'student') onNavigate('portal_student');
    else if (acc.role === 'parent') onNavigate('portal_parent');
    else if (acc.role === 'teacher') onNavigate('portal_teacher');
    else onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            DEMONSTRATION AUTHENTICATION PORTAL
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            EduNexus Institutional Access
          </h1>
          <p className="text-slate-600 text-sm">
            Sign in with standard credentials or click any demo persona below for immediate instant testing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Standard Credentials Login Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Account Credentials</h2>
                <p className="text-xs text-slate-500">Secure role-protected portal gateway</p>
              </div>
            </div>

            <form onSubmit={handleStandardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@edunexus.demo"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Demo passwords for all accounts: <strong className="font-mono">Demo@123</strong>
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Dashboard
              </Button>
            </form>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center leading-relaxed">
              Architecture Note: Production deployments connect Firebase Auth or enterprise LDAP without client password exposure.
            </div>
          </div>

          {/* Right Column: One-Click Demo Role Launcher Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                1-Click Demonstration Accounts
              </h2>
              <span className="text-xs text-slate-500">Tap to test immediately</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoAccounts.map((acc) => (
                <div
                  key={acc.email}
                  onClick={() => handleQuickDemoLaunch(acc)}
                  className="bg-white rounded-xl p-4 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={acc.badge} size="sm">
                        {acc.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {acc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {acc.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span className="truncate">{acc.email}</span>
                    <span className="text-blue-600 font-sans font-semibold text-[10px]">Launch →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
