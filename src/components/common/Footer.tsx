import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Identity & Motto */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  Greenfield Model
                </h3>
                <p className="text-xs text-sky-400 font-medium">School & College</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Nurturing intellect, building discipline, and inspiring global leadership through excellence in science, humanities, and moral integrity since 2005.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                BISE Dhaka Affiliated (Code: 1045)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Ministry of Education Approved
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Academic Wings
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('academic_programs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Primary Section (Class 1-5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academic_programs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Junior Secondary (Class 6-8)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academic_programs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Secondary Science & Commerce (Class 9-10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academic_programs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Higher Secondary College Section
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Academic Calendar 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Online Examination Results
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals & Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Online Portals & Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Student Portal Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Parent Monitoring Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Teacher Academic Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admission')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Online Admission Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Notice Board & Circulars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Campus Life & Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Payment Methods */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Campus Contact & Fees
            </h4>
            <div className="space-y-3 text-sm text-slate-400 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Mirpur-10, Dhaka-1216, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+880 2 55000000 / +880 1711-000111</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>info@greenfield.edu.bd</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sun - Thu: 08:00 AM - 04:00 PM</span>
              </div>
            </div>

            {/* Official Online Payment Support */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-2">Accepted Fee Gateways (BDT ৳):</p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded bg-pink-950/60 text-pink-300 border border-pink-700/50">
                  bKash
                </span>
                <span className="px-2.5 py-1 rounded bg-orange-950/60 text-orange-300 border border-orange-700/50">
                  Nagad
                </span>
                <span className="px-2.5 py-1 rounded bg-blue-950/60 text-blue-300 border border-blue-700/50">
                  SSLCommerz
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/50">
                  Bank Cash
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>
              © {new Date().getFullYear()} Greenfield Model School & College. Powered by <strong>EduNexus ERP Engine</strong>.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Student Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
