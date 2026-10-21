/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  User,
  ArrowRight,
  Sparkles,
  Lock,
  BookOpen,
  CalendarDays,
  FileCheck2,
  Megaphone,
  CheckCircle2
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { UserRole } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';

export const LoginPage: React.FC = () => {
  const { login, currentStudent, currentAdmin } = usePortal();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [userIdInput, setUserIdInput] = useState('24CSAIML042');
  const [passwordInput, setPasswordInput] = useState('••••••••');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setUserIdInput(currentStudent.rollNo);
    } else {
      setUserIdInput(currentAdmin.employeeId);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#DCE6EF] bg-canvas-pattern flex flex-col justify-between p-4 sm:p-6 lg:p-10 text-[#30313D]">
      {/* Top Header Monogram */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#2C204F] text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-[#A98ADA]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#2C204F] tracking-wide uppercase">
              Academic Portal
            </div>
            <div className="text-base font-extrabold text-[#2C204F] leading-tight">
              Smart Student Portal
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white text-xs font-semibold text-[#2C204F] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Semester 3 CSE (AI/ML) · Active Session</span>
        </div>
      </div>

      {/* Main Center Auth Container */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7E6FA] text-[#2C204F] text-xs font-bold border border-white">
              <Sparkles className="w-3.5 h-3.5 text-[#A98ADA]" />
              <span>Multi-Role Academic Gateway</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C204F] tracking-tight leading-tight">
              Unified Academic Management System
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seamlessly connects student coursework submissions, biometric attendance compliance, examination grade sheets, and faculty administrative operations.
            </p>
          </div>

          {/* Persona Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div
              onClick={() => handleRoleSelect('student')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-[#C6DDF5] border-white shadow-diffused ring-2 ring-[#2C204F]/20'
                  : 'bg-white/70 hover:bg-white/90 border-white/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#1E2838] uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full">
                  Student Persona
                </span>
                {selectedRole === 'student' && <CheckCircle2 className="w-4 h-4 text-[#2C204F]" />}
              </div>
              <strong className="text-sm font-bold text-[#2C204F] block">
                {currentStudent.name}
              </strong>
              <span className="text-xs text-slate-600 block mt-0.5">
                Roll: {currentStudent.rollNo}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Semester 3 · CSE (AI/ML)
              </span>
            </div>

            <div
              onClick={() => handleRoleSelect('admin')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-[#E7E6FA] border-white shadow-diffused ring-2 ring-[#2C204F]/20'
                  : 'bg-white/70 hover:bg-white/90 border-white/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#2D2347] uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full">
                  Faculty / Admin Persona
                </span>
                {selectedRole === 'admin' && <CheckCircle2 className="w-4 h-4 text-[#2C204F]" />}
              </div>
              <strong className="text-sm font-bold text-[#2C204F] block">
                {currentAdmin.name}
              </strong>
              <span className="text-xs text-slate-600 block mt-0.5">
                ID: {currentAdmin.employeeId}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Head of Department
              </span>
            </div>
          </div>
        </div>

        {/* Right Sign-in Card */}
        <div className="lg:col-span-6">
          <div className="bg-white/85 backdrop-blur-xl p-7 sm:p-9 rounded-3xl border border-white/95 shadow-diffused-lg space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#2C204F] tracking-tight">
                Institutional Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your academic role and access the dedicated telemetry workspace.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="flex p-1 bg-[#DCE6EF]/70 rounded-2xl border border-white/80">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'student'
                    ? 'bg-white text-[#2C204F] shadow-xs'
                    : 'text-slate-600 hover:text-[#2C204F]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-white text-[#2C204F] shadow-xs'
                    : 'text-slate-600 hover:text-[#2C204F]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Faculty / Admin</span>
              </button>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2C204F] mb-1.5">
                  {selectedRole === 'student' ? 'Student Roll Number / Institutional ID' : 'Faculty Employee ID'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={userIdInput}
                    onChange={(e) => setUserIdInput(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white/80 rounded-2xl text-[#30313D] font-mono focus:outline-none focus:ring-2 focus:ring-[#2C204F]/30 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C204F] mb-1.5">
                  Password / Campus Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white/80 rounded-2xl text-[#30313D] focus:outline-none focus:ring-2 focus:ring-[#2C204F]/30 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* 1-Click Demo Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#2C204F] hover:bg-[#3D2D6B] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Log In as {selectedRole === 'student' ? 'Student (Parth Gadhiya)' : 'Faculty Admin (Dr. Deshmukh)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="p-3 bg-[#FFD4C5]/40 rounded-2xl border border-white/60 text-[11px] text-slate-600 text-center">
                Institutional Demo: Click the button above for instant 1-click credentialed access.
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center text-xs text-slate-500 py-4 border-t border-white/60">
        Smart Student Portal · Department of Computer Engineering · Winter 2026 ESE
      </div>
    </div>
  );
};
