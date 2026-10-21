/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Search,
  Filter,
  Calendar,
  Building2,
  User,
  BookOpen,
  AlertCircle,
  FileText,
  Plus,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Announcement, AnnouncementCategory } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';
import { Modal } from '../common/Modal';

export const AnnouncementsView: React.FC = () => {
  const { announcements, currentUserRole, currentAdmin, addAnnouncement } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AnnouncementCategory>('all');
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);

  // Admin publisher modal
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<AnnouncementCategory>('Academic');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const isAdmin = currentUserRole === 'admin';

  const filteredNotices = useMemo(() => {
    return announcements.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [announcements, searchTerm, categoryFilter]);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    addAnnouncement({
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: '2026-10-20',
      author: currentAdmin.name,
      department: currentAdmin.department,
      summary: newNoticeSummary || newNoticeTitle,
      content: newNoticeContent,
      isImportant,
    });

    setSuccessMsg('Circular posted to university feed!');
    setTimeout(() => {
      setSuccessMsg('');
      setShowPublishModal(false);
      setNewNoticeTitle('');
      setNewNoticeSummary('');
      setNewNoticeContent('');
      setIsImportant(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <InteractiveCard
        variant="white"
        noTilt={true}
        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2C204F] bg-[#E7E6FA] px-3 py-1 rounded-full border border-white">
              Institutional Communications
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Campus Notification Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1.5 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#A98ADA]" />
            <span>Official University Circulars & Bulletins</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Official announcements from the Examination Cell, Dean of Academic Affairs, and Department of Computer Engineering.
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={() => setShowPublishModal(true)}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Circular</span>
          </button>
        )}
      </InteractiveCard>

      {/* 2. Filter & Search Controls */}
      <InteractiveCard variant="white" noTilt={true} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search circulars by keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#DCE6EF]/60 p-1 rounded-2xl border border-white self-stretch sm:self-auto overflow-x-auto">
          {(['all', 'Academic', 'Examination', 'Events', 'General'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-white text-[#2C204F] shadow-xs'
                  : 'text-slate-600 hover:text-[#2C204F]'
              }`}
            >
              {cat === 'all' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </InteractiveCard>

      {/* 3. Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map((ann) => {
          const isExam = ann.category === 'Examination';
          const cardVariant = isExam ? 'pastel-lavender' : 'white';

          return (
            <InteractiveCard
              key={ann.id}
              variant={cardVariant}
              clickable={true}
              onClick={() => setSelectedNotice(ann)}
              className="p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#2C204F] bg-white px-2.5 py-0.5 rounded-full border border-white shadow-2xs">
                      {ann.category}
                    </span>
                    {ann.isImportant && (
                      <span className="text-[10px] font-bold text-rose-800 bg-[#FFD4C5] px-2 py-0.5 rounded-full border border-white">
                        Important
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {ann.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#2C204F] line-clamp-2 leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {ann.content}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[200px]">By {ann.author} ({ann.department})</span>
                <span className="font-bold text-[#2C204F] flex items-center gap-1">
                  <span>Read Notice</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </InteractiveCard>
          );
        })}
      </div>

      {/* Full Notice Reader Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          description={`${selectedNotice.department} · ${selectedNotice.date}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs sm:text-sm text-[#30313D] leading-relaxed">
            <div className="p-3.5 bg-[#E7E6FA]/60 rounded-2xl border border-white flex items-center justify-between text-xs">
              <span>Category: <strong className="text-[#2C204F]">{selectedNotice.category}</strong></span>
              <span>Author: <strong className="text-[#2C204F]">{selectedNotice.author}</strong></span>
            </div>

            <p className="whitespace-pre-line">{selectedNotice.content}</p>

            {selectedNotice.attachmentName && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Official Attached Document</span>
                  <span className="font-mono font-bold text-[#2C204F]">{selectedNotice.attachmentName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white text-[#2C204F] border border-slate-200 rounded-xl font-bold shadow-2xs hover:bg-slate-50"
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Admin Publish Modal */}
      {showPublishModal && (
        <Modal
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          title="Publish College Notice"
          description="Broadcast official circular to all students"
          maxWidth="lg"
        >
          <form onSubmit={handlePublishNotice} className="space-y-4 text-xs text-[#30313D]">
            {successMsg ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">{successMsg}</h4>
              </div>
            ) : (
              <>
                <div>
                  <label className="block font-bold text-[#2C204F] mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="e.g. Schedule for Continuous Assessment Viva Voce"
                    className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2C204F] mb-1">Category</label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Examination">Examination</option>
                      <option value="Events">Events</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isImportant}
                        onChange={(e) => setIsImportant(e.target.checked)}
                        className="w-4 h-4 rounded text-[#2C204F]"
                      />
                      <span className="font-bold text-[#2C204F]">High Priority</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C204F] mb-1">Content *</label>
                  <textarea
                    rows={4}
                    required
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    placeholder="Enter complete circular text..."
                    className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPublishModal(false)}
                    className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl shadow-sm"
                  >
                    Publish
                  </button>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};
