/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  IdCard,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import { usePortal, NavTab } from '../../context/PortalContext';
import { Modal } from '../common/Modal';

export const FloatingNavbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUserRole,
    currentStudent,
    currentAdmin,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    assignments
  } = usePortal();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showIdCard, setShowIdCard] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setNotifOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleProfileMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setProfileOpen(true);
  };

  const handleProfileMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Generous buffer so moving pointer smoothly to the dropdown never drops
    hoverTimeoutRef.current = setTimeout(() => {
      setProfileOpen(false);
    }, 240);
  };

  const navItems: { id: NavTab; label: string }[] = isStudent
    ? [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'assignments', label: 'Assignments' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'timetable', label: 'Timetable' },
        { id: 'results', label: 'Results' },
        { id: 'announcements', label: 'Announcements' },
      ]
    : [
        { id: 'admin-overview', label: 'Dashboard' },
        { id: 'assignments', label: 'Coursework' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'timetable', label: 'Timetable' },
        { id: 'results', label: 'Results' },
        { id: 'announcements', label: 'Circulars' },
      ];

  const handleNotificationClick = (id: string, targetTab: NavTab) => {
    markNotificationAsRead(id);
    setActiveTab(targetTab);
    setNotifOpen(false);
  };

  const filteredSearchResults = searchQuery.trim()
    ? assignments.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Floating Pill Top Navigation Bar */}
      <nav
        className="w-full bg-white/90 backdrop-blur-xl rounded-full px-5 py-3 border border-white shadow-[0_10px_30px_rgba(44,32,79,0.06)] flex items-center justify-between gap-4 relative z-30"
        aria-label="Main Navigation"
      >
        {/* Far Left: Portal Logo / Name */}
        <div
          onClick={() => setActiveTab(isStudent ? 'dashboard' : 'admin-overview')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#2C204F] text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5 text-[#A98ADA]" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold text-[#30313D] tracking-tight">
            Smart Portal
          </span>
        </div>

        {/* Center: Horizontal Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`transition-all duration-200 cursor-pointer text-xs sm:text-sm font-semibold rounded-full px-5 py-2 ${
                  isActive
                    ? 'bg-[#2C204F] text-white shadow-xs'
                    : 'text-slate-500 hover:text-[#30313D] hover:bg-slate-100/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Far Right: Search, Notifications, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger Icon */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-slate-500 hover:text-[#30313D] hover:bg-slate-100/80 rounded-full transition-colors cursor-pointer"
            title="Search courses & assignments"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="p-2 text-slate-500 hover:text-[#30313D] hover:bg-slate-100/80 rounded-full transition-colors cursor-pointer relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(44,32,79,0.18)] border border-white overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-[#30313D]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-bold text-[#2C204F]">Notifications</strong>
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
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.id, notif.targetTab)}
                      className={`p-3.5 text-xs cursor-pointer transition-colors flex items-start gap-3 ${
                        notif.read ? 'bg-white hover:bg-slate-50' : 'bg-[#E7E6FA]/40 hover:bg-[#E7E6FA]/70'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs shrink-0 mt-0.5">
                        <Bell className="w-3.5 h-3.5 text-[#2C204F]" />
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Area: Simplified to circular avatar with smooth hover-triggered dropdown */}
          <div
            className="relative"
            ref={profileRef}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setProfileOpen((prev) => !prev);
                }
              }}
              className={`relative p-0.5 rounded-full transition-all duration-300 ease-out cursor-pointer flex items-center justify-center shrink-0 focus:outline-hidden focus:ring-2 focus:ring-[#A98ADA] focus:ring-offset-2 ${
                profileOpen ? 'scale-105 ring-2 ring-[#A98ADA]/80 shadow-md' : 'hover:scale-105'
              }`}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label={`Profile menu for ${isStudent ? currentStudent.name : currentAdmin.name}`}
            >
              <img
                src={isStudent ? currentStudent.avatarUrl : currentAdmin.avatarUrl}
                alt={isStudent ? currentStudent.name : currentAdmin.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-xs transition-all duration-300 ring-1 ring-slate-200/60"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* Smooth Animated Profile Dropdown (Revealed on Hover or Tap) */}
            <div
              className={`absolute right-0 top-full pt-2 w-52 sm:w-60 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top-right ${
                profileOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                  : 'opacity-0 -translate-y-2.5 scale-95 pointer-events-none invisible'
              }`}
            >
              <div
                role="menu"
                aria-orientation="vertical"
                className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_rgba(44,32,79,0.18),0_0_0_1px_rgba(255,255,255,0.9)] border border-slate-100/80 p-2 text-[#30313D] select-none"
              >
                {/* User Information Header */}
                <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <p className="text-xs font-bold text-[#2C204F] truncate">
                      {isStudent ? currentStudent.name : currentAdmin.name}
                    </p>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate pl-4">
                    {isStudent ? currentStudent.rollNo : currentAdmin.employeeId} · {isStudent ? 'Student' : 'Faculty'}
                  </p>
                </div>

                {/* ID Card action */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setShowIdCard(true);
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#2C204F] hover:bg-[#E7E6FA]/80 rounded-xl transition-all duration-200 cursor-pointer group text-left hover:translate-x-1"
                >
                  <IdCard className="w-4 h-4 text-[#A98ADA] group-hover:text-[#2C204F] group-hover:scale-110 transition-all shrink-0" />
                  <span>ID Card</span>
                </button>

                {/* Sign Out action */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50/90 rounded-xl transition-all duration-200 cursor-pointer group text-left border-t border-slate-100/80 mt-1 pt-2 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="w-4 h-4 text-rose-500 group-hover:text-rose-700 group-hover:rotate-6 transition-all shrink-0" />
                    <span>Sign Out</span>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    End Session
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-slate-500 hover:text-[#30313D] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-xl border border-white p-3 z-50 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#2C204F] text-white'
                      : 'text-slate-600 hover:bg-[#E7E6FA]/60 hover:text-[#2C204F]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <Modal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          title="Search Academic Portal"
          description="Find assignments, courses, and syllabus topics"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type course code, topic, or faculty name..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchQuery && filteredSearchResults.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No matching courses found</p>
              ) : (
                filteredSearchResults.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setActiveTab('assignments');
                      setSearchModalOpen(false);
                    }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-[#E7E6FA]/50 cursor-pointer transition-colors"
                  >
                    <span className="font-mono text-[10px] font-bold text-[#2C204F] block">
                      {a.code} · {a.subject}
                    </span>
                    <strong className="text-xs font-bold text-[#30313D] block">{a.title}</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Identity Card Modal (Supports both Student & Faculty) */}
      {showIdCard && (
        <Modal
          isOpen={showIdCard}
          onClose={() => setShowIdCard(false)}
          title={isStudent ? "Student Identity Card" : "Faculty Identity Card"}
          description="Verified Institutional Academic Credential"
          maxWidth="md"
        >
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2C204F] to-[#1E1638] text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#A98ADA]" />
                <span className="text-xs font-bold tracking-tight">Smart Student Portal</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                {isStudent ? (currentStudent.admissionStatus || 'Active Regular') : 'Active Faculty'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={isStudent ? currentStudent.avatarUrl : currentAdmin.avatarUrl}
                alt={isStudent ? currentStudent.name : currentAdmin.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <strong className="text-base font-bold block truncate">
                  {isStudent ? currentStudent.name : currentAdmin.name}
                </strong>
                <span className="text-xs font-mono text-[#A98ADA] block">
                  {isStudent ? currentStudent.rollNo : currentAdmin.employeeId}
                </span>
                <span className="text-xs text-white/80 block mt-0.5 truncate">
                  {isStudent ? currentStudent.program : currentAdmin.title}
                </span>
                <span className="text-[11px] text-white/60 block truncate">
                  {isStudent ? currentStudent.department : currentAdmin.department}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-white/70 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono">
              {isStudent ? (
                <>
                  <span>Sem {currentStudent.semester} · Div {currentStudent.division}</span>
                  <span>Mentor: {currentStudent.mentor}</span>
                </>
              ) : (
                <>
                  <span>Role: Faculty Admin</span>
                  <span>{currentAdmin.email}</span>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
