import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { Sidebar } from './Sidebar';
import { AdminOverview } from './AdminOverview';
import { StudentManagement } from './StudentManagement';
import { TeacherManagement } from './TeacherManagement';
import { AdmissionAdminModule } from './AdmissionAdminModule';
import { AttendanceModule } from './AttendanceModule';
import { ExamResultsModule } from './ExamResultsModule';
import { FeesFinanceModule } from './FeesFinanceModule';
import { LibraryModule } from './LibraryModule';
import { NoticeModule } from './NoticeModule';
import { CertificateModule } from './CertificateModule';
import { AnalyticsReportsModule } from './AnalyticsReportsModule';
import { SettingsModule } from './SettingsModule';
import { Menu, X, Bell, Search, Globe, Shield } from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { user, role } = useAuth();
  const [activeModule, setActiveModule] = useState<string>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return <AdminOverview />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'admissions':
        return <AdmissionAdminModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'examinations':
        return <ExamResultsModule />;
      case 'finance':
        return <FeesFinanceModule />;
      case 'library':
        return <LibraryModule />;
      case 'notices':
        return <NoticeModule />;
      case 'certificates':
        return <CertificateModule />;
      case 'analytics':
        return <AnalyticsReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          onNavigateHome={onNavigateHome}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs">
          <div className="w-64 bg-slate-900 h-full">
            <Sidebar
              activeModule={activeModule}
              onSelectModule={(mod) => {
                setActiveModule(mod);
                setIsMobileSidebarOpen(false);
              }}
              onNavigateHome={onNavigateHome}
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 capitalize">
                {activeModule.replace('_', ' ')}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs text-slate-500 font-medium">Enterprise Management</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Public School Site</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <strong className="block text-slate-800">{user?.name || 'Administrator'}</strong>
                <span className="text-slate-400 capitalize text-[10px] font-semibold">
                  {role ? role.replace('_', ' ') : 'Super Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Scrollable Body Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderModuleContent()}</div>
        </main>
      </div>
    </div>
  );
};
