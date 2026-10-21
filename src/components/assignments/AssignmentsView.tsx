/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileCheck2,
  Eye,
  Award,
  Clock,
  Printer,
  Sparkles,
  HelpCircle,
  Calendar,
  Layers,
  ChevronRight,
  Calculator,
  LayoutGrid,
  List
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Assignment, AssignmentStatus, AssessmentRubric } from '../../types';
import { InteractiveCard } from '../common/InteractiveCard';
import { Modal } from '../common/Modal';

export const AssignmentsView: React.FC = () => {
  const { assignments, stats } = usePortal();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AssignmentStatus>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'cards' | 'table'>('cards');
  
  // Modal states
  const [selectedRubricAssignment, setSelectedRubricAssignment] = useState<Assignment | null>(null);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState<Assignment | null>(null);

  // Self-assessment interactive estimator state
  const [selectedLevels, setSelectedLevels] = useState<Record<string, number>>({});

  // Reset self-assessment when rubric changes
  const handleOpenRubric = (asg: Assignment) => {
    setSelectedRubricAssignment(asg);
    setSelectedLevels({});
  };

  // Subject list extracted from assignments
  const subjectsList = useMemo(() => {
    const map = new Map<string, string>();
    assignments.forEach((a) => map.set(a.code, a.subject));
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [assignments]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || item.code === subjectFilter;

      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [assignments, searchTerm, statusFilter, subjectFilter]);

  // Self-assessment estimated total calculation
  const estimatedTotal = useMemo(() => {
    return Object.values(selectedLevels).reduce((sum, val) => sum + val, 0);
  }, [selectedLevels]);

  return (
    <div className="space-y-6">
      {/* 1. Page Header Bar */}
      <InteractiveCard
        variant="white"
        noTilt={true}
        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2C204F] bg-[#E7E6FA] px-3 py-1 rounded-full border border-white/60">
              Continuous Assessment
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Semester 3 Term Work Records</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2C204F] mt-1.5 flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-[#A98ADA]" />
            <span>Coursework & Laboratory Submissions</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review detailed problem statements, submission requirements, and standardized academic evaluation rubrics for continuous assessment marks.
          </p>
        </div>

        {/* View Layout Switcher */}
        <div className="flex items-center gap-1.5 bg-[#DCE6EF]/70 p-1.5 rounded-2xl border border-white/80 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setViewLayout('cards')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              viewLayout === 'cards'
                ? 'bg-white text-[#2C204F] shadow-sm'
                : 'text-slate-600 hover:text-[#2C204F]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setViewLayout('table')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              viewLayout === 'table'
                ? 'bg-white text-[#2C204F] shadow-sm'
                : 'text-slate-600 hover:text-[#2C204F]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Data Table</span>
          </button>
        </div>
      </InteractiveCard>

      {/* 2. Filter & Search Controls */}
      <InteractiveCard variant="white" noTilt={true} className="p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assignments by title, course code, or problem keywords..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white/80 rounded-2xl text-[#30313D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2C204F]/30 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Subject Filter Dropdown */}
          <div className="w-full md:w-72 shrink-0">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#DCE6EF]/50 border border-white/80 rounded-2xl text-[#30313D] focus:outline-none focus:ring-2 focus:ring-[#2C204F]/30 focus:bg-white font-medium transition-all"
            >
              <option value="all">All Subjects ({assignments.length})</option>
              {subjectsList.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} · {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Chips (Accurate, Explicit Math) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Tasks', count: stats.totalAssignments, color: 'bg-slate-200 text-slate-700' },
              { id: 'pending', label: 'Pending', count: stats.pendingAssignments, color: 'bg-[#C6DDF5] text-[#1E2838]' },
              { id: 'overdue', label: 'Overdue', count: stats.overdueAssignments, color: 'bg-[#FFD4C5] text-[#3F221B]' },
              { id: 'completed', label: 'Submitted', count: stats.completedAssignments, color: 'bg-[#E7E6FA] text-[#2D2347]' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as 'all' | AssignmentStatus)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-2xl transition-all flex items-center gap-2 border ${
                  statusFilter === tab.id
                    ? 'bg-[#2C204F] text-white border-[#2C204F] shadow-sm'
                    : 'bg-white/80 text-slate-600 border-white/80 hover:bg-white hover:text-[#2C204F]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    statusFilter === tab.id ? 'bg-white/20 text-white' : tab.color
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-[#2C204F] font-mono">{filteredAssignments.length}</strong> of{' '}
            <span className="font-mono">{assignments.length}</span> records
          </div>
        </div>
      </InteractiveCard>

      {/* 3. Cards View */}
      {viewLayout === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAssignments.length === 0 ? (
            <div className="col-span-full bg-white/70 rounded-3xl border border-white/90 p-12 text-center shadow-diffused">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#2C204F]">No assignments found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No coursework items match your current filter criteria. Try resetting the status or course dropdown.
              </p>
            </div>
          ) : (
            filteredAssignments.map((asg) => {
              const isCompleted = asg.status === 'completed';
              const isOverdue = asg.status === 'overdue';
              const cardVariant = isOverdue
                ? 'pastel-peach'
                : isCompleted
                ? 'pastel-lavender'
                : 'pastel-blue';

              return (
                <InteractiveCard
                  key={asg.id}
                  variant={cardVariant}
                  clickable={true}
                  className="p-6 flex flex-col justify-between"
                  onClick={() => setSelectedAssignmentDetails(asg)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-white/80 text-[#2C204F] px-2.5 py-1 rounded-xl border border-white/90 shadow-2xs">
                          {asg.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[200px]">
                          {asg.subject}
                        </span>
                      </div>

                      {/* Status Pill */}
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white/85 px-3 py-1 rounded-full border border-white shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Submitted</span>
                        </span>
                      ) : isOverdue ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-white/85 px-3 py-1 rounded-full border border-white shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Overdue</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2838] bg-white/85 px-3 py-1 rounded-full border border-white shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-[#2C204F] line-clamp-1">
                      {asg.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {asg.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/60 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-3">
                      <span>Due: <strong className="font-mono text-[#2C204F] font-bold">{asg.dueDate}</strong></span>
                      <span>·</span>
                      <span className="font-mono font-medium">{asg.maxMarks} marks</span>
                    </div>

                    {/* View Rubric Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRubric(asg);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-[#2C204F] bg-white hover:bg-[#2C204F] hover:text-white rounded-xl shadow-2xs border border-white transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Rubric</span>
                    </button>
                  </div>
                </InteractiveCard>
              );
            })
          )}
        </div>
      ) : (
        /* 4. Table View */
        <div className="bg-white/85 rounded-3xl border border-white/90 overflow-hidden shadow-diffused">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-[#DCE6EF]/60 text-slate-600 border-b border-white font-bold">
                  <th className="p-4">Course</th>
                  <th className="p-4">Assignment Title</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-center">Marks</th>
                  <th className="p-4">Format</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[#30313D]">
                {filteredAssignments.map((asg) => {
                  const isCompleted = asg.status === 'completed';
                  const isOverdue = asg.status === 'overdue';

                  return (
                    <tr
                      key={asg.id}
                      className="hover:bg-[#E7E6FA]/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedAssignmentDetails(asg)}
                    >
                      <td className="p-4 font-mono font-bold text-[#2C204F] whitespace-nowrap">
                        {asg.code}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#2C204F] max-w-xs truncate">
                          {asg.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {asg.subject} · {asg.faculty}
                        </div>
                      </td>
                      <td className="p-4 font-mono whitespace-nowrap">
                        <span className={isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                          {asg.dueDate}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-[#2C204F]">
                        {asg.maxMarks}
                      </td>
                      <td className="p-4 text-slate-500 whitespace-nowrap">
                        {asg.submissionType}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {isCompleted ? (
                          <span className="text-[11px] font-bold text-emerald-800 bg-[#E7E6FA] px-2.5 py-1 rounded-full border border-white">
                            Submitted
                          </span>
                        ) : isOverdue ? (
                          <span className="text-[11px] font-bold text-rose-800 bg-[#FFD4C5] px-2.5 py-1 rounded-full border border-white">
                            Overdue
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-[#1E2838] bg-[#C6DDF5] px-2.5 py-1 rounded-full border border-white">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenRubric(asg);
                            }}
                            className="px-3 py-1 text-xs font-bold text-[#2C204F] bg-[#E7E6FA] hover:bg-[#2C204F] hover:text-white rounded-xl border border-white transition-all inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Rubric</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Comprehensive Assessment Rubric Modal (The Requested Fix!) */}
      {selectedRubricAssignment && (
        <Modal
          isOpen={!!selectedRubricAssignment}
          onClose={() => setSelectedRubricAssignment(null)}
          title={`Assessment Rubric · ${selectedRubricAssignment.code}`}
          description={selectedRubricAssignment.title}
          maxWidth="4xl"
        >
          <div className="space-y-6 text-[#30313D]">
            {/* Rubric Header Banner */}
            <div className="p-5 rounded-2xl bg-[#E7E6FA]/70 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2C204F] bg-white px-2.5 py-0.5 rounded-full border border-white/80">
                    Course: {selectedRubricAssignment.subject}
                  </span>
                  <span className="text-xs text-slate-500">Evaluator: {selectedRubricAssignment.faculty}</span>
                </div>
                <h4 className="text-base font-bold text-[#2C204F] mt-1">
                  Evaluation Scheme & Scoring Standards
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Submission Format: <strong>{selectedRubricAssignment.submissionType}</strong> · Due Date: <strong>{selectedRubricAssignment.dueDate}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2 bg-white rounded-2xl border border-white shadow-2xs text-center">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Total Weightage
                  </span>
                  <span className="text-lg font-mono font-extrabold text-[#2C204F]">
                    {selectedRubricAssignment.maxMarks} Marks
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl border border-white shadow-2xs transition-colors"
                  title="Print / Save Rubric as PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* General Evaluation Notes */}
            {selectedRubricAssignment.rubric?.generalNotes && (
              <div className="p-4 rounded-2xl bg-[#C6DDF5]/50 border border-white/80 text-xs text-slate-700 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#2C204F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C204F] block mb-0.5 font-bold">Important Evaluation Guideline:</strong>
                  {selectedRubricAssignment.rubric.generalNotes}
                </div>
              </div>
            )}

            {/* Interactive Rubric Criteria Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#2C204F] uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#A98ADA]" />
                  <span>Criterion Breakdown & Performance Levels</span>
                </h4>
                <span className="text-xs text-slate-500">
                  Click any performance level below to estimate your score
                </span>
              </div>

              {selectedRubricAssignment.rubric?.criteria.map((criterion, idx) => (
                <div
                  key={criterion.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[11px] font-bold text-[#A98ADA] uppercase tracking-wider mr-2">
                        Criterion {idx + 1}
                      </span>
                      <strong className="text-sm font-bold text-[#2C204F]">
                        {criterion.name}
                      </strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#2C204F] bg-[#E7E6FA] px-2.5 py-0.5 rounded-full">
                        Max {criterion.maxMarks} Marks
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {criterion.description}
                  </p>

                  {/* 4 Performance Levels Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                    {criterion.levels.map((lvl) => {
                      const levelNumericVal =
                        lvl.level === 'Exemplary'
                          ? criterion.maxMarks
                          : lvl.level === 'Proficient'
                          ? Number((criterion.maxMarks * 0.8).toFixed(1))
                          : lvl.level === 'Developing'
                          ? Number((criterion.maxMarks * 0.6).toFixed(1))
                          : Number((criterion.maxMarks * 0.3).toFixed(1));

                      const isSelected = selectedLevels[criterion.id] === levelNumericVal;

                      const badgeColor =
                        lvl.level === 'Exemplary'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : lvl.level === 'Proficient'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : lvl.level === 'Developing'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200';

                      return (
                        <div
                          key={lvl.level}
                          onClick={() =>
                            setSelectedLevels((prev) => ({
                              ...prev,
                              [criterion.id]: levelNumericVal,
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#2C204F] text-white border-[#2C204F] shadow-sm ring-2 ring-[#2C204F]/20'
                              : 'bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 border-slate-200/70'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isSelected ? 'bg-white/20 text-white border-white/30' : badgeColor
                                }`}
                              >
                                {lvl.level}
                              </span>
                              <span className="font-mono text-[11px] font-bold">
                                {lvl.scoreRange}
                              </span>
                            </div>
                            <p
                              className={`text-[11px] leading-relaxed ${
                                isSelected ? 'text-white/90' : 'text-slate-600'
                              }`}
                            >
                              {lvl.description}
                            </p>
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-slate-200/50 flex justify-end">
                            <span
                              className={`text-[10px] font-semibold ${
                                isSelected ? 'text-cyan-200' : 'text-slate-400'
                              }`}
                            >
                              {isSelected ? '✓ Selected' : 'Select'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Marks Calculator Bar */}
            {Object.keys(selectedLevels).length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FFD4C5]/60 border border-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#2C204F]" />
                  <div>
                    <span className="text-xs font-bold text-[#2C204F] block">
                      Target Self-Assessment Score
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Based on {Object.keys(selectedLevels).length} of {selectedRubricAssignment.rubric?.criteria.length} evaluated criteria
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold font-mono text-[#2C204F]">
                    {estimatedTotal.toFixed(1)} / {selectedRubricAssignment.maxMarks}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-600">
                    ({((estimatedTotal / selectedRubricAssignment.maxMarks) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Official Examination Rubric · Approved by Board of Studies
              </span>
              <button
                type="button"
                onClick={() => setSelectedRubricAssignment(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#2C204F] hover:bg-[#3D2D6B] rounded-2xl transition-colors shadow-sm"
              >
                Close Rubric
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 6. Assignment Quick Details Reader Modal */}
      {selectedAssignmentDetails && (
        <Modal
          isOpen={!!selectedAssignmentDetails}
          onClose={() => setSelectedAssignmentDetails(null)}
          title={selectedAssignmentDetails.title}
          description={`${selectedAssignmentDetails.code} · ${selectedAssignmentDetails.subject}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-[#30313D]">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span>Faculty: <strong className="text-[#2C204F]">{selectedAssignmentDetails.faculty}</strong></span>
              <span>·</span>
              <span>Max Marks: <strong className="font-mono text-[#2C204F]">{selectedAssignmentDetails.maxMarks}</strong></span>
              <span>·</span>
              <span>Format: <strong className="text-[#2C204F]">{selectedAssignmentDetails.submissionType}</strong></span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#2C204F] uppercase tracking-wide mb-1">
                Problem Statement & Deliverables
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedAssignmentDetails.description}
              </p>
            </div>

            {selectedAssignmentDetails.learningObjectives && selectedAssignmentDetails.learningObjectives.length > 0 && (
              <div className="p-4 bg-[#E7E6FA]/60 rounded-2xl border border-white">
                <h4 className="text-xs font-bold text-[#2C204F] uppercase tracking-wide mb-2">
                  Key Evaluation Objectives
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                  {selectedAssignmentDetails.learningObjectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between text-xs p-4 rounded-2xl bg-[#DCE6EF]/60 border border-white text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Date</span>
                <span className="font-mono font-medium text-[#2C204F]">{selectedAssignmentDetails.assignedDate}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Submission Due Date</span>
                <span className="font-mono font-bold text-[#2C204F]">{selectedAssignmentDetails.dueDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  const target = selectedAssignmentDetails;
                  setSelectedAssignmentDetails(null);
                  handleOpenRubric(target);
                }}
                className="px-4 py-2 text-xs font-bold text-[#2C204F] bg-[#E7E6FA] hover:bg-[#2C204F] hover:text-white rounded-2xl transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Scoring Rubric</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAssignmentDetails(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
