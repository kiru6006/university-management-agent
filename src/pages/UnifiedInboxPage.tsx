import React, { useState, useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { FilterBar } from '../components/common/FilterBar';
import { CaseTable } from '../components/common/CaseTable';
import { Inbox, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface UnifiedInboxPageProps {
  onSelectCase: (caseId: string) => void;
}

export const UnifiedInboxPage: React.FC<UnifiedInboxPageProps> = ({ onSelectCase }) => {
  const { cases, approveClassification } = useCases();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  const filteredCases = useMemo(() => {
    return cases.filter(item => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          item.ticketId.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.requesterName.toLowerCase().includes(q) ||
          (item.studentId && item.studentId.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Category
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) {
        return false;
      }

      // Priority
      if (selectedPriority !== 'ALL' && item.priority !== selectedPriority) {
        return false;
      }

      // Department
      if (selectedDepartment !== 'ALL' && item.assignedDepartment !== selectedDepartment) {
        return false;
      }

      return true;
    });
  }, [cases, searchQuery, selectedCategory, selectedStatus, selectedPriority, selectedDepartment]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedPriority('ALL');
    setSelectedDepartment('ALL');
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-brand-600" /> Unified Request Inbox
          </h2>
          <p className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{filteredCases.length}</strong> of{' '}
            <strong className="text-slate-800">{cases.length}</strong> university cases
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600" />
            AI Router Auto-Classifying
          </span>
        </div>
      </div>

      {/* Filter Bar Component */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        onResetFilters={handleReset}
      />

      {/* Table Component */}
      <CaseTable
        cases={filteredCases}
        onSelectCase={item => onSelectCase(item.id)}
        onQuickApprove={id => approveClassification(id)}
      />
    </div>
  );
};
