import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { AlertTriangle, ShieldAlert, CheckCircle2, Clock, Zap, HeartPulse } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface ComplaintsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ComplaintsPage: React.FC<ComplaintsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const complaintCases = useMemo(() => {
    return cases.filter(c => c.category === 'Complaints' || c.assignedDepartment === 'Student Welfare / Grievance Cell');
  }, [cases]);

  const criticalCount = complaintCases.filter(c => c.priority === 'Critical').length;
  const pendingCount = complaintCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
  const resolvedCount = complaintCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-rose-950 via-rose-900 to-navy-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold mb-2">
            <AlertTriangle className="w-4 h-4" /> Grievance AI Router Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Student Welfare & Grievance Redressal</h2>
          <p className="text-xs text-rose-200 mt-1 max-w-xl">
            Automated priority detection (P1 Critical to P4 Routine), hostel facility ticketing, anti-ragging compliance, and crisis counseling bypass.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Lodge Grievance
        </button>
      </div>

      {/* Emergency Bypass Notice */}
      <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <HeartPulse className="w-5 h-5 text-rose-600 shrink-0 animate-pulse" />
          <div>
            <strong className="font-semibold">Zero-Delay Crisis Protocol:</strong> Inquiries expressing harassment, mental health distress, or physical safety threats immediately notify Campus Security and Psychological Counseling.
          </div>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 bg-rose-200 text-rose-800 text-[10px] font-mono font-bold rounded">
          SLA: &lt; 15 Mins
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Registered Grievances"
          value={complaintCases.length}
          subtitle="Hostel, faculty & infrastructure"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <MetricCard
          title="P1 Critical / High Urgency"
          value={criticalCount}
          subtitle="Direct Proctor oversight"
          icon={<ShieldAlert className="w-5 h-5" />}
          alert={criticalCount > 0}
        />
        <MetricCard
          title="Resolved Grievances"
          value={resolvedCount}
          subtitle="Actioned with feedback notes"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Department Cases Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Grievance Cell Queue ({complaintCases.length})</h3>
        <CaseTable
          cases={complaintCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
