import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { Calendar as CalendarIcon, MapPin, Tag, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AcademicCalendar: React.FC = () => {
  const db = StorageService.getDB();
  const [filter, setFilter] = useState<'all' | 'exam' | 'holiday' | 'sports' | 'cultural' | 'academic'>('all');

  const filteredEvents = db.events.filter((ev) => filter === 'all' || ev.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Session Schedule</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Academic Calendar 2026</h1>
          <p className="text-slate-600 text-sm">
            Key examination dates, national holidays, science fairs, sports tournaments, and parent-teacher consultations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'exam', label: 'Examinations' },
            { id: 'holiday', label: 'Holidays' },
            { id: 'academic', label: 'Academic & PTM' },
            { id: 'sports', label: 'Sports' },
            { id: 'cultural', label: 'Cultural' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Timeline */}
        <div className="space-y-4">
          {filteredEvents.map((ev) => {
            const dateObj = new Date(ev.date);
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayNum = dateObj.getDate();

            const badgeVariant = {
              exam: 'danger',
              holiday: 'warning',
              academic: 'primary',
              sports: 'success',
              cultural: 'info',
            }[ev.category] as any;

            return (
              <div
                key={ev.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold border border-blue-100 shrink-0">
                    <span className="text-[11px] text-blue-500 font-semibold">{monthName}</span>
                    <span className="text-2xl leading-none mt-0.5">{dayNum}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-base">{ev.title}</h3>
                      <Badge variant={badgeVariant} size="sm">
                        {ev.category.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 max-w-xl leading-relaxed">{ev.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ev.location}</span>
                      </span>
                      {ev.endDate && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Ends: {ev.endDate}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-semibold text-slate-500">Official Date:</span>
                  <div className="text-sm font-bold text-slate-800">{ev.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
