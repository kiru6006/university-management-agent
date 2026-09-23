import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { CaseTable } from '../components/common/CaseTable';
import { GraduationCap, Users, Clock, CheckCircle2, FileCheck, Award, Zap } from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface AdmissionsPageProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onSelectCase, onNavigate }) => {
  const { cases, approveClassification } = useCases();

  const admissionCases = useMemo(() => {
    return cases.filter(c => c.category === 'Admissions' || c.assignedDepartment === 'Admission Office');
  }, [cases]);

  const pendingCount = admissionCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
  const inProgressCount = admissionCases.filter(c => c.status === 'Routed' || c.status === 'In Progress').length;
  const resolvedCount = admissionCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      {/* Department Banner */}
      <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-2">
            <GraduationCap className="w-4 h-4" /> Admission AI Agent Online
          </div>
          <h2 className="text-xl font-bold tracking-tight">Admissions & Enrollment Operations</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Autonomous eligibility evaluation, cutoff analytics, high school marksheet OCR verification, and prospect inquiry management.
          </p>
        </div>

        <button
          onClick={() => onNavigate('submit')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Zap className="w-4 h-4" /> Log Prospect Inquiry
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Admissions Inquiries"
          value={admissionCases.length}
          subtitle="Direct & online applications"
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending Document / Eligibility Review"
          value={pendingCount}
          subtitle="Awaiting officer confirmation"
          icon={<Clock className="w-5 h-5" />}
          alert={pendingCount > 0}
        />
        <MetricCard
          title="Verified & Enrolled"
          value={resolvedCount}
          subtitle="SLA turnaround: < 24 Hours"
          icon={<CheckCircle2 className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Admission Workflow Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-700">
            <FileCheck className="w-4 h-4" /> 1. OCR Marksheet Parser
          </div>
          <p className="text-slate-600">
            Automatically extracts PCM/PCB percentages from 10th and 12th certificates to evaluate branch cutoffs.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-indigo-700">
            <Award className="w-4 h-4" /> 2. Merit & Quota Matching
          </div>
          <p className="text-slate-600">
            Maps candidate ranks to General, Management, and Sports reservation quota seat allocations.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-emerald-700">
            <Users className="w-4 h-4" /> 3. Fee Link & Welcome Kit
          </div>
          <p className="text-slate-600">
            Generates provisional allotment orders and dispatches registration fee payment links instantly.
          </p>
        </div>
      </div>

      {/* Department Cases Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Admissions Operational Queue ({admissionCases.length})</h3>
        <CaseTable
          cases={admissionCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
