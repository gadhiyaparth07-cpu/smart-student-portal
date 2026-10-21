/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  UserCheck2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Search,
  Sparkles,
  ShieldCheck,
  Activity,
  Calculator
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { SubjectType } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';

export const AttendanceView: React.FC = () => {
  const { attendance, stats } = usePortal();
  const [typeFilter, setTypeFilter] = useState<'all' | SubjectType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered attendance records
  const filteredAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesSearch =
        item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.faculty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [attendance, typeFilter, searchQuery]);

  // Academic attendance compliance guidance
  const getAttendanceAdvice = (attended: number, total: number) => {
    if (total === 0) return { status: 'safe', message: 'No classes conducted yet' };
    const pct = (attended / total) * 100;
    if (pct < 75) {
      const classesNeeded = Math.ceil(3 * total - 4 * attended);
      return {
        status: 'warning',
        message: `Requires ${classesNeeded > 0 ? classesNeeded : 1} consecutive attended session(s) to restore 75% compliance`,
      };
    } else {
      return {
        status: 'safe',
        message: 'Compliant with mandatory 75% university examination requirement',
      };
    }
  };

  const isOverallCleared = stats.overallAttendancePercentage >= 75;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <InteractiveCard
        variant="white"
        noTilt={true}
        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2C204F] bg-[#E7E6FA] px-3 py-1 rounded-full border border-white">
              Biometric RFID Tracking
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Synced with Academic Registrar</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1.5 flex items-center gap-2">
            <UserCheck2 className="w-6 h-6 text-[#A98ADA]" />
            <span>Attendance Telemetry & Examination Eligibility</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Official class attendance records for Semester 3 CSE (AI/ML). University statute mandates a minimum of 75% aggregate attendance to be eligible for End Semester Examinations.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-[#E7E6FA]/80 border border-white shadow-2xs text-center shrink-0">
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Overall Standing
          </span>
          <span className="text-2xl font-mono font-extrabold text-[#2C204F]">
            {stats.overallAttendancePercentage}%
          </span>
          <span
            className={`block text-[11px] font-bold ${
              isOverallCleared ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {isOverallCleared ? '✓ Examination Cleared' : '⚠ Attendance Debarment Risk'}
          </span>
        </div>
      </InteractiveCard>

      {/* 2. Official Academic Metric Cards (Pastel reference palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Sessions Held */}
        <InteractiveCard variant="pastel-blue" className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Classes Conducted
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
              {stats.totalClassesHeld}
            </span>
            <span className="text-xs text-slate-600 block mt-1">
              Lectures, Labs & Tutorials Combined
            </span>
          </div>
        </InteractiveCard>

        {/* Total Sessions Attended */}
        <InteractiveCard variant="pastel-lavender" className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Classes Attended
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
              {stats.totalClassesAttended}
            </span>
            <span className="text-xs text-slate-600 block mt-1">
              Missed: {stats.totalClassesHeld - stats.totalClassesAttended} sessions
            </span>
          </div>
        </InteractiveCard>

        {/* Official Statutory Eligibility Threshold */}
        <InteractiveCard variant="pastel-peach" className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Eligibility Threshold
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/80 text-[#3F221B] flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-[#3F221B]">
              75.0%
            </span>
            <span className="text-xs text-slate-600 block mt-1">
              Statutory minimum requirement
            </span>
          </div>
        </InteractiveCard>
      </div>

      {/* 3. Search & Filter Bar */}
      <InteractiveCard variant="white" noTilt={true} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course title or faculty name..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white rounded-2xl text-[#30313D] focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#DCE6EF]/60 p-1 rounded-2xl border border-white self-stretch sm:self-auto">
          {(['all', 'Lecture', 'Lab'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                typeFilter === type
                  ? 'bg-white text-[#2C204F] shadow-xs'
                  : 'text-slate-600 hover:text-[#2C204F]'
              }`}
            >
              {type === 'all' ? 'All Formats' : `${type}s`}
            </button>
          ))}
        </div>
      </InteractiveCard>

      {/* 4. Subject-wise Attendance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAttendance.map((rec) => {
          const pct = Number(((rec.attended / rec.total) * 100).toFixed(1));
          const advice = getAttendanceAdvice(rec.attended, rec.total);
          const isCleared = pct >= 75;

          return (
            <InteractiveCard
              key={rec.subjectCode}
              variant={isCleared ? 'white' : 'pastel-peach'}
              className="p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#E7E6FA] text-[#2C204F] px-2.5 py-0.5 rounded-lg border border-white">
                      {rec.subjectCode}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white/70 px-2 py-0.5 rounded-full border border-white">
                      {rec.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2C204F] mt-1.5 truncate">
                    {rec.subjectName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Faculty: <strong>{rec.faculty}</strong> · {rec.credits} Credits
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-2xl font-extrabold font-mono ${
                      isCleared ? 'text-[#2C204F]' : 'text-rose-700'
                    }`}
                  >
                    {pct}%
                  </span>
                  <span className="block text-xs font-mono text-slate-500">
                    {rec.attended} of {rec.total} sessions
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-[#DCE6EF] h-2.5 rounded-full overflow-hidden p-0.5 border border-white">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isCleared ? 'bg-[#2C204F]' : 'bg-rose-600'
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0%</span>
                  <span>75% Exam Threshold</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Buffer Math Advice Note */}
              <div
                className={`p-3 rounded-2xl text-xs flex items-center gap-2 border ${
                  isCleared
                    ? 'bg-[#E7E6FA]/60 text-[#2C204F] border-white'
                    : 'bg-white/80 text-rose-800 border-white'
                }`}
              >
                {isCleared ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span className="leading-snug">{advice.message}</span>
              </div>
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
};
