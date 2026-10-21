/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Award,
  Printer,
  FileCheck2,
  TrendingUp,
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  BookOpen,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { GradeLetter, StudentClassResult } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';
import { Modal } from '../common/Modal';

export const getGradeBadgeStyle = (grade: GradeLetter | string) => {
  switch (grade) {
    case 'O':
    case 'A+':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'A':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'B+':
    case 'B':
      return 'bg-[#E7E6FA] text-[#2C204F] border-purple-200';
    case 'C':
    case 'P':
      return 'bg-[#FFD4C5] text-[#3F221B] border-orange-200';
    case 'F':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const ResultsView: React.FC = () => {
  const { currentStudent, results, classResults, currentUserRole, stats } = usePortal();
  const [scaleModalOpen, setScaleModalOpen] = useState(false);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentClassResult | null>(null);

  // Teacher Filter, Batch, Sorting & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [batchFilter, setBatchFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<
    | 'cgpa-desc'
    | 'cgpa-asc'
    | 'marks-desc'
    | 'marks-asc'
    | 'name-asc'
    | 'name-desc'
    | 'enrollment-asc'
    | 'enrollment-desc'
  >('cgpa-desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const isTeacher = currentUserRole === 'admin';

  const gradingScale = [
    { grade: 'O', point: 10, range: '90 - 100', desc: 'Outstanding' },
    { grade: 'A+', point: 9, range: '80 - 89', desc: 'Excellent' },
    { grade: 'A', point: 8, range: '70 - 79', desc: 'Very Good' },
    { grade: 'B+', point: 7, range: '60 - 69', desc: 'Good' },
    { grade: 'B', point: 6, range: '50 - 59', desc: 'Above Average' },
    { grade: 'C', point: 5, range: '45 - 49', desc: 'Average' },
    { grade: 'P', point: 4, range: '40 - 44', desc: 'Pass Standard' },
    { grade: 'F', point: 0, range: 'Below 40', desc: 'Fail' },
  ];

  // Distinct batches available in the class dataset
  const availableBatches = useMemo(() => {
    const batches = Array.from(new Set(classResults.map((s) => s.batch).filter(Boolean)));
    return batches.sort();
  }, [classResults]);

  // Filtered and Sorted Class Results for Teacher Portal
  const filteredClassResults = useMemo(() => {
    let list = [...classResults];

    // Search query filter (matches student name or enrollment number)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.studentName.toLowerCase().includes(q) ||
          s.enrollmentNo.toLowerCase().includes(q)
      );
    }

    // Grade filter
    if (gradeFilter !== 'all') {
      list = list.filter((s) => s.finalGrade === gradeFilter);
    }

    // Batch filter
    if (batchFilter !== 'all') {
      list = list.filter((s) => s.batch === batchFilter);
    }

    // Semester filter
    if (semesterFilter !== 'all') {
      list = list.filter((s) => s.semester === Number(semesterFilter));
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'cgpa-desc':
          return b.cgpa - a.cgpa;
        case 'cgpa-asc':
          return a.cgpa - b.cgpa;
        case 'marks-desc':
          return b.totalMarks - a.totalMarks;
        case 'marks-asc':
          return a.totalMarks - b.totalMarks;
        case 'name-asc':
          return a.studentName.localeCompare(b.studentName);
        case 'name-desc':
          return b.studentName.localeCompare(a.studentName);
        case 'enrollment-asc':
          return a.enrollmentNo.localeCompare(b.enrollmentNo);
        case 'enrollment-desc':
          return b.enrollmentNo.localeCompare(a.enrollmentNo);
        default:
          return 0;
      }
    });

    return list;
  }, [classResults, searchQuery, gradeFilter, batchFilter, semesterFilter, sortBy]);

  // Dynamic Class-wide Aggregations based on filtered results
  const classStats = useMemo(() => {
    const total = filteredClassResults.length;
    if (total === 0) {
      return {
        avgCgpa: 0,
        avgMarks: 0,
        avgCredits: 0,
        passCount: 0,
        failCount: 0,
        passPercentage: 0,
      };
    }

    const sumCgpa = filteredClassResults.reduce((acc, s) => acc + s.cgpa, 0);
    const sumMarks = filteredClassResults.reduce((acc, s) => acc + s.totalMarks, 0);
    const sumCredits = filteredClassResults.reduce((acc, s) => acc + s.creditsEarned, 0);
    const passCount = filteredClassResults.filter((s) => s.status === 'Pass').length;
    const failCount = total - passCount;

    return {
      avgCgpa: Number((sumCgpa / total).toFixed(2)),
      avgMarks: Math.round(sumMarks / total),
      avgCredits: Number((sumCredits / total).toFixed(1)),
      passCount,
      failCount,
      passPercentage: Number(((passCount / total) * 100).toFixed(1)),
    };
  }, [filteredClassResults]);

  // Pagination calculation
  const totalItems = filteredClassResults.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedClassResults = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredClassResults.slice(startIndex, startIndex + pageSize);
  }, [filteredClassResults, safeCurrentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setGradeFilter('all');
    setBatchFilter('all');
    setSemesterFilter('all');
    setSortBy('cgpa-desc');
    setCurrentPage(1);
  };

  const toggleSort = (field: 'cgpa' | 'marks' | 'name' | 'enrollment') => {
    setSortBy((prev) => {
      if (field === 'cgpa') return prev === 'cgpa-desc' ? 'cgpa-asc' : 'cgpa-desc';
      if (field === 'marks') return prev === 'marks-desc' ? 'marks-asc' : 'marks-desc';
      if (field === 'name') return prev === 'name-asc' ? 'name-desc' : 'name-asc';
      if (field === 'enrollment') return prev === 'enrollment-asc' ? 'enrollment-desc' : 'enrollment-asc';
      return 'cgpa-desc';
    });
  };

  const isFiltered =
    searchQuery !== '' ||
    gradeFilter !== 'all' ||
    batchFilter !== 'all' ||
    semesterFilter !== 'all' ||
    sortBy !== 'cgpa-desc';

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
              {isTeacher ? 'Faculty Examination Portal' : 'End Semester Evaluation'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Winter 2026 Examination</span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Semester 3 Division A</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1.5 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#A98ADA]" />
            <span>{isTeacher ? 'Class Academic Results & Master Grade Sheet' : 'Provisional Grade Sheet & Academic SGPA'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {isTeacher
              ? 'Comprehensive performance register and subject-wise score breakdown for all enrolled students in B.Tech CSE (AI/ML) Semester 3.'
              : 'Provisional Statement of Grades for B.Tech Computer Science & Engineering (AI/ML) Semester 3. Results published by the Controller of Examinations.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setScaleModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-[#2C204F] bg-[#E7E6FA] hover:bg-[#D7D5F6] rounded-2xl border border-white transition-all cursor-pointer shadow-2xs"
          >
            Grading Scale
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{isTeacher ? 'Print Master Sheet' : 'Print Sheet'}</span>
          </button>
        </div>
      </InteractiveCard>

      {/* 2. SUMMARY CARDS */}
      {isTeacher ? (
        /* Teacher Portal Summary Cards: Class-wide Statistics that dynamically update with filters */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Average CGPA */}
          <InteractiveCard variant="pastel-lavender" noTilt={true} glow={false} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Average CGPA
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                {classStats.avgCgpa.toFixed(2)}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                Class Mean · {filteredClassResults.length} student{filteredClassResults.length === 1 ? '' : 's'}
              </span>
            </div>
          </InteractiveCard>

          {/* Card 2: Average Total Marks */}
          <InteractiveCard variant="pastel-blue" noTilt={true} glow={false} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Average Total Marks
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                {classStats.avgMarks}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                Out of 700 Max Marks ({((classStats.avgMarks / 700) * 100).toFixed(1)}%)
              </span>
            </div>
          </InteractiveCard>

          {/* Card 3: Average Credits */}
          <InteractiveCard variant="pastel-peach" noTilt={true} glow={false} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Average Credits
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#3F221B] flex items-center justify-center shadow-2xs">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#3F221B]">
                {classStats.avgCredits}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                22 Max Possible Credits Cleared
              </span>
            </div>
          </InteractiveCard>

          {/* Card 4: Examination Status Counts */}
          <InteractiveCard variant="white" noTilt={true} glow={false} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Examination Status
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E7E6FA] text-[#2C204F] flex items-center justify-center shadow-2xs">
                <Users className="w-4 h-4 text-[#A98ADA]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-emerald-700">
                  {classStats.passCount} Pass
                </span>
                {classStats.failCount > 0 && (
                  <span className="text-xs font-bold font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    {classStats.failCount} Re-appear
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 block mt-1 font-medium">
                Pass Rate: {classStats.passPercentage}% of class
              </span>
            </div>
          </InteractiveCard>
        </div>
      ) : (
        /* Student View: Parth Gadhiya's Individual Statistics */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InteractiveCard variant="pastel-lavender" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Semester SGPA
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                {stats.sgpa.toFixed(2)}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                Scale 10.00 · {stats.academicStanding}
              </span>
            </div>
          </InteractiveCard>

          <InteractiveCard variant="pastel-blue" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Total Marks
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#2C204F] flex items-center justify-center shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#2C204F]">
                {stats.totalMarksObtained}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                Out of {stats.totalMaxMarks} ({stats.averageMarksPercentage}%)
              </span>
            </div>
          </InteractiveCard>

          <InteractiveCard variant="pastel-peach" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Credits Earned
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-[#3F221B] flex items-center justify-center shadow-2xs">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold font-mono text-[#3F221B]">
                {stats.totalCredits}
              </span>
              <span className="text-xs text-slate-600 block mt-1 font-medium">
                All 7 Subject Credits Cleared
              </span>
            </div>
          </InteractiveCard>

          <InteractiveCard variant="white" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Examination Status
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E7E6FA] text-[#2C204F] flex items-center justify-center shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#A98ADA]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl font-bold text-[#2C204F] block">
                Passed All
              </span>
              <span className="text-xs text-emerald-700 block mt-1 font-bold">
                ✓ Eligible for Semester 4
              </span>
            </div>
          </InteractiveCard>
        </div>
      )}

      {/* 3. TEACHER CLASS-WIDE RESULTS TABLE VIEW */}
      {isTeacher ? (
        <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-white/95 shadow-[0_12px_36px_-8px_rgba(44,32,79,0.08)] p-6 space-y-5">
          {/* Controls Toolbar: Search, Grade, Batch/Enrollment, Semester, Sort, Reset */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by student name or enrollment no..."
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-[#EDF3F8]/60 hover:bg-[#EDF3F8] focus:bg-white border border-white hover:border-slate-300 focus:border-[#A98ADA] focus:ring-2 focus:ring-[#A98ADA]/20 rounded-2xl text-[#30313D] focus:outline-none placeholder:text-slate-400 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter & Sorting Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Grade Filter */}
              <div className="flex items-center gap-1.5 bg-[#EDF3F8]/80 hover:bg-white px-3 py-1.5 rounded-2xl border border-white hover:border-slate-300 focus-within:border-[#A98ADA] focus-within:ring-2 focus-within:ring-[#A98ADA]/20 transition-all duration-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Grade:</span>
                <select
                  value={gradeFilter}
                  onChange={(e) => {
                    setGradeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-[#2C204F] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">All Grades</option>
                  <option value="O">O (Outstanding)</option>
                  <option value="A+">A+ (Excellent)</option>
                  <option value="A">A (Very Good)</option>
                  <option value="B+">B+ (Good)</option>
                  <option value="B">B (Above Average)</option>
                  <option value="C">C (Average)</option>
                  <option value="P">P (Pass)</option>
                  <option value="F">F (Fail)</option>
                </select>
              </div>

              {/* Batch / Enrollment Filter */}
              <div className="flex items-center gap-1.5 bg-[#EDF3F8]/80 hover:bg-white px-3 py-1.5 rounded-2xl border border-white hover:border-slate-300 focus-within:border-[#A98ADA] focus-within:ring-2 focus-within:ring-[#A98ADA]/20 transition-all duration-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Batch:</span>
                <select
                  value={batchFilter}
                  onChange={(e) => {
                    setBatchFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-[#2C204F] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">All Batches</option>
                  {availableBatches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div className="flex items-center gap-1.5 bg-[#EDF3F8]/80 hover:bg-white px-3 py-1.5 rounded-2xl border border-white hover:border-slate-300 focus-within:border-[#A98ADA] focus-within:ring-2 focus-within:ring-[#A98ADA]/20 transition-all duration-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Sem:</span>
                <select
                  value={semesterFilter}
                  onChange={(e) => {
                    setSemesterFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-[#2C204F] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">All Semesters</option>
                  <option value="3">Semester 3</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#EDF3F8]/80 hover:bg-white px-3 py-1.5 rounded-2xl border border-white hover:border-slate-300 focus-within:border-[#A98ADA] focus-within:ring-2 focus-within:ring-[#A98ADA]/20 transition-all duration-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold text-[#2C204F] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="cgpa-desc">CGPA: Highest First</option>
                  <option value="cgpa-asc">CGPA: Lowest First</option>
                  <option value="marks-desc">Total Marks: Highest</option>
                  <option value="marks-asc">Total Marks: Lowest</option>
                  <option value="name-asc">Student Name: A-Z</option>
                  <option value="name-desc">Student Name: Z-A</option>
                  <option value="enrollment-asc">Enrollment: Ascending</option>
                  <option value="enrollment-desc">Enrollment: Descending</option>
                </select>
              </div>

              {/* Reset Filters Button */}
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-rose-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Count & Class Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                Showing <strong className="text-[#2C204F]">{filteredClassResults.length}</strong> of{' '}
                <strong className="text-[#2C204F]">{classResults.length}</strong> students enrolled in Division A
              </span>
              {isFiltered && (
                <span className="text-[10px] font-bold text-[#2C204F] bg-[#E7E6FA] px-2 py-0.5 rounded-full border border-white">
                  Active Filter Applied
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400">
              * Click any row or &ldquo;View Scores&rdquo; to open complete academic transcript.
            </span>
          </div>

          {/* Complete Responsive Student Results Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
            <table className="w-full text-xs text-left border-collapse min-w-[1020px]">
              <thead>
                <tr className="bg-[#EEF3F8] text-[#2C204F] border-b border-slate-200 font-bold select-none">
                  {/* Student Name */}
                  <th
                    onClick={() => toggleSort('name')}
                    className="p-3.5 pl-4 text-slate-700 font-bold hover:bg-[#E2ECF5] transition-colors duration-150 cursor-pointer"
                    title="Click to sort by Student Name"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Student Name</span>
                      {sortBy === 'name-asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : sortBy === 'name-desc' ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                      )}
                    </div>
                  </th>

                  {/* Enrollment Number */}
                  <th
                    onClick={() => toggleSort('enrollment')}
                    className="p-3.5 text-slate-700 font-bold hover:bg-[#E2ECF5] transition-colors duration-150 cursor-pointer"
                    title="Click to sort by Enrollment Number"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Enrollment No</span>
                      {sortBy === 'enrollment-asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : sortBy === 'enrollment-desc' ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                      )}
                    </div>
                  </th>

                  {/* Semester */}
                  <th className="p-3.5 text-center text-slate-600">Semester</th>

                  {/* Subject-wise Marks */}
                  <th className="p-3.5 text-slate-600">Subject-wise Marks</th>

                  {/* Total Marks */}
                  <th
                    onClick={() => toggleSort('marks')}
                    className="p-3.5 text-center text-slate-700 font-bold hover:bg-[#E2ECF5] transition-colors duration-150 cursor-pointer"
                    title="Click to sort by Total Marks"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Total Marks</span>
                      {sortBy === 'marks-desc' ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : sortBy === 'marks-asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                      )}
                    </div>
                  </th>

                  {/* Max Marks */}
                  <th className="p-3.5 text-center text-slate-600">Max Marks</th>

                  {/* Credits */}
                  <th className="p-3.5 text-center text-slate-600">Credits</th>

                  {/* CGPA */}
                  <th
                    onClick={() => toggleSort('cgpa')}
                    className="p-3.5 text-center text-slate-700 font-bold hover:bg-[#E2ECF5] transition-colors duration-150 cursor-pointer"
                    title="Click to sort by CGPA"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>CGPA</span>
                      {sortBy === 'cgpa-desc' ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : sortBy === 'cgpa-asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#2C204F]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                      )}
                    </div>
                  </th>

                  {/* Final Grade */}
                  <th className="p-3.5 text-center text-slate-600">Final Grade</th>

                  {/* Examination Status */}
                  <th className="p-3.5 text-center text-slate-600">Examination Status</th>

                  {/* Actions */}
                  <th className="p-3.5 text-right pr-4 text-slate-600">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredClassResults.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-10 text-center">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Users className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-sm font-semibold text-slate-600">No student records found</p>
                        <p className="text-xs text-slate-400">
                          No matching records for the current search query or filter selection.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#2C204F] bg-[#E7E6FA] hover:bg-[#D7D2F5] rounded-xl border border-white transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset all filters</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedClassResults.map((student) => {
                    const gradeBadge = getGradeBadgeStyle(student.finalGrade);
                    const isPass = student.status === 'Pass';

                    return (
                      <tr
                        key={student.id}
                        onClick={() => setSelectedStudentForModal(student)}
                        className="group relative hover:bg-[#F4F1FA] border-b border-slate-100/90 last:border-b-0 transition-colors duration-200 ease-out cursor-pointer"
                      >
                        {/* Student Name with stationary thin pastel-purple left accent on hover */}
                        <td className="p-3.5 pl-4 relative border-l-[3.5px] border-l-transparent group-hover:border-l-[#A98ADA] transition-colors duration-200">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#E7E6FA] text-[#2C204F] font-bold text-xs flex items-center justify-center shrink-0 border border-white">
                              {student.studentName.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-[#2C204F] group-hover:text-[#1F1738] transition-colors">
                                {student.studentName}
                              </span>
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {student.batch} · {student.division}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Enrollment Number */}
                        <td className="p-3.5 font-mono font-bold text-slate-700">
                          {student.enrollmentNo}
                        </td>

                        {/* Semester */}
                        <td className="p-3.5 text-center font-medium text-slate-600">
                          Sem {student.semester}
                        </td>

                        {/* Subject-wise Marks Pills */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {student.subjectScores.slice(0, 4).map((subj) => (
                              <span
                                key={subj.code}
                                className="inline-flex items-center gap-1 font-mono text-[10px] bg-slate-100/90 group-hover:bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200/80 transition-colors duration-200"
                                title={`${subj.name}: ${subj.marks}/${subj.maxMarks} (${subj.grade})`}
                              >
                                <span className="font-semibold text-slate-500">{subj.code}:</span>
                                <span className="font-bold text-[#2C204F]">{subj.marks}</span>
                              </span>
                            ))}
                            {student.subjectScores.length > 4 && (
                              <span className="text-[10px] text-slate-400 font-medium self-center pl-0.5">
                                +{student.subjectScores.length - 4} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Total Marks Obtained */}
                        <td className="p-3.5 text-center font-mono font-bold text-[#2C204F]">
                          {student.totalMarks}
                        </td>

                        {/* Maximum Possible Marks */}
                        <td className="p-3.5 text-center font-mono text-slate-500">
                          {student.maxMarks}
                        </td>

                        {/* Credits Earned */}
                        <td className="p-3.5 text-center font-mono text-slate-700 font-semibold">
                          {student.creditsEarned} / {student.maxCredits}
                        </td>

                        {/* CGPA */}
                        <td className="p-3.5 text-center font-mono font-extrabold text-[#2C204F] text-sm">
                          {student.cgpa.toFixed(2)}
                        </td>

                        {/* Final Grade (Restrained color-coded badge with gentle hover highlight, zero layout displacement) */}
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-block font-mono font-extrabold text-xs px-3 py-1 rounded-full border shadow-2xs transition-[filter,border-color,box-shadow] duration-200 hover:brightness-105 hover:border-slate-400/40 hover:shadow-2xs ${gradeBadge}`}
                          >
                            {student.finalGrade}
                          </span>
                        </td>

                        {/* Examination Status */}
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isPass
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            {isPass ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Pass</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Fail</span>
                              </>
                            )}
                          </span>
                        </td>

                        {/* Inline Student Action - smoothly visible on row hover */}
                        <td className="p-3.5 text-right pr-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudentForModal(student);
                            }}
                            aria-label={`View transcript for ${student.studentName}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#2C204F] bg-[#E7E6FA]/90 hover:bg-[#D7D2F5] active:bg-[#C9C2F0] border border-white hover:border-[#BCA6E5] rounded-xl shadow-2xs opacity-80 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#2C204F]" />
                            <span>View Scores</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Stationary Pagination & Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1 bg-[#EDF3F8]/70 hover:bg-white focus:bg-white border border-white hover:border-slate-300 rounded-xl text-xs font-bold text-[#2C204F] focus:outline-none focus:ring-2 focus:ring-[#A98ADA]/30 transition-colors cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span className="text-slate-300">·</span>
              <span>
                Showing <strong className="text-[#2C204F]">{totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1}</strong>-
                <strong className="text-[#2C204F]">{Math.min(safeCurrentPage * pageSize, totalItems)}</strong> of{' '}
                <strong className="text-[#2C204F]">{totalItems}</strong> students
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage <= 1}
                className="p-1.5 rounded-xl border border-white bg-[#EDF3F8]/70 hover:bg-white text-[#2C204F] disabled:opacity-40 disabled:hover:bg-[#EDF3F8]/70 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer shadow-2xs"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold px-2 text-[#2C204F]">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage >= totalPages}
                className="p-1.5 rounded-xl border border-white bg-[#EDF3F8]/70 hover:bg-white text-[#2C204F] disabled:opacity-40 disabled:hover:bg-[#EDF3F8]/70 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer shadow-2xs"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 4. STUDENT PERSONAL DETAILED GRADE CARD */
        <InteractiveCard variant="white" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#2C204F]">
                Course-wise Grade & Mark Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Continuous Internal Assessment (CIA: 40) + End Semester Examination (ESE: 60)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-600 block">Candidate: {currentStudent.name}</span>
              <span className="text-[11px] font-mono text-slate-500">{currentStudent.rollNo}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#DCE6EF]/60 text-slate-600 border-b border-white font-bold">
                  <th className="p-4">Code</th>
                  <th className="p-4">Course Name</th>
                  <th className="p-4 text-center">CIA (40)</th>
                  <th className="p-4 text-center">ESE (60)</th>
                  <th className="p-4 text-center">Total (100)</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4 text-center">Point</th>
                  <th className="p-4 text-center">Credits</th>
                  <th className="p-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((res) => {
                  const gradeBadge = getGradeBadgeStyle(res.grade);
                  return (
                    <tr key={res.subjectCode} className="hover:bg-[#E7E6FA]/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#2C204F]">
                        {res.subjectCode}
                      </td>
                      <td className="p-4 font-bold text-[#2C204F]">
                        {res.subjectName}
                      </td>
                      <td className="p-4 text-center font-mono text-slate-600">
                        {res.internalMarks}
                      </td>
                      <td className="p-4 text-center font-mono text-slate-600">
                        {res.externalMarks}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-[#2C204F]">
                        {res.totalMarks}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block font-mono font-extrabold text-xs px-2.5 py-0.5 rounded-full border shadow-2xs ${gradeBadge}`}>
                          {res.grade}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-slate-600">
                        {res.gradePoint}
                      </td>
                      <td className="p-4 text-center font-mono text-slate-600">
                        {res.credits}
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InteractiveCard>
      )}

      {/* Student Subject-wise Detail Modal for Teachers */}
      {selectedStudentForModal && (
        <Modal
          isOpen={!!selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
          title={`Academic Transcript: ${selectedStudentForModal.studentName}`}
          description={`Enrollment No: ${selectedStudentForModal.enrollmentNo} · Semester ${selectedStudentForModal.semester} · ${selectedStudentForModal.division} (${selectedStudentForModal.batch})`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-[#30313D]">
            {/* Highlights Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#E7E6FA]/80 rounded-2xl border border-white">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Semester CGPA</span>
                <span className="text-xl font-extrabold font-mono text-[#2C204F]">{selectedStudentForModal.cgpa.toFixed(2)}</span>
              </div>
              <div className="p-3 bg-[#C6DDF5]/80 rounded-2xl border border-white">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Marks</span>
                <span className="text-xl font-extrabold font-mono text-[#2C204F]">{selectedStudentForModal.totalMarks} / {selectedStudentForModal.maxMarks}</span>
              </div>
              <div className="p-3 bg-[#FFD4C5]/80 rounded-2xl border border-white">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Credits Earned</span>
                <span className="text-xl font-extrabold font-mono text-[#3F221B]">{selectedStudentForModal.creditsEarned} / {selectedStudentForModal.maxCredits}</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Final Grade</span>
                <span className={`inline-block mt-1 font-mono font-extrabold text-xs px-2.5 py-0.5 rounded-full border ${getGradeBadgeStyle(selectedStudentForModal.finalGrade)}`}>
                  Grade {selectedStudentForModal.finalGrade}
                </span>
              </div>
            </div>

            {/* Subject-wise breakdown table */}
            <div>
              <h4 className="font-bold text-[#2C204F] mb-2 text-xs">Course-wise Marks and Grade Assignment:</h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Course Name</th>
                      <th className="p-2.5 text-center">Marks (Max 100)</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5 text-right">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {selectedStudentForModal.subjectScores.map((score) => (
                      <tr key={score.code} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-[#2C204F]">{score.code}</td>
                        <td className="p-2.5 font-medium">{score.name}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-[#2C204F]">{score.marks}</td>
                        <td className="p-2.5 text-center">
                          <span className={`inline-block font-mono font-bold text-[11px] px-2 py-0.5 rounded-full border ${getGradeBadgeStyle(score.grade)}`}>
                            {score.grade}
                          </span>
                        </td>
                        <td className="p-2.5 text-right font-medium text-slate-600">
                          {score.marks >= 90 ? 'Outstanding' : score.marks >= 80 ? 'Excellent' : score.marks >= 70 ? 'Very Good' : score.marks >= 60 ? 'Good' : score.marks >= 50 ? 'Average' : score.marks >= 40 ? 'Pass' : 'Failed'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedStudentForModal(null)}
                className="px-4 py-2 bg-[#2C204F] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Transcript
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Institutional Grading Scale Modal */}
      {scaleModalOpen && (
        <Modal
          isOpen={scaleModalOpen}
          onClose={() => setScaleModalOpen(false)}
          title="Institutional 10-Point Absolute Grading Standard"
          description="Approved grading criteria for Semester 3 B.Tech Engineering"
          maxWidth="md"
        >
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="pb-2">Grade</th>
                  <th className="pb-2">Grade Point</th>
                  <th className="pb-2">Marks Range</th>
                  <th className="pb-2">Performance Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gradingScale.map((item) => (
                  <tr key={item.grade}>
                    <td className="py-2.5">
                      <span className={`inline-block font-bold font-mono px-2 py-0.5 rounded-md border ${getGradeBadgeStyle(item.grade)}`}>
                        {item.grade}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono">{item.point}</td>
                    <td className="py-2.5 font-mono">{item.range}%</td>
                    <td className="py-2.5 text-slate-600">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};
