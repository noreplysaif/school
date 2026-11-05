import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { SchoolNotice } from '../../types';
import {
  Bell,
  Plus,
  Pin,
  Trash2,
  Calendar,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const NoticeModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const [notices, setNotices] = useState<SchoolNotice[]>(() => StorageService.getNotices());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState<Partial<SchoolNotice>>({
    title: '',
    content: '',
    category: 'Academic',
    audience: 'all',
    targetClass: '10',
    isPinned: false,
    priority: 'normal',
  });

  const refreshList = () => {
    setNotices(StorageService.getNotices());
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title?.trim() || !newNotice.content?.trim()) return;

    const created: SchoolNotice = {
      id: `NOT-${String(notices.length + 1).padStart(3, '0')}`,
      title: newNotice.title.trim(),
      content: newNotice.content.trim(),
      category: newNotice.category as any || 'Academic',
      audience: newNotice.audience as any || 'all',
      targetClass: newNotice.targetClass,
      date: new Date().toISOString().slice(0, 10),
      isPinned: Boolean(newNotice.isPinned),
      priority: (newNotice.priority as any) || 'normal',
    };

    StorageService.saveNotice(created);
    StorageService.logAction(
      user?.name || 'Administrator',
      user?.role || 'admin',
      'CREATE_NOTICE',
      'Notices',
      `Published circular "${created.title}" targeted to ${created.audience}`
    );

    addToast('success', 'Notice Broadcasted', `Circular published for audience: ${created.audience}`);
    setIsCreateModalOpen(false);
    refreshList();
  };

  const handleDelete = (id: string) => {
    StorageService.deleteNotice(id);
    addToast('info', 'Notice Removed', 'Circular removed from board.');
    refreshList();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Notices & Broadcasts (Workflow 8)
          </h1>
          <p className="text-xs text-slate-500">
            Publish circulars to students, parents, faculty, or targeted academic classes
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Publish New Notice
        </Button>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={n.priority === 'high' ? 'danger' : 'info'} size="sm">
                    {n.category}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    Audience: {n.audience.toUpperCase()}
                  </Badge>
                  {n.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Pin className="w-3 h-3 text-amber-600" /> Pinned
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{n.date}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">{n.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                {n.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Notice ID: {n.id}</span>
              <button
                onClick={() => handleDelete(n.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Notice Modal (Workflow 8) */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Publish Official School Notice (Workflow 8)"
          subtitle="Distribute announcements to school portals and public website"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Notice Headline / Title *
              </label>
              <input
                type="text"
                required
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                placeholder="e.g. Mandatory Parent-Teacher Conference Schedule"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam Schedule</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Holiday">Holiday Notice</option>
                  <option value="Sports">Sports & Culture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Audience (Workflow 8)
                </label>
                <select
                  value={newNotice.audience}
                  onChange={(e) => setNewNotice({ ...newNotice, audience: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                >
                  <option value="all">All Stakeholders (Public + Portals)</option>
                  <option value="students">Students Only</option>
                  <option value="parents">Parents Only</option>
                  <option value="teachers">Teachers Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Notice Content Details *
              </label>
              <textarea
                rows={4}
                required
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                placeholder="Write the full circular description..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newNotice.isPinned}
                  onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-700">Pin to top of notice board</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newNotice.priority === 'high'}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, priority: e.target.checked ? 'high' : 'normal' })
                  }
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="font-semibold text-rose-700">Mark as High Priority Alert</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                Publish Circular
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
