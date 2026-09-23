import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { FlaskConical, Award, CheckCircle2, FileText, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface ResearchPublicationsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ResearchPublicationsPage: React.FC<ResearchPublicationsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const researchCases = useMemo(() => {
    return cases.filter(c => c.category === 'Research Publications' || c.assignedDepartment === 'Research & Development Cell');
  }, [cases]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-violet-950 via-purple-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-200 text-xs font-semibold mb-2">
            <FlaskConical className="w-4 h-4" /> R&D Indexing Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Research & Development (R&D) Cell</h2>
          <p className="text-xs text-violet-200 mt-1 max-w-xl">
            Automated Crossref / Scopus DOI indexing verification, faculty research publication incentives, patent filings, and seed grants.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Submit Paper for Verification
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Research Submissions"
          value={researchCases.length}
          subtitle="Journals, patents & conferences"
          icon={<FlaskConical className="w-5 h-5" />}
        />
        <MetricCard
          title="Verified Scopus / WoS DOIs"
          value={researchCases.filter(c => c.status === 'Routed' || c.status === 'Resolved').length}
          subtitle="Indexed publications"
          icon={<Award className="w-5 h-5" />}
          highlight
        />
        <MetricCard
          title="Incentive Rewards Disbursed"
          value={researchCases.filter(c => c.status === 'Resolved').length}
          subtitle="Faculty research rewards"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">R&D Submission Queue ({researchCases.length})</h3>
        <CaseTable
          cases={researchCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
