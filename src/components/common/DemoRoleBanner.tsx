import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { UserRole } from '../../types';
import { ShieldCheck, RotateCcw, ChevronDown, User, ExternalLink, Globe } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

interface DemoRoleBannerProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const DemoRoleBanner: React.FC<DemoRoleBannerProps> = ({ currentView, onNavigate }) => {
  const { user, role, switchDemoRole, logout, resetDemoDatabase } = useAuth();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const demoRoles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full Enterprise System Control' },
    { role: 'principal', label: 'Principal', desc: 'Academic Oversight & Approvals' },
    { role: 'teacher', label: 'Teacher', desc: 'Attendance, Marks, Homework' },
    { role: 'accountant', label: 'Accountant', desc: 'Fees, Invoices, BDT Gateway' },
    { role: 'librarian', label: 'Librarian', desc: 'Book Catalog, Issue & Return' },
    { role: 'student', label: 'Student', desc: 'Arif Hossain (Class 10)' },
    { role: 'parent', label: 'Parent', desc: 'Md. Kamal Hossain (2 Children)' },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs py-1.5 px-4 sticky top-0 z-40 select-none shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Mode Badge & School Identity */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-400/30 text-[11px] tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            DEMO MODE
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300 font-medium truncate">
            Greenfield Model School & College (Mirpur, Dhaka)
          </span>
        </div>

        {/* Right: Role Switcher & Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium px-2.5 py-1 rounded border border-slate-700 transition-colors cursor-pointer"
              aria-label="Switch demo role"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Role: <strong className="text-white capitalize">{role ? role.replace('_', ' ') : 'Guest / Visitor'}</strong></span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Select Demonstration Role</p>
                  <p className="text-[11px] text-slate-500">Instantly switch test perspective</p>
                </div>
                {demoRoles.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchDemoRole(item.role);
                      if (item.role === 'student') onNavigate('portal_student');
                      else if (item.role === 'parent') onNavigate('portal_parent');
                      else if (item.role === 'teacher') onNavigate('portal_teacher');
                      else onNavigate('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                      role === item.role ? 'bg-blue-600/20 text-blue-300 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-100">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                    {role === item.role && <ShieldCheck className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
                <div className="border-t border-slate-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      onNavigate('home');
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Log Out (Public Visitor View)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Jump between Portal & Public Site */}
          {user ? (
            <button
              onClick={() => {
                if (currentView.startsWith('portal_') || currentView === 'dashboard') {
                  onNavigate('home');
                } else {
                  if (role === 'student') onNavigate('portal_student');
                  else if (role === 'parent') onNavigate('portal_parent');
                  else if (role === 'teacher') onNavigate('portal_teacher');
                  else onNavigate('dashboard');
                }
              }}
              className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              {currentView.startsWith('portal_') || currentView === 'dashboard' ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Public Site</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open Portal</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              Portal Login
            </button>
          )}

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1 bg-slate-800/80 hover:bg-rose-900/40 text-slate-300 hover:text-rose-200 px-2 py-1 rounded border border-slate-700 hover:border-rose-700/50 transition-colors cursor-pointer"
            title="Reset demonstration data to factory seed"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset Demonstration Database?"
        message="This will restore all 20 students, 6 teachers, sample examinations, attendance, fee invoices, library books, and demo accounts to their original initial state. Any changes made during testing will be reset."
        confirmLabel="Reset Database"
        cancelLabel="Keep Current Data"
        isDestructive={true}
        onConfirm={() => {
          resetDemoDatabase();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
