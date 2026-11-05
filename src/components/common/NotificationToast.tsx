import React from 'react';
import { useAuth } from '../../services/authContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const iconMap = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
        };

        const borderMap = {
          success: 'border-emerald-200 bg-white/95 text-slate-800',
          error: 'border-rose-200 bg-white/95 text-slate-800',
          warning: 'border-amber-200 bg-white/95 text-slate-800',
          info: 'border-blue-200 bg-white/95 text-slate-800',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${borderMap[toast.type]}`}
          >
            <div className="mt-0.5">{iconMap[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-md cursor-pointer transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
