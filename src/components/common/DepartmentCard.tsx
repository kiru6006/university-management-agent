import React from 'react';
import { Department } from '../../types';
import { ChevronRight } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
  icon: React.ReactNode;
  activeCasesCount: number;
  pendingReviewCount: number;
  resolvedCount: number;
  description: string;
  onClick: () => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  icon,
  activeCasesCount,
  pendingReviewCount,
  resolvedCount,
  description,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="p-5 bg-white border border-slate-200/90 rounded-xl hover:shadow-md hover:border-brand-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-brand-50 text-brand-700 rounded-lg group-hover:bg-brand-100 transition-colors">
            {icon}
          </div>
          {pendingReviewCount > 0 ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              {pendingReviewCount} Needs Review
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              Optimal
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{department}</h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex gap-3 text-slate-600">
          <span>
            <strong className="text-slate-900">{activeCasesCount}</strong> Active
          </span>
          <span>
            <strong className="text-emerald-700">{resolvedCount}</strong> Resolved
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};
