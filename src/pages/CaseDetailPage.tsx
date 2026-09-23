import React from 'react';
import { useCases } from '../context/CaseContext';
import { PageId } from '../components/layout/Sidebar';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { AIClassificationPanel } from '../components/case-detail/AIClassificationPanel';
import { ReviewOverridePanel } from '../components/case-detail/ReviewOverridePanel';
import { CaseTimeline } from '../components/case-detail/CaseTimeline';
import { ResolutionPanel } from '../components/case-detail/ResolutionPanel';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  Radio,
  FileText,
  ShieldAlert,
  Bot
} from 'lucide-react';

interface CaseDetailPageProps {
  caseId: string;
  onNavigate: (page: PageId) => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({ caseId, onNavigate }) => {
  const { cases } = useCases();

  const caseItem = cases.find(c => c.id === caseId);

  if (!caseItem) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Case Not Found</h3>
        <p className="text-xs text-slate-500">The requested ticket ID does not exist in the active database.</p>
        <button
          onClick={() => onNavigate('inbox')}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold"
        >
          Back to Unified Inbox
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header / Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('inbox')}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 transition-colors"
            title="Back to Inbox"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">{caseItem.ticketId}</span>
              <StatusBadge status={caseItem.status} />
              <PriorityBadge priority={caseItem.priority} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{caseItem.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>Submitted {caseItem.createdAt}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Original Request + Review + Resolution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Student Request Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <FileText className="w-4 h-4 text-brand-600" />
                Original Ingested Request
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Channel: {caseItem.channel}
              </span>
            </div>

            {/* Requester Profile Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Requester</span>
                <span className="font-bold text-slate-900">{caseItem.requesterName}</span>
                <span className="text-slate-500 text-[11px] block">({caseItem.role})</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student ID</span>
                <span className="font-mono text-slate-800">{caseItem.studentId || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Contact Email</span>
                <span className="text-slate-700 truncate block">{caseItem.requesterEmail}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department Origin</span>
                <span className="text-slate-700">{caseItem.departmentOrigin || 'General Campus'}</span>
              </div>
            </div>

            {/* Request Message Content */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700">Detailed Message:</span>
              <div className="p-3.5 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {caseItem.description}
              </div>
            </div>
          </div>

          {/* Review & Override Panel */}
          <ReviewOverridePanel caseItem={caseItem} />

          {/* Department Resolution Center */}
          <ResolutionPanel caseItem={caseItem} />
        </div>

        {/* Right Col: AI Classification + Timeline */}
        <div className="space-y-6">
          {/* AI Semantic Classification Card */}
          <AIClassificationPanel caseItem={caseItem} />

          {/* Activity Timeline */}
          <CaseTimeline caseId={caseItem.id} timeline={caseItem.timeline} />
        </div>
      </div>
    </div>
  );
};
