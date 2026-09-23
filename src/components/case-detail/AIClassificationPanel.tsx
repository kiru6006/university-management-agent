import React from 'react';
import { CaseItem } from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { Sparkles, Bot, Tag, ShieldCheck, FileText } from 'lucide-react';

interface AIClassificationPanelProps {
  caseItem: CaseItem;
}

export const AIClassificationPanel: React.FC<AIClassificationPanelProps> = ({ caseItem }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50/40 via-white to-brand-50/30 rounded-xl border border-purple-200/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              UniOps-AI Classification Engine
              <Sparkles className="w-4 h-4 text-purple-600" />
            </h3>
            <p className="text-xs text-slate-500">Autonomous semantic analysis & entity extraction</p>
          </div>
        </div>
        <ConfidenceBadge score={caseItem.confidenceScore} />
      </div>

      {/* Summary Card */}
      <div className="bg-white/80 rounded-lg p-3.5 border border-purple-100">
        <div className="text-xs font-semibold uppercase text-purple-700 mb-1 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          AI Generated Executive Summary
        </div>
        <p className="text-xs text-slate-800 font-medium leading-relaxed">{caseItem.aiSummary}</p>
      </div>

      {/* Grid Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3 rounded-lg border border-slate-200/70">
          <span className="text-slate-400 block text-[11px] mb-1">Detected Category</span>
          <span className="font-bold text-slate-900">{caseItem.category}</span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/70">
          <span className="text-slate-400 block text-[11px] mb-1">Target Department</span>
          <span className="font-bold text-slate-900">{caseItem.suggestedDepartment}</span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/70">
          <span className="text-slate-400 block text-[11px] mb-1">Assessed Priority</span>
          <PriorityBadge priority={caseItem.priority} />
        </div>
      </div>

      {/* AI Reasoning & Rationale */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs">
        <span className="font-semibold text-slate-700 block mb-1 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Classification Rationale & Safety Guardrails
        </span>
        <p className="text-slate-600 text-[11px] leading-relaxed">{caseItem.aiReasoning}</p>
      </div>

      {/* Extracted Keywords */}
      {caseItem.extractedKeywords && caseItem.extractedKeywords.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Keywords:
          </span>
          {caseItem.extractedKeywords.map(kw => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-mono"
            >
              #{kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
