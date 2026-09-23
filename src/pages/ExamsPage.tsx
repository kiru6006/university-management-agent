import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { Calendar, Clock, CheckCircle2, AlertCircle, FileText, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface ExamsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ExamsPage: React.FC<ExamsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const examCases = useMemo(() => {
    return cases.filter(c => c.category === 'Exams' || c.assignedDepartment === 'Controller of Examinations');
  }, [cases]);

  const pendingCount = examCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
  const clashCount = examCases.filter(c => c.priority === 'Critical' || c.description.toLowerCase().includes('clash')).length;
  const resolvedCount = examCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-950 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold mb-2">
            <Calendar className="w-4 h-4" /> Exam AI Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Controller of Examinations (COE)</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Timetable synthesis, digital hall ticket eligibility verification (minimum 75% attendance audit), and backlog exam collision resolution.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Report Timetable Clash
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Exam Operations Cases"
          value={examCases.length}
          subtitle="Schedules, hall tickets & seats"
          icon={<Calendar className="w-5 h-5" />}
        />
        <MetricCard
          title="Timetable Clashes / Conflicts"
          value={clashCount}
          subtitle="Backlog overlapping slots"
          icon={<AlertCircle className="w-5 h-5" />}
          alert={clashCount > 0}
        />
        <MetricCard
          title="Resolved Hall Tickets & Schedules"
          value={resolvedCount}
          subtitle="Auto-dispatched with seat allocation"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Department Cases Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">COE Active Queue ({examCases.length})</h3>
        <CaseTable
          cases={examCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
