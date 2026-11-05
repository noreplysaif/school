import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  LogIn,
  UserCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About School' },
    { id: 'academic_programs', label: 'Academic Programs' },
    { id: 'teachers', label: 'Faculty' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'results', label: 'Results' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'notices', label: 'Notices' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'admission', label: 'Admissions' },
    { id: 'contact', label: 'Contact' },
  ];

  const handlePortalClick = () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    if (role === 'student') onNavigate('portal_student');
    else if (role === 'parent') onNavigate('portal_parent');
    else if (role === 'teacher') onNavigate('portal_teacher');
    else onNavigate('dashboard');
  };

  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-xs z-30">
      {/* Top Information Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+880 2 55000000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>info@greenfield.edu.bd</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Mirpur-10, Dhaka-1216</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">EIIN: 134250 | College Code: 1045</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-800 text-[11px] text-sky-300 font-medium">
              Academic Session: 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* School Brand & Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Greenfield
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                EduNexus
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
              Model School & College • Dhaka
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentView === link.id
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action CTAs: Apply Now & Portal Access */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('admission')}
            icon={<BookOpen className="w-4 h-4 text-blue-600" />}
          >
            Online Admission
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePortalClick}
            icon={user ? <UserCheck className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
          >
            {user ? `${user.role.replace('_', ' ').toUpperCase()} PORTAL` : 'PORTAL LOGIN'}
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handlePortalClick}
          >
            {user ? 'PORTAL' : 'LOGIN'}
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-slate-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              onClick={() => {
                onNavigate('admission');
                setMobileMenuOpen(false);
              }}
            >
              Apply Online
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={() => {
                handlePortalClick();
                setMobileMenuOpen(false);
              }}
            >
              {user ? 'Dashboard' : 'Portal Login'}
            </Button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer ${
                currentView === link.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
