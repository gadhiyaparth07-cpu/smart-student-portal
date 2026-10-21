/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface DayCapsule {
  day: string;
  lectureHeight: number; // in %
  labHeight: number;     // in %
  isHighlight?: boolean;
}

export const TimetableCapsuleTracker: React.FC = () => {
  const daysData: DayCapsule[] = [
    { day: 'Mon', lectureHeight: 50, labHeight: 30 },
    { day: 'Tue', lectureHeight: 70, labHeight: 45, isHighlight: true },
    { day: 'Wed', lectureHeight: 40, labHeight: 60 },
    { day: 'Thu', lectureHeight: 85, labHeight: 35 },
    { day: 'Fri', lectureHeight: 60, labHeight: 75, isHighlight: true },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Legend Row */}
      <div className="flex items-center justify-end gap-3 text-[10px] font-semibold text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EB896E]" />
          <span>Lectures (Hall 304)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C6DDF5]" />
          <span>Lab Practicals</span>
        </div>
      </div>

      {/* Vertical Capsule Bars Grid */}
      <div className="h-40 flex items-end justify-between gap-2 px-1 pt-2">
        {daysData.map((item) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="w-full flex items-end justify-center gap-1.5 h-full">
              {/* Bar 1: Lecture (Coral) */}
              <div
                className="w-4 sm:w-5 h-full rounded-full flex flex-col justify-end p-0.5 relative overflow-hidden"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, rgba(235, 137, 110, 0.08), rgba(235, 137, 110, 0.08) 3px, transparent 3px, transparent 6px)',
                  border: '1px solid rgba(235, 137, 110, 0.25)',
                }}
              >
                <div
                  className="w-full rounded-full bg-[#EB896E] transition-all duration-700 shadow-2xs"
                  style={{ height: `${item.lectureHeight}%` }}
                />
              </div>

              {/* Bar 2: Lab (Soft Blue) */}
              <div
                className="w-4 sm:w-5 h-full rounded-full flex flex-col justify-end p-0.5 relative overflow-hidden"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, rgba(106, 168, 228, 0.08), rgba(106, 168, 228, 0.08) 3px, transparent 3px, transparent 6px)',
                  border: '1px solid rgba(106, 168, 228, 0.25)',
                }}
              >
                <div
                  className="w-full rounded-full bg-[#6AA8E4] transition-all duration-700 shadow-2xs"
                  style={{ height: `${item.labHeight}%` }}
                />
              </div>
            </div>

            <span className="text-[11px] font-bold text-slate-500 font-mono">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
