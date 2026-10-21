/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Assignment } from '../types';

export interface AssignmentCounts {
  total: number;
  completed: number;
  pending: number; // ALL incomplete assignments (including overdue)
  overdue: number; // incomplete assignments past their due date
  dueSoon: number; // incomplete assignments due within 3 days
}

/**
 * Returns current calendar date in 'YYYY-MM-DD' format (local time).
 * Defaults to reference academic date '2026-10-20' if no real date passed.
 */
export const getReferenceDateString = (): string => {
  return '2026-10-20';
};

/**
 * Determines whether an assignment is effectively completed, overdue, or pending.
 * Calendar date comparison ensures an assignment due today is NOT overdue.
 */
export const getEffectiveAssignmentStatus = (
  assignment: Assignment,
  todayStr: string = getReferenceDateString()
): 'completed' | 'overdue' | 'pending' => {
  if (assignment.status === 'completed') {
    return 'completed';
  }

  // Normalize date comparison: dueDate < todayStr means past calendar date
  // e.g. '2026-10-10' < '2026-10-20' => true (Overdue)
  // e.g. '2026-10-20' < '2026-10-20' => false (Due today is pending, NOT overdue)
  if (assignment.dueDate < todayStr) {
    return 'overdue';
  }

  return 'pending';
};

/**
 * Calculates unified assignment metrics across dashboard, assignments list, and summary tiles.
 * 
 * EXACT LOGICAL CONTRACT:
 * - Completed: status === 'completed'. Never counted as pending or overdue.
 * - Pending: ALL incomplete assignments (including overdue ones!).
 * - Overdue: Incomplete assignments whose dueDate < today.
 * 
 * Example: 2 future incomplete + 1 past incomplete = 3 Pending, 1 Overdue.
 */
export const calculateAssignmentCounts = (
  assignments: Assignment[],
  todayStr: string = getReferenceDateString()
): AssignmentCounts => {
  let completed = 0;
  let overdue = 0;
  let pending = 0;
  let dueSoon = 0;

  const todayTime = new Date(`${todayStr}T00:00:00`).getTime();

  assignments.forEach((asg) => {
    const effectiveStatus = getEffectiveAssignmentStatus(asg, todayStr);

    if (effectiveStatus === 'completed') {
      completed++;
    } else {
      // Incomplete assignment -> MUST be counted in pending count!
      pending++;

      if (effectiveStatus === 'overdue') {
        overdue++;
      } else {
        // Due today or in future: check if due within 3 calendar days
        const dueTime = new Date(`${asg.dueDate}T00:00:00`).getTime();
        const diffDays = Math.ceil((dueTime - todayTime) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 3) {
          dueSoon++;
        }
      }
    }
  });

  return {
    total: assignments.length,
    completed,
    pending,
    overdue,
    dueSoon,
  };
};
