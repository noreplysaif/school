import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { Bell, Search, Pin, FileText, Calendar, Eye } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { SchoolNotice } from '../../types';

export const Notices: React.FC = () => {
  const notices = StorageService.getNotices();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState<SchoolNotice | null>(null);

  const categories = ['All', 'Exam', 'Academic', 'Administrative', 'Holiday', 'Sports'];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Official Circulars</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notice Board & Announcements</h1>
          <p className="text-slate-600 text-sm">
            Stay updated with institutional notices, exam schedules, routines, and holiday announcements.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              onClick={() => setSelectedNotice(n)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {n.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Pin className="w-3 h-3 text-amber-600" /> Pinned
                      </span>
                    )}
                    <Badge variant={n.priority === 'high' ? 'danger' : 'info'} size="sm">
                      {n.category}
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {n.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 max-w-2xl leading-relaxed">
                    {n.content}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 shrink-0 self-end sm:self-center">
                <Eye className="w-4 h-4" />
                <span>Read Circular</span>
              </div>
            </div>
          ))}
        </div>

        {/* Read Notice Modal */}
        {selectedNotice && (
          <Modal
            isOpen={!!selectedNotice}
            onClose={() => setSelectedNotice(null)}
            title={selectedNotice.title}
            subtitle={`Published on ${selectedNotice.date} • Category: ${selectedNotice.category}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={selectedNotice.priority === 'high' ? 'danger' : 'info'}>
                  Priority: {selectedNotice.priority.toUpperCase()}
                </Badge>
                <Badge variant="neutral">Target Audience: {selectedNotice.audience.toUpperCase()}</Badge>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {selectedNotice.content}
              </div>

              <div className="pt-2 text-right">
                <p className="text-xs font-semibold text-slate-700">By Order of Academic Council</p>
                <p className="text-[11px] text-slate-500">Greenfield Model School & College, Mirpur, Dhaka</p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
