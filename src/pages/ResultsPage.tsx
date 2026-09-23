import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { Award, Clock, CheckCircle2, FileEdit, TrendingUp, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface ResultsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const resultsCases = useMemo(() => {
    return cases.filter(c => c.category === 'Results' || c.assignedDepartment === 'Examination Cell');
  }, [cases]);

  const pendingCount = resultsCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
  const inProgressCount = resultsCases.filter(c => c.status === 'In Progress' || c.status === 'Routed').length;
  const resolvedCount = resultsCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-teal-900 via-emerald-950 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold mb-2">
            <Award className="w-4 h-4" /> Results AI Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Examination Cell & Results Dissemination</h2>
          <p className="text-xs text-teal-200 mt-1 max-w-xl">
            Grade breakdown analytics, SGPA/CGPA trajectory calculations, official transcript generation, and revaluation tracking.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Apply for Revaluation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Result Inquiries"
          value={resultsCases.length}
          subtitle="Grades, CGPA & transcripts"
          icon={<Award className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending Revaluation Audits"
          value={inProgressCount}
          subtitle="In review with grading committee"
          icon={<FileEdit className="w-5 h-5" />}
          alert={inProgressCount > 0}
        />
        <MetricCard
          title="Resolved Grade Corrections"
          value={resolvedCount}
          subtitle="Audited and updated in ERP"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Results & Grade Review Queue ({resultsCases.length})</h3>
        <CaseTable
          cases={resultsCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
