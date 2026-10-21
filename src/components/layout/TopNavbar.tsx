/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  LogOut,
  RefreshCw,
  Award,
  ChevronDown,
  Building2,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { usePortal, NavTab } from '../../context/PortalContext';
import { Modal } from '../common/Modal';

interface TopNavbarProps {
  setMobileOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ setMobileOpen }) => {
  const {
    activeTab,
    setActiveTab,
    currentUserRole,
    currentStudent,
    currentAdmin,
    setRole,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = usePortal();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isStudent = currentUserRole === 'student';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabMeta: Record<NavTab, { title: string; sectionName: string }> = {
    dashboard: { title: 'Academic Performance & Schedule', sectionName: 'Student Dashboard' },
    assignments: { title: 'Term Work Submissions & Rubrics', sectionName: 'Assignments' },
    attendance: { title: 'Biometric Attendance Tracking', sectionName: 'Attendance' },
    timetable: { title: 'Lecture & Practical Schedule', sectionName: 'Timetable' },
    results: { title: 'Provisional Examination Performance', sectionName: 'Results & SGPA' },
    announcements: { title: 'College Circulars & Notices', sectionName: 'Announcements' },
    'admin-overview': { title: 'Departmental Analytics & Student Tracking', sectionName: 'Faculty Overview' },
  };

  const handleNotificationClick = (id: string, targetTab: NavTab) => {
    markNotificationAsRead(id);
    setActiveTab(targetTab);
    setNotifOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-18 bg-white/75 backdrop-blur-xl border-b border-white/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-2xs">
        {/* Left: Mobile hamburger + Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 text-slate-500 hover:text-[#2C204F] hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
            <span className="font-semibold text-slate-400 hidden sm:inline">
              Portal
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-bold text-[#2C204F] truncate tracking-tight">
              {tabMeta[activeTab]?.sectionName || 'Dashboard'}
            </span>
            <span className="hidden md:inline text-slate-300">·</span>
            <span className="hidden md:inline text-xs text-slate-500 truncate max-w-xs font-medium">
              {tabMeta[activeTab]?.title}
            </span>
          </div>
        </div>

        {/* Right: Role indicator, Notifications, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Quick Role Switcher Chip */}
          <button
            type="button"
            onClick={() => setRole(isStudent ? 'admin' : 'student')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E7E6FA]/80 hover:bg-[#E7E6FA] text-xs font-bold text-[#2C204F] border border-white transition-all cursor-pointer shadow-2xs"
            title="Click to toggle between Student and Faculty Admin mode"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#A98ADA]" />
            <span>Role: {isStudent ? 'Student' : 'Faculty Admin'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative p-2 text-slate-600 hover:text-[#2C204F] hover:bg-slate-100/80 rounded-2xl transition-colors cursor-pointer border border-white/80 bg-white/60 shadow-2xs"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(44,32,79,0.18)] border border-white overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 text-[#30313D]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-bold text-[#2C204F]">Academic Alerts</strong>
                    <span className="text-[10px] font-mono font-bold bg-[#E7E6FA] text-[#2C204F] px-2 py-0.5 rounded-full">
                      {unreadNotificationCount} unread
                    </span>
                  </div>
                  {unreadNotificationCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] font-semibold text-[#A98ADA] hover:text-[#2C204F] cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications at this time
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id, notif.targetTab)}
                        className={`p-3.5 text-xs cursor-pointer transition-colors flex items-start gap-3 ${
                          notif.read ? 'bg-white hover:bg-slate-50' : 'bg-[#E7E6FA]/40 hover:bg-[#E7E6FA]/60'
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs shrink-0 mt-0.5">
                          {notif.type === 'assignment' ? (
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                          ) : notif.type === 'attendance' ? (
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Bell className="w-3.5 h-3.5 text-[#A98ADA]" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-xs font-bold text-[#2C204F] block truncate">
                            {notif.title}
                          </strong>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {notif.message}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block mt-1">
                            {notif.time}
                          </span>
                        </div>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Popover */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl border border-white/80 bg-white/70 hover:bg-white transition-all shadow-2xs text-left cursor-pointer"
            >
              <img
                src={isStudent ? currentStudent.avatarUrl : currentAdmin.avatarUrl}
                alt={isStudent ? currentStudent.name : currentAdmin.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:block leading-tight">
                <span className="text-xs font-bold text-[#2C204F] block truncate max-w-[120px]">
                  {isStudent ? currentStudent.name : currentAdmin.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {isStudent ? currentStudent.rollNo : currentAdmin.employeeId}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(44,32,79,0.18)] border border-white overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 text-[#30313D]">
                <div className="p-4 border-b border-slate-100 bg-[#DCE6EF]/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={isStudent ? currentStudent.avatarUrl : currentAdmin.avatarUrl}
                      alt={isStudent ? currentStudent.name : currentAdmin.name}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-2xs"
                    />
                    <div className="min-w-0">
                      <strong className="text-xs font-bold text-[#2C204F] block truncate">
                        {isStudent ? currentStudent.name : currentAdmin.name}
                      </strong>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        {isStudent ? currentStudent.rollNo : currentAdmin.employeeId}
                      </span>
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-[#2C204F] bg-[#E7E6FA] px-2 py-0.5 rounded-full">
                        {isStudent ? 'Enrolled Student' : 'Faculty Administrator'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-1 text-xs">
                  {isStudent && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowIdCard(true);
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-[#2C204F] hover:bg-[#E7E6FA]/60 rounded-xl transition-colors text-left font-medium cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#A98ADA]" />
                      <span>Digital Student Identity Card</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setRole(isStudent ? 'admin' : 'student');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-[#2C204F] hover:bg-[#E7E6FA]/60 rounded-xl transition-colors text-left font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                    <span>Switch to {isStudent ? 'Faculty Admin Role' : 'Student Role'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left font-semibold cursor-pointer border-t border-slate-100 mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Digital Student Identity Card Modal */}
      {showIdCard && (
        <Modal
          isOpen={showIdCard}
          onClose={() => setShowIdCard(false)}
          title="Digital Academic Credential"
          description="Verified Institutional Identification Card"
          maxWidth="md"
        >
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2C204F] to-[#1E1638] text-white shadow-xl relative overflow-hidden space-y-5">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-[#A98ADA]" />
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-white/90">
                    Department of Computer Engineering
                  </h4>
                  <span className="text-[10px] text-white/60">Autumn Semester 2026</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Active Regular
              </span>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white truncate">
                  {currentStudent.name}
                </h3>
                <span className="text-xs font-mono text-[#A98ADA] font-bold block">
                  Roll: {currentStudent.rollNo}
                </span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  B.Tech CSE (AI & ML) · Semester 3
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/80 relative z-10">
              <div>
                <span className="text-[10px] text-white/50 block">Division & Batch</span>
                <strong className="text-white font-mono">{currentStudent.division} ({currentStudent.batch})</strong>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block">Faculty Mentor</span>
                <strong className="text-white truncate block">{currentStudent.mentor}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/50 relative z-10">
              <span>Card ID: {currentStudent.id}</span>
              <span>Valid Through: 2028</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
