import React from 'react';
import { CaseItem } from '../../types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { ConfidenceBadge } from './ConfidenceBadge';
import { CheckCircle2, ChevronRight, MessageSquareCode, ShieldAlert } from 'lucide-react';

interface CaseTableProps {
  cases: CaseItem[];
  onSelectCase: (caseItem: CaseItem) => void;
  onQuickApprove?: (caseId: string) => void;
}

export const CaseTable: React.FC<CaseTableProps> = ({ cases, onSelectCase, onQuickApprove }) => {
  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center">
        <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400 mb-3">
          <MessageSquareCode className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No matching cases found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Try adjusting your search query, department, or filter criteria to see active university requests.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">Ticket</th>
              <th className="py-3 px-4">Requester</th>
              <th className="py-3 px-4">Title & AI Classification</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {cases.map(item => {
              const isPending = item.status === 'Pending Review' || item.status === 'AI Classified';

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectCase(item)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Ticket ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {item.isOverridden && (
                        <span title="Human Overridden" className="text-amber-600">
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span>{item.ticketId}</span>
                    </div>
                  </td>

                  {/* Requester */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{item.requesterName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>{item.role}</span>
                      {item.studentId && <span>• {item.studentId}</span>}
                    </div>
                  </td>

                  {/* Title & AI Category */}
                  <td className="py-3.5 px-4 max-w-md">
                    <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 font-medium text-[11px] text-slate-700">
                        {item.category}
                      </span>
                      <ConfidenceBadge score={item.confidenceScore} />
                    </div>
                  </td>

                  {/* Assigned Department */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{item.assignedDepartment}</div>
                    <div className="text-[11px] text-slate-400">{item.channel}</div>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <PriorityBadge priority={item.priority} />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                    {item.createdAt}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {isPending && onQuickApprove && (
                        <button
                          onClick={() => onQuickApprove(item.id)}
                          className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors"
                          title="Approve AI Classification & Route"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => onSelectCase(item)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Case Details"
                      >
                        <ChevronRight className="w-4 h-4" />
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
  );
};
