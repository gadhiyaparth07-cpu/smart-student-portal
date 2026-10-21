/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Users,
  UserCheck2,
  AlertTriangle,
  GraduationCap,
  FileCheck2,
  Megaphone,
  Plus,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { AnnouncementCategory, StudentRosterItem } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';
import { Modal } from '../common/Modal';

export const AdminOverviewView: React.FC = () => {
  const {
    currentAdmin,
    studentRoster,
    assignments,
    announcements,
    addAnnouncement,
    setActiveTab
  } = usePortal();

  // Search & Filters for Roster
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'warning' | 'good'>('all');

  // Announcement Publisher Modal
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<AnnouncementCategory>('Academic');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState('');

  // Roster filtering
  const filteredRoster = useMemo(() => {
    return studentRoster.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'warning'
          ? st.attendancePct < 75
          : st.attendancePct >= 75;

      return matchesSearch && matchesStatus;
    });
  }, [studentRoster, searchTerm, statusFilter]);

  const atRiskStudents = studentRoster.filter((st) => st.attendancePct < 75);

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

    setPublishSuccessMsg('Notice published successfully across all student dashboards!');
    setTimeout(() => {
      setPublishSuccessMsg('');
      setShowPublishModal(false);
      setNewNoticeTitle('');
      setNewNoticeSummary('');
      setNewNoticeContent('');
      setIsImportant(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Admin Header Bar */}
      <InteractiveCard
        variant="white"
        noTilt={true}
        className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentAdmin.avatarUrl}
              alt={currentAdmin.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#2C204F] bg-[#E7E6FA] px-3 py-0.5 rounded-full border border-white">
                Faculty Administration
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {currentAdmin.employeeId}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1 flex items-center gap-2">
              <span>{currentAdmin.name}</span>
              <ShieldCheck className="w-5 h-5 text-[#A98ADA]" />
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentAdmin.title} · {currentAdmin.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPublishModal(true)}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Circular</span>
          </button>
        </div>
      </InteractiveCard>

      {/* 2. Department Analytics Cards (Pastel reference palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Enrolled Students */}
        <InteractiveCard
          variant="pastel-blue"
          className="p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Enrolled Students
              </span>
              <div className="w-9 h-9 rounded-2xl bg-white/80 flex items-center justify-center text-[#2C204F] shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                68
              </span>
              <span className="text-xs text-slate-600 font-medium">Div A (AIML)</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/60 text-xs text-slate-600 font-medium">
            3 Batches (A1, A2, A3) Active
          </div>
        </InteractiveCard>

        {/* Card 2: Average Attendance */}
        <InteractiveCard
          variant="pastel-lavender"
          className="p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Cohort Attendance
              </span>
              <div className="w-9 h-9 rounded-2xl bg-white/80 flex items-center justify-center text-[#2C204F] shadow-2xs">
                <UserCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                84.6%
              </span>
              <span className="text-xs text-slate-600 font-medium">Class Avg</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/60 flex items-center justify-between text-xs">
            <span className="text-slate-600">Threshold: 75%</span>
            <span className="font-bold text-emerald-800">Satisfactory</span>
          </div>
        </InteractiveCard>

        {/* Card 3: Attendance Risk Alerts */}
        <InteractiveCard
          variant="pastel-peach"
          className="p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Attendance Risk
              </span>
              <div className="w-9 h-9 rounded-2xl bg-white/80 flex items-center justify-center text-rose-700 shadow-2xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-rose-800">
                {atRiskStudents.length}
              </span>
              <span className="text-xs text-slate-600 font-medium">Below 75% cutoff</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/60 text-xs text-rose-800 font-bold">
            Requires Mentorship Counseling
          </div>
        </InteractiveCard>

        {/* Card 4: Class Average SGPA */}
        <InteractiveCard
          variant="white"
          className="p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Average Class SGPA
              </span>
              <div className="w-9 h-9 rounded-2xl bg-[#E7E6FA] flex items-center justify-center text-[#2C204F] shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#A98ADA]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                8.62
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 10 Scale</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            First Class Distinction Standard
          </div>
        </InteractiveCard>
      </div>

      {/* 3. Mid Section: Attendance Risk Radar & Coursework Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coursework Evaluation Tracker */}
        <div className="lg:col-span-7">
          <InteractiveCard variant="white" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#2C204F] flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#A98ADA]" />
                <span>Semester 3 Coursework Tracker</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {assignments.length} Course Modules
              </span>
            </div>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-[#DCE6EF]/40 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#DCE6EF]/60 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#2C204F] bg-white px-2 py-0.5 rounded-lg border border-white">
                        {asg.code}
                      </span>
                      <strong className="text-xs font-bold text-[#2C204F] truncate">
                        {asg.title}
                      </strong>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {asg.subject} · Evaluator: {asg.faculty}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Due Date</span>
                      <span className="font-mono font-bold text-[#2C204F]">{asg.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Weightage</span>
                      <span className="font-mono font-bold text-[#2C204F]">{asg.maxMarks}M</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </div>

        {/* Attendance Risk Watchlist */}
        <div className="lg:col-span-5">
          <InteractiveCard variant="pastel-peach" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#3F221B] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span>Attendance Risk Radar</span>
              </h3>
              <span className="text-xs font-bold bg-white/80 px-2.5 py-0.5 rounded-full text-rose-800">
                {atRiskStudents.length} Students
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              The following students are currently below the 75% biometric attendance eligibility threshold for Winter 2026 ESE:
            </p>

            <div className="space-y-2.5">
              {atRiskStudents.map((st) => (
                <div
                  key={st.id}
                  className="p-3.5 rounded-2xl bg-white/90 border border-white shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <strong className="text-xs font-bold text-[#2C204F] block">
                      {st.name}
                    </strong>
                    <span className="text-[11px] font-mono text-slate-500">
                      {st.rollNo} · {st.batch}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-extrabold text-rose-700 block">
                      {st.attendancePct}%
                    </span>
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      Alert Sent
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </div>
      </div>

      {/* 4. Student Directory & Roster Table */}
      <InteractiveCard variant="white" className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#2C204F] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#A98ADA]" />
              <span>Division A Academic Roster</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Directory of enrolled students, submission completion, and provisional SGPA
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student or roll no..."
                className="pl-8 pr-3 py-1.5 text-xs bg-[#DCE6EF]/60 border border-white rounded-xl text-[#30313D] focus:outline-none focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-[#DCE6EF]/60 border border-white rounded-xl text-[#30313D] focus:outline-none focus:bg-white"
            >
              <option value="all">All Students</option>
              <option value="good">Cleared (&gt;= 75%)</option>
              <option value="warning">At Risk (&lt; 75%)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#DCE6EF]/60 text-slate-600 border-b border-white font-bold">
                <th className="p-3.5">Roll No</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Batch</th>
                <th className="p-3.5 text-center">Attendance</th>
                <th className="p-3.5 text-center">Submissions</th>
                <th className="p-3.5 text-center">Current SGPA</th>
                <th className="p-3.5 text-right">Academic Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoster.map((st) => (
                <tr key={st.id} className="hover:bg-[#E7E6FA]/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#2C204F]">
                    {st.rollNo}
                  </td>
                  <td className="p-3.5 font-bold text-[#2C204F]">
                    {st.name}
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">
                    {st.batch}
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        st.attendancePct >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {st.attendancePct}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-600">
                    {st.submittedAssignments} / {st.totalAssignments}
                  </td>
                  <td className="p-3.5 text-center font-mono font-extrabold text-[#2C204F]">
                    {st.sgpa.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-right">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        st.status === 'In Good Standing'
                          ? 'bg-[#E7E6FA] text-[#2C204F]'
                          : 'bg-[#FFD4C5] text-[#3F221B]'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InteractiveCard>

      {/* 5. Circular Publisher Modal */}
      {showPublishModal && (
        <Modal
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          title="Publish College Notice / Circular"
          description="Draft and dispatch an official announcement to all Semester 3 student dashboards."
          maxWidth="lg"
        >
          <form onSubmit={handlePublishNotice} className="space-y-4 text-xs text-[#30313D]">
            {publishSuccessMsg ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">{publishSuccessMsg}</h4>
              </div>
            ) : (
              <>
                <div>
                  <label className="block font-bold text-[#2C204F] mb-1">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="e.g., Extended Lab Timings for Machine Learning Project Work"
                    className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2C204F] mb-1">
                      Category
                    </label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as AnnouncementCategory)}
                      className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white font-medium"
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
                        className="w-4 h-4 rounded text-[#2C204F] focus:ring-0"
                      />
                      <span className="font-bold text-[#2C204F]">Mark as High-Priority Notice</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C204F] mb-1">
                    Brief Summary
                  </label>
                  <input
                    type="text"
                    value={newNoticeSummary}
                    onChange={(e) => setNewNoticeSummary(e.target.value)}
                    placeholder="Short 1-line overview for the notification card"
                    className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C204F] mb-1">
                    Detailed Circular Content *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    placeholder="Enter complete circular text, instructions, and deadlines..."
                    className="w-full px-3.5 py-2.5 bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowPublishModal(false)}
                    className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to Portal</span>
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
