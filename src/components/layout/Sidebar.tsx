/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  UserCheck2,
  CalendarDays,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  Building2,
  Sparkles,
  ChevronRight,
  LogOut,
  RefreshCw,
  User
} from 'lucide-react';
import { usePortal, NavTab } from '../../context/PortalContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    activeTab,
    setActiveTab,
    currentUserRole,
    currentStudent,
    currentAdmin,
    setRole,
    logout,
    stats,
    announcements,
  } = usePortal();

  const importantCount = announcements.filter((a) => a.isImportant).length;
  const isAttendanceLow = stats.overallAttendancePercentage < 75;

  const isStudent = currentUserRole === 'student';

  const navItems: {
    id: NavTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = isStudent
    ? [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
        {
          id: 'assignments',
          label: 'Assignments',
          icon: FileCheck2,
          badge: stats.pendingAssignments > 0 ? stats.pendingAssignments : undefined,
          badgeColor: 'bg-[#C6DDF5] text-[#1E2838]',
        },
        {
          id: 'attendance',
          label: 'Attendance',
          icon: UserCheck2,
          badge: `${stats.overallAttendancePercentage}%`,
          badgeColor: isAttendanceLow ? 'bg-[#FFD4C5] text-[#3F221B]' : 'bg-[#E7E6FA] text-[#2C204F]',
        },
        {
          id: 'timetable',
          label: 'Timetable',
          icon: CalendarDays,
        },
        {
          id: 'results',
          label: 'Results & SGPA',
          icon: GraduationCap,
          badge: stats.sgpa.toFixed(2),
          badgeColor: 'bg-[#E7E6FA] text-[#2C204F]',
        },
        {
          id: 'announcements',
          label: 'Announcements',
          icon: Megaphone,
          badge: importantCount > 0 ? `${importantCount}` : undefined,
          badgeColor: 'bg-[#FFD4C5] text-[#3F221B]',
        },
      ]
    : [
        {
          id: 'admin-overview',
          label: 'Faculty Overview',
          icon: ShieldCheck,
        },
        {
          id: 'assignments',
          label: 'Coursework & Rubrics',
          icon: FileCheck2,
          badge: stats.totalAssignments,
          badgeColor: 'bg-[#C6DDF5] text-[#1E2838]',
        },
        {
          id: 'attendance',
          label: 'Cohort Attendance',
          icon: UserCheck2,
          badge: '84.6%',
          badgeColor: 'bg-[#E7E6FA] text-[#2C204F]',
        },
        {
          id: 'timetable',
          label: 'Master Timetable',
          icon: CalendarDays,
        },
        {
          id: 'results',
          label: 'Exam Grade Cards',
          icon: GraduationCap,
          badge: '8.62 Avg',
          badgeColor: 'bg-[#E7E6FA] text-[#2C204F]',
        },
        {
          id: 'announcements',
          label: 'Notices & Circulars',
          icon: Megaphone,
          badge: announcements.length,
          badgeColor: 'bg-[#FFD4C5] text-[#3F221B]',
        },
      ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const handleSwitchRole = () => {
    setRole(isStudent ? 'admin' : 'student');
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/85 backdrop-blur-xl border-r border-white/90 shadow-diffused flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Monogram & Institution Branding */}
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2C204F] text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-[#A98ADA]" />
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  Semester 3 CSE
                </span>
                <span className="text-sm font-extrabold text-[#2C204F]">
                  Smart Student Portal
                </span>
              </div>
            </div>
          </div>

          {/* Role Status Tag */}
          <div className="px-5 pt-4 pb-2">
            <div className="p-2.5 rounded-2xl bg-[#DCE6EF]/60 border border-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[#2C204F]">
                  {isStudent ? 'Student View' : 'Admin View'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSwitchRole}
                className="text-[10px] font-bold text-[#2C204F] bg-white px-2 py-0.5 rounded-lg border border-white shadow-2xs hover:bg-[#2C204F] hover:text-white transition-colors cursor-pointer"
                title="Switch active role"
              >
                Switch
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#2C204F] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#2C204F] hover:bg-[#E7E6FA]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#A98ADA]' : 'text-slate-500 group-hover:text-[#2C204F]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={isStudent ? currentStudent.avatarUrl : currentAdmin.avatarUrl}
                alt={isStudent ? currentStudent.name : currentAdmin.name}
                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <strong className="text-xs font-bold text-[#2C204F] block truncate">
                  {isStudent ? currentStudent.name : currentAdmin.name}
                </strong>
                <span className="text-[10px] font-mono text-slate-500 block truncate">
                  {isStudent ? currentStudent.rollNo : currentAdmin.employeeId}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-center text-slate-400">
            Winter 2026 ESE · AI Assisted Portal
          </div>
        </div>
      </aside>
    </>
  );
};
