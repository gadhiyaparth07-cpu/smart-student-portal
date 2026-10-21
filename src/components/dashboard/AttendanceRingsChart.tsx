/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AttendanceRingsChartProps {
  lecturePct: number;
  labPct: number;
  overallPct: number;
  size?: number;
}

export const AttendanceRingsChart: React.FC<AttendanceRingsChartProps> = ({
  lecturePct = 90.5,
  labPct = 92.5,
  overallPct = 91.8,
  size = 180,
}) => {
  // SVG Radii & stroke widths
  const strokeWidth = 14;
  const center = size / 2;

  // Ring 1 (Outer - Purple #A98ADA - Lecture)
  const r1 = center - strokeWidth;
  const circ1 = 2 * Math.PI * r1;
  const strokeDash1 = (Math.min(lecturePct, 100) / 100) * circ1;

  // Ring 2 (Middle - Coral #EB896E - Lab)
  const r2 = r1 - strokeWidth - 6;
  const circ2 = 2 * Math.PI * r2;
  const strokeDash2 = (Math.min(labPct, 100) / 100) * circ2;

  // Ring 3 (Inner - Soft Blue #6AA8E4 - Overall)
  const r3 = r2 - strokeWidth - 6;
  const circ3 = 2 * Math.PI * r3;
  const strokeDash3 = (Math.min(overallPct, 100) / 100) * circ3;

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Ring 1: Background Track */}
        <circle
          cx={center}
          cy={center}
          r={r1}
          fill="none"
          stroke="#E7E6FA"
          strokeWidth={strokeWidth}
          opacity="0.4"
        />
        {/* Ring 1: Active Arc (Purple #A98ADA) */}
        <circle
          cx={center}
          cy={center}
          r={r1}
          fill="none"
          stroke="#A98ADA"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeDash1} ${circ1}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Ring 2: Background Track */}
        <circle
          cx={center}
          cy={center}
          r={r2}
          fill="none"
          stroke="#FFD4C5"
          strokeWidth={strokeWidth}
          opacity="0.4"
        />
        {/* Ring 2: Active Arc (Coral #EB896E) */}
        <circle
          cx={center}
          cy={center}
          r={r2}
          fill="none"
          stroke="#EB896E"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeDash2} ${circ2}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Ring 3: Background Track */}
        <circle
          cx={center}
          cy={center}
          r={r3}
          fill="none"
          stroke="#C6DDF5"
          strokeWidth={strokeWidth}
          opacity="0.4"
        />
        {/* Ring 3: Active Arc (Soft Blue #6AA8E4) */}
        <circle
          cx={center}
          cy={center}
          r={r3}
          fill="none"
          stroke="#6AA8E4"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeDash3} ${circ3}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    </div>
  );
};
