import React from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import { DepartmentCard } from '../components/common/DepartmentCard';
import { CaseTable } from '../components/common/CaseTable';
import { AIChatbot } from '../components/chat/AIChatbot';
import { PageId } from '../components/layout/Sidebar';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Calendar,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot
} from 'lucide-react';
import { Department } from '../types';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectCase }) => {
  const { cases, metrics, approveClassification } = useCases();

  const recentCases = cases.slice(0, 5);

  const getDepartmentStats = (deptName: Department) => {
    const deptCases = cases.filter(c => c.assignedDepartment === deptName);
    const pending = deptCases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
    const active = deptCases.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;
    const resolved = deptCases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    return { pending, active, resolved };
  };

  return (
    <div className="space-y-6">
      {/* Executive AI Banner */}
      <div className="p-6 bg-gradient-to-r from-navy-900 via-navy-800 to-brand-900 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-2 border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Autonomous Campus Operations Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">University AI Request & Operations Hub</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Ask questions via the live AI Chatbot below, submit cases, and manage Human-in-the-Loop reviews across 11 university departments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('submit')}
              className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/30 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" /> New Student Request
            </button>
            <button
              onClick={() => onNavigate('department-approvals')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-xs transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Review Queue ({metrics.pendingReview})
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive AI Chatbot Section on Dashboard */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-600" />
              University AI Operations Assistant (Live Chatbot)
            </h3>
            <p className="text-xs text-slate-500">
              Ask anything about admissions, fees, exam timetables, revaluations, scholarships, or complaints in natural language.
            </p>
          </div>
        </div>

        <AIChatbot embedded={true} />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Ingested Cases"
          value={metrics.totalCases}
          subtitle="All multi-channel university requests"
          icon={<Inbox className="w-5 h-5" />}
          onClick={() => onNavigate('inbox')}
        />
        <MetricCard
          title="Pending Staff Review"
          value={metrics.pendingReview}
          subtitle="Awaiting human confirmation"
          icon={<Clock className="w-5 h-5" />}
          alert={metrics.pendingReview > 0}
          onClick={() => onNavigate('department-approvals')}
        />
        <MetricCard
          title="Active Routed Cases"
          value={metrics.routedCases}
          subtitle="In progress across departments"
          icon={<Zap className="w-5 h-5" />}
          highlight
          onClick={() => onNavigate('inbox')}
        />
        <MetricCard
          title="Resolved & Closed"
          value={metrics.resolvedCases}
          subtitle="Avg resolution: 4.2 hours"
          icon={<CheckCircle2 className="w-5 h-5" />}
          trend={{ value: '88.5% Automated', isPositive: true }}
          onClick={() => onNavigate('inbox')}
        />
      </div>

      {/* Secondary Departmental Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Open Complaints"
          value={metrics.openComplaints}
          subtitle="Hostel & welfare tickets"
          icon={<AlertTriangle className="w-5 h-5" />}
          alert={metrics.openComplaints > 0}
          onClick={() => onNavigate('complaints')}
        />
        <MetricCard
          title="Fee & Due Inquiries"
          value={metrics.pendingFeeIssues}
          subtitle="Tuition & installment requests"
          icon={<CreditCard className="w-5 h-5" />}
          onClick={() => onNavigate('fees')}
        />
        <MetricCard
          title="Exam & Result Inquiries"
          value={metrics.examResultIssues}
          subtitle="Timetable clashes & revaluations"
          icon={<Calendar className="w-5 h-5" />}
          onClick={() => onNavigate('exams')}
        />
        <MetricCard
          title="Placement Applications"
          value={metrics.placementRequests}
          subtitle="Campus recruitment & drives"
          icon={<Briefcase className="w-5 h-5" />}
          onClick={() => onNavigate('placements')}
        />
      </div>

      {/* Department Operation Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Department Operation Hubs</h3>
            <p className="text-xs text-slate-500">Live operational status and queue loads per university cell</p>
          </div>
          <button
            onClick={() => onNavigate('inbox')}
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            View All Cases <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DepartmentCard
            department="Admission Office"
            icon={<GraduationCap className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Admission Office').active}
            pendingReviewCount={getDepartmentStats('Admission Office').pending}
            resolvedCount={getDepartmentStats('Admission Office').resolved}
            description="Program inquiries, 12th eligibility checking, document verification and merit admissions."
            onClick={() => onNavigate('admissions')}
          />

          <DepartmentCard
            department="Finance Department"
            icon={<CreditCard className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Finance Department').active}
            pendingReviewCount={getDepartmentStats('Finance Department').pending}
            resolvedCount={getDepartmentStats('Finance Department').resolved}
            description="Semester fees, payment challans, ledger statements and audited installment applications."
            onClick={() => onNavigate('fees')}
          />

          <DepartmentCard
            department="Controller of Examinations"
            icon={<Calendar className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Controller of Examinations').active}
            pendingReviewCount={getDepartmentStats('Controller of Examinations').pending}
            resolvedCount={getDepartmentStats('Controller of Examinations').resolved}
            description="Timetables, hall tickets, seating plans and backlog exam collision resolution."
            onClick={() => onNavigate('exams')}
          />

          <DepartmentCard
            department="Student Welfare / Grievance Cell"
            icon={<AlertTriangle className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Student Welfare / Grievance Cell').active}
            pendingReviewCount={getDepartmentStats('Student Welfare / Grievance Cell').pending}
            resolvedCount={getDepartmentStats('Student Welfare / Grievance Cell').resolved}
            description="Campus facilities, hostel maintenance, discipline, and anti-harassment emergency bypass."
            onClick={() => onNavigate('complaints')}
          />

          <DepartmentCard
            department="Training & Placement Cell"
            icon={<Briefcase className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Training & Placement Cell').active}
            pendingReviewCount={getDepartmentStats('Training & Placement Cell').pending}
            resolvedCount={getDepartmentStats('Training & Placement Cell').resolved}
            description="Recruitment drives, resume matching against corporate JDs, and interview notifications."
            onClick={() => onNavigate('placements')}
          />

          <DepartmentCard
            department="Research & Development Cell"
            icon={<FlaskConical className="w-5 h-5" />}
            activeCasesCount={getDepartmentStats('Research & Development Cell').active}
            pendingReviewCount={getDepartmentStats('Research & Development Cell').pending}
            resolvedCount={getDepartmentStats('Research & Development Cell').resolved}
            description="Journal publications, Scopus/DOI indexing verification, faculty incentives & patents."
            onClick={() => onNavigate('research-publications')}
          />
        </div>
      </div>

      {/* Recent Cases Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Incoming Requests</h3>
            <p className="text-xs text-slate-500">Real-time incoming student requests and AI classification results</p>
          </div>
          <button
            onClick={() => onNavigate('inbox')}
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            Open Unified Inbox <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <CaseTable
          cases={recentCases}
          onSelectCase={item => onSelectCase(item.id)}
          onQuickApprove={id => approveClassification(id)}
        />
      </div>
    </div>
  );
};
