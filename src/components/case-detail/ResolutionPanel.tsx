import React, { useState } from 'react';
import { CaseItem, CaseStatus } from '../../types';
import { useCases } from '../../context/CaseContext';
import { CheckCircle2, RefreshCw, CheckCheck, AlertCircle } from 'lucide-react';

interface ResolutionPanelProps {
  caseItem: CaseItem;
}

const STATUS_OPTIONS: CaseStatus[] = [
  'In Progress',
  'Waiting for Student',
  'Resolved',
  'Closed'
];

export const ResolutionPanel: React.FC<ResolutionPanelProps> = ({ caseItem }) => {
  const { updateCaseStatus, resolveCase } = useCases();
  const [status, setStatus] = useState<CaseStatus>(caseItem.status);
  const [resolutionNotes, setResolutionNotes] = useState(caseItem.resolutionNotes || '');
  const [statusChangeNote, setStatusChangeNote] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [error, setError] = useState('');

  const isResolved = caseItem.status === 'Resolved' || caseItem.status === 'Closed';

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'Resolved') {
      setIsResolving(true);
      return;
    }
    updateCaseStatus(caseItem.id, status, statusChangeNote.trim() || undefined);
    setStatusChangeNote('');
  };

  const handleFinalResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) {
      setError('Please provide clear resolution notes describing how the case was handled.');
      return;
    }
    setError('');
    resolveCase(caseItem.id, resolutionNotes.trim());
    setIsResolving(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <CheckCheck className="w-4 h-4 text-emerald-600" />
          Department Status & Resolution Center
        </h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
          Current: {caseItem.status}
        </span>
      </div>

      {isResolved ? (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Case Formally Resolved by {caseItem.resolvedBy} on {caseItem.resolvedAt}
          </div>
          <div className="text-xs text-emerald-950 font-medium bg-white/80 p-3 rounded-lg border border-emerald-100">
            {caseItem.resolutionNotes}
          </div>
        </div>
      ) : isResolving ? (
        <form onSubmit={handleFinalResolve} className="p-4 bg-emerald-50/40 border border-emerald-300 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Finalize Resolution & Close Ticket
            </h4>
            <button
              type="button"
              onClick={() => setIsResolving(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Cancel
            </button>
          </div>

          {error && <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">{error}</div>}

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Official Resolution Summary <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={resolutionNotes}
              onChange={e => setResolutionNotes(e.target.value)}
              placeholder="Detail the actions taken, dispatched links/receipts/transcripts, or approved waivers..."
              rows={3}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsResolving(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm Resolution
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleUpdateStatus} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Update Case State</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as CaseStatus)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">State Update Note (Optional)</label>
              <input
                type="text"
                value={statusChangeNote}
                onChange={e => setStatusChangeNote(e.target.value)}
                placeholder="e.g. Sent fee challan to student"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsResolving(true)}
              className="px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolve Immediately
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Update State
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
