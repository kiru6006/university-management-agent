import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { Briefcase, Users, CheckCircle2, Building, Zap, FileSpreadsheet } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface PlacementsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const PlacementsPage: React.FC<PlacementsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const placementCases = useMemo(() => {
    return cases.filter(c => c.category === 'Placements' || c.assignedDepartment === 'Training & Placement Cell');
  }, [cases]);

  const activeCount = placementCases.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;
  const resolvedCount = placementCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-cyan-950 via-teal-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-semibold mb-2">
            <Briefcase className="w-4 h-4" /> TPO Matcher AI Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Training & Placement Cell (TPO)</h2>
          <p className="text-xs text-cyan-200 mt-1 max-w-xl">
            Semantic resume-to-JD matching, campus recruitment drive announcements, interview slot scheduling, and offer letter analytics.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-navy-950 rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Submit Placement Query
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Placement Requests"
          value={placementCases.length}
          subtitle="Drives, eligibility & interview links"
          icon={<Briefcase className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Recruitment Cases"
          value={activeCount}
          subtitle="Screening & drive registration"
          icon={<Users className="w-5 h-5" />}
          alert={activeCount > 0}
        />
        <MetricCard
          title="Resolved Offers & Inquiries"
          value={resolvedCount}
          subtitle="Interview coordinates dispatched"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">TPO Operational Queue ({placementCases.length})</h3>
        <CaseTable
          cases={placementCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
