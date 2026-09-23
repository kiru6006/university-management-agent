import React from 'react';
import { CaseStatus, Department, Priority, RequestCategory } from '../../types';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedPriority: string;
  onPriorityChange: (prio: string) => void;
  selectedDepartment?: string;
  onDepartmentChange?: (dept: string) => void;
  onResetFilters: () => void;
  hideDepartmentFilter?: boolean;
}

const CATEGORIES: RequestCategory[] = [
  'Admissions',
  'Fees',
  'Exams',
  'Results',
  'Complaints',
  'Scholarships',
  'Degree Programs',
  'Placements',
  'Research Publications',
  'Certificates & Records',
  'Faculty Services',
  'General Student Services'
];

const STATUSES: CaseStatus[] = [
  'Submitted',
  'AI Classified',
  'Pending Review',
  'Routed',
  'In Progress',
  'Waiting for Student',
  'Resolved',
  'Closed'
];

const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low'];

const DEPARTMENTS: Department[] = [
  'Admission Office',
  'Finance Department',
  'Controller of Examinations',
  'Examination Cell',
  'Student Welfare / Grievance Cell',
  'Scholarship Cell',
  'Academic Council / HOD Office',
  'Training & Placement Cell',
  'Research & Development Cell',
  'Student Affairs Office',
  'HR / Faculty Affairs'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedDepartment,
  onDepartmentChange,
  onResetFilters,
  hideDepartmentFilter = false
}) => {
  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedPriority !== 'ALL' ||
    (selectedDepartment && selectedDepartment !== 'ALL');

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search by ticket ID, student name, keyword, or title..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={selectedStatus}
            onChange={e => onStatusChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="ALL">All Statuses</option>
            {STATUSES.map(st => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Priority Selector */}
          <select
            value={selectedPriority}
            onChange={e => onPriorityChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="ALL">All Priorities</option>
            {PRIORITIES.map(prio => (
              <option key={prio} value={prio}>
                {prio}
              </option>
            ))}
          </select>

          {/* Department Selector */}
          {!hideDepartmentFilter && onDepartmentChange && (
            <select
              value={selectedDepartment || 'ALL'}
              onChange={e => onDepartmentChange(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="ALL">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          )}

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center px-2.5 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
