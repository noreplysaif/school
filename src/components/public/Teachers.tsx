import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { Mail, Phone, BookOpen, Search, UserCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Teachers: React.FC = () => {
  const teachers = StorageService.getTeachers();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const subjects = ['All', ...new Set(teachers.map((t) => t.subject))];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSubject = selectedSubject === 'All' || t.subject === selectedSubject;
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Faculty & Mentors</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Meet Our Qualified Faculty</h1>
          <p className="text-slate-600 text-sm">
            Our educators possess proven track records of academic mentorship, board examination training, and innovative pedagogy.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teacher by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={t.photoUrl}
                    alt={t.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                      <Badge variant="primary" size="sm">{t.id}</Badge>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{t.designation}</p>
                    <p className="text-xs text-slate-500 mt-1">{t.qualification}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>Primary Subject: <strong className="text-slate-800">{t.subject}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Assigned: {t.assignedClasses.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[150px]">{t.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.phone}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
