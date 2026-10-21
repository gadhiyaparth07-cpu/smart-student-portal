/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { FloatingNavbar } from './components/layout/FloatingNavbar';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { TimetableView } from './components/timetable/TimetableView';
import { ResultsView } from './components/results/ResultsView';
import { AnnouncementsView } from './components/announcements/AnnouncementsView';
import { AdminOverviewView } from './components/admin/AdminOverviewView';

const PortalMainContent: React.FC = () => {
  const { activeTab, isAuthenticated } = usePortal();

  // If not authenticated, render LoginPage
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'attendance':
        return <AttendanceView />;
      case 'timetable':
        return <TimetableView />;
      case 'results':
        return <ResultsView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'admin-overview':
        return <AdminOverviewView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#DCE6EF] bg-canvas-pattern text-[#30313D] p-3 sm:p-6 lg:p-10 flex items-center justify-center font-sans">
      {/* Reference Image Composition: Centered Floating Rounded Workspace */}
      <div className="max-w-[1440px] w-full bg-white/75 backdrop-blur-2xl rounded-[36px] sm:rounded-[44px] border border-white/95 shadow-[0_20px_60px_-10px_rgba(44,32,79,0.12)] p-4 sm:p-7 lg:p-9 flex flex-col gap-6 relative min-h-[92vh]">
        {/* Floating Pill-Shaped Top Navigation */}
        <FloatingNavbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PortalProvider>
      <PortalMainContent />
    </PortalProvider>
  );
}
