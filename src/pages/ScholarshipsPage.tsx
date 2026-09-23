import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { Banknote, Clock, CheckCircle2, Award, Zap, FileSpreadsheet } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface ScholarshipsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ScholarshipsPage: React.FC<ScholarshipsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const scholarshipCases = useMemo(() => {
    return cases.filter(c => c.category === 'Scholarships' || c.assignedDepartment === 'Scholarship Cell');
  }, [cases]);

  const pendingCount = scholarshipCases.filter(c => c.status === 'Pending Review' || c.status === 'Waiting for Student').length;
  const resolvedCount = scholarshipCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-amber-950 via-amber-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-2">
            <Banknote className="w-4 h-4" /> Scholarship AI Matcher Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Scholarship & Financial Aid Cell</h2>
          <p className="text-xs text-amber-200 mt-1 max-w-xl">
            Autonomous matching of 50+ institutional, national (NSP), and corporate scholarships based on merit cutoffs and income criteria.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-navy-950 rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Check Scholarship Eligibility
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Aid Inquiries"
          value={scholarshipCases.length}
          subtitle="Merit & need-based requests"
          icon={<Banknote className="w-5 h-5" />}
        />
        <MetricCard
          title="Awaiting Verification / Docs"
          value={pendingCount}
          subtitle="Income & marks verification"
          icon={<Clock className="w-5 h-5" />}
          alert={pendingCount > 0}
        />
        <MetricCard
          title="Sanctioned & Disbursed"
          value={resolvedCount}
          subtitle="Direct fee adjustment"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Scholarship Active Applications ({scholarshipCases.length})</h3>
        <CaseTable
          cases={scholarshipCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
