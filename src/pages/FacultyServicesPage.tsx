import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { Users, Clock, CheckCircle2, Calendar, FileText, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface FacultyServicesPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const FacultyServicesPage: React.FC<FacultyServicesPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const facultyCases = useMemo(() => {
    return cases.filter(c => c.category === 'Faculty Services' || c.role === 'Faculty' || c.assignedDepartment === 'HR / Faculty Affairs');
  }, [cases]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-slate-900 via-navy-900 to-indigo-950 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold mb-2">
            <Users className="w-4 h-4" /> Faculty Affairs Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Faculty & Staff Operations Hub</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Faculty leave applications, teaching workload allotments, annual appraisal submissions, and invigilation duty schedules.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Log Faculty Request
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Faculty Requests"
          value={facultyCases.length}
          subtitle="Workload, leave & appraisals"
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending Dean / HOD Approvals"
          value={facultyCases.filter(c => c.status !== 'Resolved').length}
          subtitle="Duty & leave authorizations"
          icon={<Clock className="w-5 h-5" />}
          alert={facultyCases.filter(c => c.status !== 'Resolved').length > 0}
        />
        <MetricCard
          title="Approved & Reconciled"
          value={facultyCases.filter(c => c.status === 'Resolved').length}
          subtitle="Updated in HR database"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Faculty Operational Requests ({facultyCases.length})</h3>
        <CaseTable
          cases={facultyCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
