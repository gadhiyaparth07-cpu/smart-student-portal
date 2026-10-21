/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  LayoutGrid,
  List,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { DayOfWeek, TimetableSlot } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';

export const TimetableView: React.FC = () => {
  const { timetable } = usePortal();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Current selected day's slots
  const currentDaySlots = timetable
    .filter((slot) => slot.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

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
              Academic Schedule
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Autumn Term 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1.5 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-[#A98ADA]" />
            <span>Weekly Lecture & Laboratory Matrix</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Non-overlapping master class schedule for Semester 3 CSE (AI/ML) Division A. Lectures conducted in Hall 304; practicals in Computing Labs.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#DCE6EF]/70 p-1.5 rounded-2xl border border-white self-start sm:self-center">
          <button
            type="button"
            onClick={() => setViewMode('day')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              viewMode === 'day'
                ? 'bg-white text-[#2C204F] shadow-xs'
                : 'text-slate-600 hover:text-[#2C204F]'
            }`}
          >
            Day View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              viewMode === 'week'
                ? 'bg-white text-[#2C204F] shadow-xs'
                : 'text-slate-600 hover:text-[#2C204F]'
            }`}
          >
            Weekly Matrix
          </button>
        </div>
      </InteractiveCard>

      {/* 2. Day View Mode */}
      {viewMode === 'day' ? (
        <div className="space-y-5">
          {/* Day Pills Bar */}
          <div className="flex p-1.5 bg-white/70 backdrop-blur-md rounded-3xl border border-white overflow-x-auto gap-1.5 shadow-2xs">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#2C204F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#2C204F] hover:bg-[#E7E6FA]/40'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots List */}
          <div className="space-y-4">
            {currentDaySlots.length === 0 ? (
              <div className="bg-white/70 rounded-3xl border border-white p-12 text-center shadow-diffused">
                <CalendarDays className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-[#2C204F]">No academic sessions scheduled</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enjoy your study break or consult faculty mentors for research project hours.
                </p>
              </div>
            ) : (
              currentDaySlots.map((slot) => {
                const isLab = slot.type === 'Lab';
                const cardVariant = isLab ? 'pastel-lavender' : 'white';

                return (
                  <InteractiveCard
                    key={slot.id}
                    variant={cardVariant}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="px-3.5 py-2.5 rounded-2xl bg-[#DCE6EF]/70 border border-white text-center shrink-0 min-w-[100px]">
                        <span className="text-xs font-mono font-extrabold text-[#2C204F] block">
                          {slot.startTime}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          to {slot.endTime}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-[#E7E6FA] text-[#2C204F] px-2.5 py-0.5 rounded-lg border border-white">
                            {slot.code}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full text-slate-600 border border-white">
                            {slot.type}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#2C204F] mt-1 truncate">
                          {slot.subject}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Instructor: <strong>{slot.faculty}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#2C204F] bg-white/80 px-4 py-2 rounded-2xl border border-white shadow-2xs self-start sm:self-center">
                      <MapPin className="w-3.5 h-3.5 text-[#A98ADA]" />
                      <span>{slot.room}</span>
                    </div>
                  </InteractiveCard>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* 3. Full Week Matrix View */
        <div className="bg-white/85 rounded-3xl border border-white overflow-hidden shadow-diffused">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#DCE6EF]/60 text-slate-600 border-b border-white font-bold">
                  <th className="p-4 w-32">Day</th>
                  <th className="p-4">09:00 - 10:00</th>
                  <th className="p-4">10:00 - 11:00</th>
                  <th className="p-4">11:15 - 12:15</th>
                  <th className="p-4">01:00 - 03:00 (Lab)</th>
                  <th className="p-4">03:15 - 04:15</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((day) => {
                  const slots = timetable.filter((s) => s.day === day);
                  return (
                    <tr key={day} className="hover:bg-[#E7E6FA]/30 transition-colors">
                      <td className="p-4 font-bold text-[#2C204F] bg-[#DCE6EF]/30">
                        {day}
                      </td>
                      {slots.length === 0 ? (
                        <td colSpan={5} className="p-4 text-center text-slate-400 italic">
                          No classes
                        </td>
                      ) : (
                        slots.map((s) => (
                          <td key={s.id} className="p-4">
                            <div className="p-2.5 rounded-xl bg-white/90 border border-white shadow-2xs">
                              <span className="font-mono text-[10px] font-bold text-[#2C204F] block">
                                {s.code} ({s.type})
                              </span>
                              <strong className="text-xs font-bold text-[#2C204F] block truncate max-w-[140px]">
                                {s.subject}
                              </strong>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {s.room}
                              </span>
                            </div>
                          </td>
                        ))
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
