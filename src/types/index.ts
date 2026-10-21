/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'admin';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  program: string;
  department: string;
  semester: number;
  division: string;
  batch: string;
  academicYear: string;
  mentor: string;
  avatarUrl: string;
  admissionStatus: 'Active Regular' | 'Provisionally Admitted';
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  title: string;
  department: string;
  employeeId: string;
  avatarUrl: string;
}

export interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  division: string;
  batch: string;
  attendancePct: number;
  submittedAssignments: number;
  totalAssignments: number;
  sgpa: number;
  status: 'In Good Standing' | 'Attendance Warning' | 'Academic Probation';
}

export type AssignmentStatus = 'pending' | 'completed' | 'overdue';

export interface RubricLevel {
  level: 'Exemplary' | 'Proficient' | 'Developing' | 'Beginning';
  scoreRange: string;
  description: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxMarks: number;
  levels: RubricLevel[];
}

export interface AssessmentRubric {
  assignmentId: string;
  assignmentTitle: string;
  courseCode: string;
  totalMarks: number;
  criteria: RubricCriterion[];
  generalNotes?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  code: string;
  description: string;
  assignedDate: string; // YYYY-MM-DD
  dueDate: string;      // YYYY-MM-DD
  status: AssignmentStatus;
  maxMarks: number;
  submissionType: 'PDF Report' | 'GitHub Repository' | 'Jupyter Notebook' | 'Project Archive';
  faculty: string;
  learningObjectives?: string[];
  rubric?: AssessmentRubric;
}

export type SubjectType = 'Lecture' | 'Lab' | 'Tutorial';

export interface AttendanceRecord {
  subjectCode: string;
  subjectName: string;
  faculty: string;
  attended: number;
  total: number;
  credits: number;
  type: SubjectType;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimetableSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  subject: string;
  code: string;
  room: string;
  faculty: string;
  type: SubjectType;
}

export type GradeLetter = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

export interface ExamResult {
  subjectCode: string;
  subjectName: string;
  internalMarks: number; // out of 40
  externalMarks: number; // out of 60
  totalMarks: number;    // out of 100
  grade: GradeLetter;
  gradePoint: number;    // 10-scale
  credits: number;
  status: 'Pass' | 'Fail';
}

export interface SubjectScore {
  code: string;
  name: string;
  marks: number;
  maxMarks: number;
  grade: GradeLetter;
}

export interface StudentClassResult {
  id: string;
  studentName: string;
  enrollmentNo: string;
  semester: number;
  division: string;
  batch: string;
  subjectScores: SubjectScore[];
  totalMarks: number;
  maxMarks: number;
  creditsEarned: number;
  maxCredits: number;
  cgpa: number;
  finalGrade: GradeLetter;
  status: 'Pass' | 'Fail';
}

export type AnnouncementCategory = 'Academic' | 'Examination' | 'Events' | 'General';

export interface Announcement {
  id: string;
  title: string;
  category: AnnouncementCategory;
  date: string; // YYYY-MM-DD
  author: string;
  department: string;
  summary: string;
  content: string;
  isImportant: boolean;
  attachmentName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'assignment' | 'announcement' | 'attendance' | 'exam';
  read: boolean;
  targetTab: 'assignments' | 'announcements' | 'attendance' | 'results' | 'timetable';
}
