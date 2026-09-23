import React, { useState } from 'react';
import { CaseItem, Department, Priority, RequestCategory } from '../../types';
import { useCases } from '../../context/CaseContext';
import { CheckCircle2, SlidersHorizontal, ShieldAlert, ArrowRight, X } from 'lucide-react';

interface ReviewOverridePanelProps {
  caseItem: CaseItem;
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

const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low'];

export const ReviewOverridePanel: React.FC<ReviewOverridePanelProps> = ({ caseItem }) => {
  const { approveClassification, overrideClassification, currentUserName, currentRole } = useCases();
  const [isOverriding, setIsOverriding] = useState(false);

  const [category, setCategory] = useState<RequestCategory>(caseItem.category);
  const [department, setDepartment] = useState<Department>(caseItem.assignedDepartment);
  const [priority, setPriority] = useState<Priority>(caseItem.priority);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const isPending = caseItem.status === 'Pending Review' || caseItem.status === 'AI Classified';

  const handleApprove = () => {
    approveClassification(caseItem.id, currentUserName);
  };

  const handleSaveOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please provide a brief justification note for the manual override.');
      return;
    }
    setError('');
    overrideClassification(caseItem.id, {
      category,
      department,
      priority,
      notes: notes.trim()
    });
    setIsOverriding(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            Human-in-the-Loop (HITL) Review Controls
          </h3>
          <p className="text-xs text-slate-500">
            Reviewing as: <strong className="text-slate-800">{currentUserName}</strong> ({currentRole})
          </p>
        </div>

        {caseItem.isOverridden && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            Manually Overridden
          </span>
        )}
      </div>

      {caseItem.isOverridden && caseItem.overrideNotes && (
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900">
          <strong className="block font-semibold mb-0.5">Override Note ({caseItem.overriddenBy}):</strong>
          <p>{caseItem.overrideNotes}</p>
        </div>
      )}

      {/* Main Review Actions when Pending */}
      {isPending ? (
        !isOverriding ? (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800">Pending Department Confirmation</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Confirm AI route to <strong className="text-slate-700">{caseItem.assignedDepartment}</strong> or adjust parameters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOverriding(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                Override
              </button>

              <button
                onClick={handleApprove}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Route
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveOverride} className="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Manual Classification Override Form
              </h4>
              <button
                type="button"
                onClick={() => setIsOverriding(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as RequestCategory)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-brand-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Department</label>
                <select
                  value={department}
                  onChange={e => setDepartment(e.target.value as Department)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-brand-500"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as Priority)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-brand-500"
                >
                  {PRIORITIES.map(prio => (
                    <option key={prio} value={prio}>
                      {prio}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Override Justification / Notes <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Explain why the department or category is being modified..."
                rows={2}
                className="w-full p-2 bg-white border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsOverriding(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm flex items-center gap-1"
              >
                Save Override & Route <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )
      ) : (
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-600">
            Case has been verified and routed to <strong className="text-slate-900">{caseItem.assignedDepartment}</strong>.
          </span>
          <button
            onClick={() => setIsOverriding(true)}
            className="text-xs text-brand-600 hover:text-brand-800 font-semibold"
          >
            Re-route Department
          </button>
        </div>
      )}
    </div>
  );
};
