import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './services/authContext';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';
import { NotificationToast } from './components/common/NotificationToast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public pages
import { Home } from './components/public/Home';
import { About } from './components/public/About';
import { Teachers } from './components/public/Teachers';
import { Achievements } from './components/public/Achievements';
import { AcademicPrograms } from './components/public/AcademicPrograms';
import { PublicResults } from './components/public/PublicResults';
import { AcademicCalendar } from './components/public/AcademicCalendar';
import { Notices } from './components/public/Notices';
import { Gallery } from './components/public/Gallery';
import { Admission } from './components/public/Admission';
import { Contact } from './components/public/Contact';
import { Login } from './components/public/Login';

// Portals & Admin Dashboard
import { StudentPortal } from './components/portals/StudentPortal';
import { ParentPortal } from './components/portals/ParentPortal';
import { TeacherPortal } from './components/portals/TeacherPortal';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { user, role } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');

  // Check URL query parameters (e.g. ?autostart=1 or ?view=portal)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam) {
      setCurrentView(viewParam);
    }
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPortalView =
    currentView === 'dashboard' ||
    currentView === 'portal_student' ||
    currentView === 'portal_parent' ||
    currentView === 'portal_teacher';

  const renderCurrentView = () => {
    switch (currentView) {
      // Public Pages
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'teachers':
        return <Teachers />;
      case 'achievements':
        return <Achievements />;
      case 'academic_programs':
        return <AcademicPrograms />;
      case 'results':
        return <PublicResults />;
      case 'calendar':
        return <AcademicCalendar />;
      case 'notices':
        return <Notices />;
      case 'gallery':
        return <Gallery />;
      case 'admission':
        return <Admission />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;

      // Portals
      case 'portal_student':
        return <StudentPortal />;
      case 'portal_parent':
        return <ParentPortal />;
      case 'portal_teacher':
        return <TeacherPortal />;
      case 'dashboard':
        return <AdminDashboard onNavigateHome={() => handleNavigate('home')} />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Persistent Demo Role Switcher & Reset Control */}
      <DemoRoleBanner currentView={currentView} onNavigate={handleNavigate} />

      {/* Toast Stack */}
      <NotificationToast />

      {/* Render Public Header if not inside fullscreen dashboard */}
      {!isPortalView && (
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
      )}

      {/* Active View Container */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Render Public Footer if not inside fullscreen dashboard */}
      {!isPortalView && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
