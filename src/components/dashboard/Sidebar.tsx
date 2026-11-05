import React from 'react';
import { useAuth } from '../../services/authContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Award,
  DollarSign,
  BookOpen,
  Bell,
  FileCheck,
  BarChart3,
  Settings,
  UserCheck,
  LogOut,
  FolderOpen,
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (module: string) => void;
  onNavigateHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  onNavigateHome,
}) => {
  const { user, role, logout } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'teachers', label: 'Teacher Management', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions & Intake', icon: UserCheck },
    { id: 'attendance', label: 'Attendance Records', icon: Clock },
    { id: 'examinations', label: 'Exams & Results', icon: Award },
    { id: 'finance', label: 'Fees & Finance (BDT)', icon: DollarSign },
    { id: 'library', label: 'Library Circulation', icon: BookOpen },
    { id: 'notices', label: 'Notices & Circulars', icon: Bell },
    { id: 'certificates', label: 'Certificate Generator', icon: FileCheck },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Audit Logs', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none text-slate-300">
      <div>
        {/* Top Header Branding */}
        <div
          onClick={onNavigateHome}
          className="p-5 border-b border-slate-800 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-sky-300 transition-colors">
              EduNexus ERP
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Greenfield Model School</p>
          </div>
        </div>

        {/* Current User Badge */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Operator</div>
          <div className="font-bold text-white text-xs truncate mt-0.5">{user?.name}</div>
          <div className="text-[10px] text-sky-400 capitalize font-medium">
            {role ? role.replace('_', ' ') : 'Administrator'}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-2 py-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Log out & Back to website */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={onNavigateHome}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <FolderOpen className="w-4 h-4 text-sky-400" />
          <span>Public School Site</span>
        </button>

        <button
          onClick={() => {
            logout();
            onNavigateHome();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
