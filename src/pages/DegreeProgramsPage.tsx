import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { BookOpen, Clock, CheckCircle2, GitBranch, Search, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface DegreeProgramsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const DegreeProgramsPage: React.FC<DegreeProgramsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const programCases = useMemo(() => {
    return cases.filter(c => c.category === 'Degree Programs' || c.assignedDepartment === 'Academic Council / HOD Office');
  }, [cases]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-sky-950 via-blue-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 text-xs font-semibold mb-2">
            <BookOpen className="w-4 h-4" /> Curriculum & Credit Auditor Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Academic Council & Degree Programs</h2>
          <p className="text-xs text-sky-200 mt-1 max-w-xl">
            Semantic syllabus query, elective selection guidance, prerequisite dependency tree checks, and graduation credit audits.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Query Syllabus / Credits
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Curriculum & Credit Requests"
          value={programCases.length}
          subtitle="Prerequisites, electives & syllabus"
          icon={<BookOpen className="w-5 h-5" />}
        />
        <MetricCard
          title="Prerequisite Waivers"
          value={programCases.filter(c => c.status !== 'Resolved').length}
          subtitle="HOD approval queue"
          icon={<GitBranch className="w-5 h-5" />}
          highlight
        />
        <MetricCard
          title="Audited & Approved"
          value={programCases.filter(c => c.status === 'Resolved').length}
          subtitle="Credit requirements validated"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Academic Council Requests ({programCases.length})</h3>
        <CaseTable
          cases={programCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
