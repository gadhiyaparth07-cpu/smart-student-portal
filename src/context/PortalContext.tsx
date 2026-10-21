/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  StudentProfile,
  AdminProfile,
  StudentRosterItem,
  UserRole,
  Assignment,
  AttendanceRecord,
  TimetableSlot,
  ExamResult,
  Announcement,
  NotificationItem,
  StudentClassResult
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_ADMIN_PROFILE,
  INITIAL_STUDENT_ROSTER,
  INITIAL_ASSIGNMENTS,
  INITIAL_ATTENDANCE,
  INITIAL_TIMETABLE,
  INITIAL_RESULTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CLASS_RESULTS
} from '../data/mockData';

export type NavTab =
  | 'dashboard'
  | 'assignments'
  | 'attendance'
  | 'timetable'
  | 'results'
  | 'announcements'
  | 'admin-overview';

interface PortalContextType {
  // Authentication & Role
  currentUserRole: UserRole;
  currentStudent: StudentProfile;
  currentAdmin: AdminProfile;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  isPreviewMode: boolean;

  // Active navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Academic Records
  assignments: Assignment[];
  attendance: AttendanceRecord[];
  timetable: TimetableSlot[];
  results: ExamResult[];
  classResults: StudentClassResult[];
  announcements: Announcement[];
  studentRoster: StudentRosterItem[];

  // Admin Actions
  addAnnouncement: (ann: Omit<Announcement, 'id'>) => void;

  // Notification System
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Core Aggregations & Calculations
  stats: {
    totalClassesAttended: number;
    totalClassesHeld: number;
    overallAttendancePercentage: number;
    totalAssignments: number;
    pendingAssignments: number;
    activePendingAssignments: number;
    completedAssignments: number;
    overdueAssignments: number;
    unsubmittedAssignments: number;
    totalMarksObtained: number;
    totalMaxMarks: number;
    averageMarksPercentage: number;
    sgpa: number;
    totalCredits: number;
    academicStanding: string;
    nextDeadline: {
      code: string;
      title: string;
      date: string;
      daysRemaining: number;
    } | null;
  };
}

const STORAGE_KEYS = {
  AUTH_ROLE: 'ssp_user_role_v3',
  AUTH_IS_LOGGED_IN: 'ssp_auth_logged_in_v3',
  READ_NOTIFS: 'ssp_read_notifications_v3',
  CUSTOM_ANNOUNCEMENTS: 'ssp_custom_announcements_v3',
};

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State (default to true for instant demo evaluation, but supports logout and role switching)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH_IS_LOGGED_IN);
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH_ROLE);
      return stored === 'admin' ? 'admin' : 'student';
    } catch {
      return 'student';
    }
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  const currentStudent = INITIAL_STUDENT_PROFILE;
  const currentAdmin = INITIAL_ADMIN_PROFILE;
  const studentRoster = INITIAL_STUDENT_ROSTER;
  const isPreviewMode = true;

  // Read-only Academic Data
  const assignments = INITIAL_ASSIGNMENTS;
  const attendance = INITIAL_ATTENDANCE;
  const timetable = INITIAL_TIMETABLE;
  const results = INITIAL_RESULTS;

  // Announcements with admin add capability
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_ANNOUNCEMENTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // Persist auth & announcements
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_IS_LOGGED_IN, JSON.stringify(isAuthenticated));
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_ROLE, currentUserRole);
    } catch {
      // ignore
    }
  }, [currentUserRole]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch {
      // ignore
    }
  }, [announcements]);

  const login = (role: UserRole) => {
    setCurrentUserRole(role);
    setIsAuthenticated(true);
    setActiveTab(role === 'admin' ? 'admin-overview' : 'dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setRole = (role: UserRole) => {
    setCurrentUserRole(role);
    if (role === 'admin' && activeTab === 'dashboard') {
      setActiveTab('admin-overview');
    } else if (role === 'student' && activeTab === 'admin-overview') {
      setActiveTab('dashboard');
    }
  };

  const addAnnouncement = (newAnn: Omit<Announcement, 'id'>) => {
    const created: Announcement = {
      ...newAnn,
      id: `ann-custom-${Date.now()}`
    };
    setAnnouncements((prev) => [created, ...prev]);
  };

  // Read notification tracker
  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.READ_NOTIFS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.READ_NOTIFS, JSON.stringify(readNotifIds));
    } catch {
      // Storage quota or sandboxed
    }
  }, [readNotifIds]);

  // Derived Academic Statistics
  const stats = useMemo(() => {
    // 1. Attendance Math
    const totalClassesAttended = attendance.reduce((sum, item) => sum + item.attended, 0);
    const totalClassesHeld = attendance.reduce((sum, item) => sum + item.total, 0);
    const overallAttendancePercentage =
      totalClassesHeld > 0 ? Number(((totalClassesAttended / totalClassesHeld) * 100).toFixed(1)) : 0;

    // 2. Assignment Counts (Pending includes all incomplete assignments; Overdue is a subset)
    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter((a) => a.status === 'completed').length;
    const pendingAssignments = assignments.filter((a) => a.status !== 'completed').length; // All incomplete (4)
    const overdueAssignments = assignments.filter((a) => a.status === 'overdue').length;   // Overdue subset (1)
    const activePendingAssignments = assignments.filter((a) => a.status === 'pending').length; // Active upcoming (3)
    const unsubmittedAssignments = pendingAssignments;

    // 3. Examination & Grade Calculations
    const totalMarksObtained = results.reduce((sum, item) => sum + item.totalMarks, 0);
    const totalMaxMarks = results.length * 100;
    const averageMarksPercentage =
      totalMaxMarks > 0 ? Number(((totalMarksObtained / totalMaxMarks) * 100).toFixed(2)) : 0;

    const totalCredits = results.reduce((sum, item) => sum + item.credits, 0);
    const totalWeightedPoints = results.reduce((sum, item) => sum + item.gradePoint * item.credits, 0);
    const sgpa = totalCredits > 0 ? Number((totalWeightedPoints / totalCredits).toFixed(2)) : 0;

    let academicStanding = 'First Class with Distinction';
    if (sgpa < 6.0) academicStanding = 'Pass Standard';
    else if (sgpa < 7.0) academicStanding = 'Second Class';
    else if (sgpa < 8.0) academicStanding = 'First Class';

    // 4. Upcoming Deadline Calculation
    const pendingList = [...assignments]
      .filter((a) => a.status === 'pending')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    let nextDeadline = null;
    if (pendingList.length > 0) {
      const nearest = pendingList[0];
      const today = new Date('2026-10-20').getTime(); // Reference semester date
      const due = new Date(nearest.dueDate).getTime();
      const diffDays = Math.max(0, Math.ceil((due - today) / (1000 * 60 * 60 * 24)));
      nextDeadline = {
        code: nearest.code,
        title: nearest.title,
        date: nearest.dueDate,
        daysRemaining: diffDays,
      };
    }

    return {
      totalClassesAttended,
      totalClassesHeld,
      overallAttendancePercentage,
      totalAssignments,
      pendingAssignments,
      activePendingAssignments,
      completedAssignments,
      overdueAssignments,
      unsubmittedAssignments,
      totalMarksObtained,
      totalMaxMarks,
      averageMarksPercentage,
      sgpa,
      totalCredits,
      academicStanding,
      nextDeadline,
    };
  }, [attendance, assignments, results]);

  // Dynamic notification alerts
  const notifications: NotificationItem[] = useMemo(() => {
    const items: NotificationItem[] = [];

    // Important notices
    announcements
      .filter((a) => a.isImportant)
      .slice(0, 2)
      .forEach((ann) => {
        items.push({
          id: `notif-ann-${ann.id}`,
          title: ann.title,
          message: `${ann.department} · ${ann.category}`,
          time: ann.date,
          type: 'announcement',
          read: readNotifIds.includes(`notif-ann-${ann.id}`),
          targetTab: 'announcements',
        });
      });

    // Upcoming pending deadlines
    assignments
      .filter((a) => a.status === 'pending')
      .slice(0, 2)
      .forEach((asg) => {
        items.push({
          id: `notif-asg-${asg.id}`,
          title: `Submission Due: ${asg.title}`,
          message: `${asg.code} ${asg.subject} · Due ${asg.dueDate}`,
          time: asg.dueDate,
          type: 'assignment',
          read: readNotifIds.includes(`notif-asg-${asg.id}`),
          targetTab: 'assignments',
        });
      });

    // Overdue alert if any
    const overdueAsg = assignments.find((a) => a.status === 'overdue');
    if (overdueAsg) {
      items.push({
        id: `notif-asg-overdue-${overdueAsg.id}`,
        title: `Action Overdue: ${overdueAsg.code} ${overdueAsg.title}`,
        message: `Submission deadline was ${overdueAsg.dueDate}. Please consult ${overdueAsg.faculty}.`,
        time: overdueAsg.dueDate,
        type: 'assignment',
        read: readNotifIds.includes(`notif-asg-overdue-${overdueAsg.id}`),
        targetTab: 'assignments',
      });
    }

    // Low attendance notice if any subject falls below 75%
    const lowAtt = attendance.find((a) => a.attended / a.total < 0.75);
    if (lowAtt) {
      const pct = ((lowAtt.attended / lowAtt.total) * 100).toFixed(1);
      items.push({
        id: `notif-att-${lowAtt.subjectCode}`,
        title: `Attendance Advisory: ${lowAtt.subjectCode} (${pct}%)`,
        message: `${lowAtt.subjectName} is below the 75% examination threshold.`,
        time: 'Active Advisory',
        type: 'attendance',
        read: readNotifIds.includes(`notif-att-${lowAtt.subjectCode}`),
        targetTab: 'attendance',
      });
    }

    return items;
  }, [announcements, assignments, attendance, readNotifIds]);

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setReadNotifIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const markAllNotificationsAsRead = () => {
    setReadNotifIds(notifications.map((n) => n.id));
  };

  return (
    <PortalContext.Provider
      value={{
        currentUserRole,
        currentStudent,
        currentAdmin,
        isAuthenticated,
        login,
        logout,
        setRole,
        isPreviewMode,
        activeTab,
        setActiveTab,
        assignments,
        attendance,
        timetable,
        results,
        classResults: INITIAL_CLASS_RESULTS,
        announcements,
        studentRoster,
        addAnnouncement,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        stats,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
