import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { CaseTable } from '../components/common/CaseTable';
import { ShieldCheck, CheckCircle2, SlidersHorizontal, AlertCircle, Sparkles } from 'lucide-react';

interface DepartmentApprovalsPageProps {
  onSelectCase: (caseId: string) => void;
}

export const DepartmentApprovalsPage: React.FC<DepartmentApprovalsPageProps> = ({ onSelectCase }) => {
  const { cases, approveClassification, currentUserName, currentRole } = useCases();

  const pendingCases = useMemo(() => {
    return cases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified');
  }, [cases]);

  const handleApproveAll = () => {
    if (window.confirm(`Approve all ${pendingCases.length} pending AI classifications and route them to their target departments?`)) {
      pendingCases.forEach(c => approveClassification(c.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-950 via-slate-900 to-navy-950 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" /> Human-in-the-Loop (HITL) Desk
          </div>
          <h2 className="text-xl font-bold tracking-tight">Departmental Review & Approval Queue</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Reviewing as <strong className="text-white">{currentUserName}</strong> ({currentRole}). Verify AI classifications, adjust routing parameters, or override priorities before dispatch.
          </p>
        </div>

        {pendingCases.length > 0 && (
          <button
            onClick={handleApproveAll}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <CheckCircle2 className="w-4 h-4" /> Batch Approve All ({pendingCases.length})
          </button>
        )}
      </div>

      {/* Info Card */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>
            The AI Orchestrator flags cases for human review when they involve financial hardship, disciplinary appeals, or boundary confidence scores.
          </span>
        </div>
        <span className="font-bold text-slate-900">{pendingCases.length} Awaiting Confirmation</span>
      </div>

      {/* Pending Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Pending Verification Cases ({pendingCases.length})</h3>
        <CaseTable
          cases={pendingCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
