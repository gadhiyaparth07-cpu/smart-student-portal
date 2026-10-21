/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileCheck2,
  CalendarDays,
  Award,
  Megaphone,
  Eye,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Leaf,
  Plus,
  BookOpen,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Assignment, Announcement } from '../../types';
import { AttendanceRingsChart } from './AttendanceRingsChart';
import { TimetableCapsuleTracker } from './TimetableCapsuleTracker';
import { Modal } from '../common/Modal';

export const DashboardView: React.FC = () => {
  const {
    currentStudent,
    currentAdmin,
    currentUserRole,
    stats,
    assignments,
    attendance,
    results,
    announcements,
    setActiveTab,
  } = usePortal();

  const [selectedRubricAssignment, setSelectedRubricAssignment] = useState<Assignment | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);

  // Take the 3 primary cards to display in the Upper Left panel (matching reference: 1 blue, 1 lavender, 1 peach)
  const taskBlue = assignments.find((a) => a.id === 'asg-01') || assignments[0];
  const taskLavender = assignments.find((a) => a.id === 'asg-02') || assignments[1];
  const taskPeach = assignments.find((a) => a.id === 'asg-06') || assignments[5]; // Overdue task!

  // Top 3 results for Academic Performance panel
  const topResults = results.slice(0, 3);

  // Recent 2 announcements for Circulars panel
  const recentNotices = announcements.slice(0, 2);

  // Peer stack avatars
  const peerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Dashboard Introduction (Directly beneath navigation, matching reference 'Paperpillar x Client Team') */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#30313D] tracking-tight">
              {currentStudent.name} · Semester 3
            </h1>
            <span className="p-1 rounded-full bg-emerald-100 text-emerald-700">
              <Leaf className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium flex flex-wrap items-center gap-2">
            <span>{currentStudent.program}</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono font-bold text-slate-600">ID: {currentStudent.rollNo}</span>
            <span className="text-slate-300">|</span>
            <span>{currentStudent.division} ({currentStudent.batch})</span>
          </p>
        </div>

        {/* Right side: Peer Avatars + Action Pill Button */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          {/* Overlapping Avatar Stack (like reference) */}
          <div className="flex items-center -space-x-2">
            {peerAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Peer"
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-2xs"
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-[#2C204F] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-2xs font-mono">
              +10
            </div>
          </div>

          {/* Active Session Status Badge */}
          <div className="px-3.5 py-2 bg-[#E7E6FA] text-[#2C204F] rounded-full text-xs font-bold border border-white shadow-2xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Student Portal</span>
          </div>
        </div>
      </div>

      {/* 2. Main Upper Grid (Asymmetric Composition: Left ~60%, Right ~40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Large White Rounded Container for Assignments (like 'Today Task' in reference) */}
        <div className="lg:col-span-7 bg-white rounded-[34px] p-6 sm:p-7 shadow-diffused border border-white flex flex-col justify-between">
          <div>
            {/* Header: Title + See All */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#30313D] tracking-tight">
                  Upcoming Assignments
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {stats.pendingAssignments} pending tasks ({stats.overdueAssignments} overdue subset)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('assignments')}
                className="text-xs font-bold text-slate-500 hover:text-[#2C204F] bg-[#DCE6EF]/50 hover:bg-[#DCE6EF] px-4 py-1.5 rounded-full border border-white transition-all cursor-pointer"
              >
                See All
              </button>
            </div>

            {/* 3 Horizontal Pastel Cards (Pastel Blue, Lavender, Peach) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Pastel Blue (#C6DDF5) */}
              <div
                className="rounded-3xl bg-[#C6DDF5] p-4.5 flex flex-col justify-between border border-white/70 shadow-2xs hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedRubricAssignment(taskBlue)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#1E2838] bg-white/80 px-2.5 py-0.5 rounded-full border border-white/90">
                      Pending
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-600">
                      {taskBlue.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1E2838] leading-snug line-clamp-2">
                    Supervised Regression
                  </h3>

                  <div className="flex items-center -space-x-1.5 mt-3">
                    {peerAvatars.slice(0, 2).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Collaborator"
                        className="w-5 h-5 rounded-full object-cover border border-white"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/60">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E2838] mb-1.5">
                    <span>Due: Oct 24</span>
                    <span className="font-mono">10/20</span>
                  </div>
                  <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1E2838] rounded-full w-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRubricAssignment(taskBlue);
                    }}
                    className="mt-2 text-[10px] font-bold text-[#1E2838] hover:underline flex items-center gap-1"
                  >
                    <span>View Rubric</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card 2: Pale Lavender (#E7E6FA) */}
              <div
                className="rounded-3xl bg-[#E7E6FA] p-4.5 flex flex-col justify-between border border-white/80 shadow-2xs hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedRubricAssignment(taskLavender)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#2D2347] bg-white/80 px-2.5 py-0.5 rounded-full border border-white/90">
                      Pending
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-600">
                      {taskLavender.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#2D2347] leading-snug line-clamp-2">
                    Balanced BST Trees
                  </h3>

                  <div className="flex items-center -space-x-1.5 mt-3">
                    {peerAvatars.slice(1, 3).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Collaborator"
                        className="w-5 h-5 rounded-full object-cover border border-white"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/60">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#2D2347] mb-1.5">
                    <span>Due: Oct 27</span>
                    <span className="font-mono">15/30</span>
                  </div>
                  <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2D2347] rounded-full w-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRubricAssignment(taskLavender);
                    }}
                    className="mt-2 text-[10px] font-bold text-[#2D2347] hover:underline flex items-center gap-1"
                  >
                    <span>View Rubric</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card 3: Soft Peach (#FFD4C5) - Overdue item! */}
              <div
                className="rounded-3xl bg-[#FFD4C5] p-4.5 flex flex-col justify-between border border-white/80 shadow-2xs hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedRubricAssignment(taskPeach)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-rose-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-white">
                      Overdue
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-600">
                      {taskPeach.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#3F221B] leading-snug line-clamp-2">
                    Cache Simulator
                  </h3>

                  <div className="flex items-center -space-x-1.5 mt-3">
                    {peerAvatars.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Collaborator"
                        className="w-5 h-5 rounded-full object-cover border border-white"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/60">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#3F221B] mb-1.5">
                    <span className="text-rose-700 font-bold">Past: Oct 10</span>
                    <span className="font-mono">0/30</span>
                  </div>
                  <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-700 rounded-full w-1/4" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRubricAssignment(taskPeach);
                    }}
                    className="mt-2 text-[10px] font-bold text-rose-800 hover:underline flex items-center gap-1"
                  >
                    <span>View Rubric</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Analytics (like 'Project Completed' in reference) */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-xl rounded-[34px] p-6 sm:p-7 shadow-diffused border border-white flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#30313D] tracking-tight">
              Attendance Overview
            </h2>
            <span className="text-xs font-mono font-bold text-slate-500">
              Total sessions: {stats.totalClassesHeld}
            </span>
          </div>

          {/* Body: Stats List on left, Concentric Multi-Ring Chart on right */}
          <div className="flex items-center justify-between gap-4 my-auto py-3">
            {/* Stats List */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A98ADA]" />
                  <span className="text-xs text-slate-500 font-medium">Lecture Sessions</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-[#30313D] pl-4.5 mt-0.5">
                  90.5%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EB896E]" />
                  <span className="text-xs text-slate-500 font-medium">Lab Practicals</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-[#30313D] pl-4.5 mt-0.5">
                  92.5%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6AA8E4]" />
                  <span className="text-xs text-slate-500 font-medium">Overall Rate</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-[#30313D] pl-4.5 mt-0.5">
                  {stats.overallAttendancePercentage}%
                </div>
              </div>
            </div>

            {/* Concentric Multi-Ring Progress SVG Chart */}
            <AttendanceRingsChart
              lecturePct={90.5}
              labPct={92.5}
              overallPct={stats.overallAttendancePercentage}
              size={170}
            />
          </div>

          {/* Footer threshold badge */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>75% Statutory Exam Threshold</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cleared for ESE</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Three-Panel Row (Panel 1: Academic Performance, Panel 2: Weekly Timetable, Panel 3: Circulars) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Panel 1: Academic Performance (like 'Rank Performance' in reference) */}
        <div className="bg-white rounded-[32px] p-6 shadow-diffused border border-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-[#30313D] tracking-tight">
                Academic Performance
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('results')}
                className="text-xs font-bold text-slate-500 hover:text-[#2C204F] bg-[#DCE6EF]/50 hover:bg-[#DCE6EF] px-3.5 py-1 rounded-full border border-white transition-all cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3.5">
              {topResults.map((res, i) => (
                <div
                  key={res.subjectCode}
                  className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                        i === 0
                          ? 'bg-[#C6DDF5] text-[#1E2838]'
                          : i === 1
                          ? 'bg-[#E7E6FA] text-[#2D2347]'
                          : 'bg-[#FFD4C5] text-[#3F221B]'
                      }`}
                    >
                      {res.subjectCode.slice(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <strong className="text-xs font-bold text-[#30313D] block truncate">
                        {res.subjectName}
                      </strong>
                      <span className="text-[10px] text-slate-400 block">
                        Grade {res.grade} · {res.credits} Credits
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-600 shrink-0">
                    {res.totalMarks} Marks
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
            <span>SGPA: <strong className="font-mono text-[#2C204F]">{stats.sgpa.toFixed(2)}</strong></span>
            <span className="font-bold text-[#2C204F]">{stats.academicStanding}</span>
          </div>
        </div>

        {/* Panel 2: Weekly Timetable Tracker (like 'Tracker Detail' in reference) */}
        <div className="bg-white rounded-[32px] p-6 shadow-diffused border border-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-extrabold text-[#30313D] tracking-tight">
                Timetable Schedule
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('timetable')}
                className="text-xs font-bold text-slate-500 hover:text-[#2C204F] bg-[#DCE6EF]/50 hover:bg-[#DCE6EF] px-3.5 py-1 rounded-full border border-white transition-all cursor-pointer"
              >
                See All
              </button>
            </div>

            {/* Stylized Capsule Tracker Component */}
            <TimetableCapsuleTracker />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-3">
            <span>Hall 304 & AI Computing Labs</span>
            <span className="font-bold text-[#2C204F] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('timetable')}>
              <span>View Week</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Panel 3: Recent Announcements (like 'Chat' in reference) */}
        <div className="bg-white rounded-[32px] p-6 shadow-diffused border border-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-[#30313D] tracking-tight">
                College Circulars
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('announcements')}
                className="text-xs font-bold text-slate-500 hover:text-[#2C204F] bg-[#DCE6EF]/50 hover:bg-[#DCE6EF] px-3.5 py-1 rounded-full border border-white transition-all cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3">
              {recentNotices.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setSelectedNotice(ann)}
                  className="p-3.5 rounded-2xl bg-[#DCE6EF]/40 hover:bg-[#E7E6FA]/40 transition-colors cursor-pointer border border-white shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#2C204F] bg-white px-2.5 py-0.5 rounded-full border border-white">
                      {ann.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {ann.date}
                    </span>
                  </div>

                  <strong className="text-xs font-bold text-[#30313D] line-clamp-1 block">
                    {ann.title}
                  </strong>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
            <span>Verified Institutional Feed</span>
            <span className="font-bold text-[#2C204F] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('announcements')}>
              <span>All Notices</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Assessment Rubric Modal */}
      {selectedRubricAssignment && (
        <Modal
          isOpen={!!selectedRubricAssignment}
          onClose={() => setSelectedRubricAssignment(null)}
          title={`Assessment Rubric · ${selectedRubricAssignment.code}`}
          description={selectedRubricAssignment.title}
          maxWidth="4xl"
        >
          <div className="space-y-5 text-[#30313D]">
            <div className="p-4 rounded-2xl bg-[#E7E6FA]/70 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sm font-bold text-[#2C204F] block">
                  {selectedRubricAssignment.subject} · {selectedRubricAssignment.faculty}
                </strong>
                <span className="text-xs text-slate-600 mt-0.5 block">
                  Format: {selectedRubricAssignment.submissionType} · Due: {selectedRubricAssignment.dueDate}
                </span>
              </div>
              <div className="px-4 py-2 bg-white rounded-2xl border border-white shadow-2xs text-center shrink-0">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Weightage</span>
                <span className="text-lg font-mono font-extrabold text-[#2C204F]">
                  {selectedRubricAssignment.maxMarks} Marks
                </span>
              </div>
            </div>

            {selectedRubricAssignment.rubric?.generalNotes && (
              <div className="p-3.5 rounded-2xl bg-[#C6DDF5]/50 border border-white text-xs text-slate-700">
                <strong>Evaluation Guideline: </strong>
                {selectedRubricAssignment.rubric.generalNotes}
              </div>
            )}

            <div className="space-y-3">
              {selectedRubricAssignment.rubric?.criteria.map((c, i) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-[#2C204F]">
                      Criterion {i + 1}: {c.name}
                    </span>
                    <span className="text-xs font-mono font-bold bg-[#E7E6FA] text-[#2C204F] px-2.5 py-0.5 rounded-full">
                      {c.maxMarks} Marks
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{c.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                    {c.levels.map((lvl) => (
                      <div key={lvl.level} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[10px]">{lvl.level}</span>
                          <span className="font-mono text-[10px] font-bold">{lvl.scoreRange}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">{lvl.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedRubricAssignment(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl transition-colors shadow-sm"
              >
                Close Rubric
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Notice Reader Modal */}
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
            <p>{selectedNotice.content}</p>
            {selectedNotice.attachmentName && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-600">{selectedNotice.attachmentName}</span>
                <span className="font-bold text-[#2C204F]">Official Document</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
