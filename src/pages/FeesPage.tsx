import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { CreditCard, Clock, CheckCircle2, ShieldAlert, Receipt, Banknote, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface FeesPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const FeesPage: React.FC<FeesPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const feeCases = useMemo(() => {
    return cases.filter(c => c.category === 'Fees' || c.assignedDepartment === 'Finance Department');
  }, [cases]);

  const pendingCount = feeCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
  const resolvedCount = feeCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-2">
            <CreditCard className="w-4 h-4" /> Finance AI Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Finance & Accounts Department</h2>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Semester fee statements, automated receipt downloads, payment link generation, and audited CFO installment reviews.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Submit Fee Query
        </button>
      </div>

      {/* Strict Guardrail Note */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <strong className="font-semibold">Deterministic Financial Guardrail:</strong> The AI Agent is strictly read-only on ledger tables. All fee waivers, extensions, or multi-installment approvals require CFO electronic sign-off.
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Fee Inquiries"
          value={feeCases.length}
          subtitle="Tuition, hostel & lab dues"
          icon={<CreditCard className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending CFO Installment Reviews"
          value={pendingCount}
          subtitle="Hardship applications in review"
          icon={<Clock className="w-5 h-5" />}
          alert={pendingCount > 0}
        />
        <MetricCard
          title="Reconciled & Cleared"
          value={resolvedCount}
          subtitle="Direct payment links dispatched"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Department Cases Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Finance Active Queue ({feeCases.length})</h3>
        <CaseTable
          cases={feeCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
