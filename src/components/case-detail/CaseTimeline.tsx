import React, { useState } from 'react';
import { TimelineEvent } from '../../types';
import { useCases } from '../../context/CaseContext';
import { Clock, Send, User, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CaseTimelineProps {
  caseId: string;
  timeline: TimelineEvent[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ caseId, timeline }) => {
  const { addTimelineNote } = useCases();
  const [note, setNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    addTimelineNote(caseId, note.trim());
    setNote('');
  };

  const getActorIcon = (role: string) => {
    if (role.toLowerCase().includes('ai')) {
      return <Bot className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (role.toLowerCase().includes('officer') || role.toLowerCase().includes('controller') || role.toLowerCase().includes('dean')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />;
    }
    return <User className="w-3.5 h-3.5 text-slate-600" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          Audit Trail & Activity Timeline
        </h3>
        <span className="text-xs text-slate-400">{timeline.length} Recorded Events</span>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((event, idx) => (
          <div key={event.id || idx} className="relative group">
            {/* Dot / Icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center shadow-xs">
              {getActorIcon(event.role)}
            </div>

            <div className="text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{event.action}</span>
                <span className="text-[11px] text-slate-400 font-mono">{event.timestamp}</span>
              </div>

              <div className="text-[11px] text-slate-500 mt-0.5">
                by <strong className="text-slate-700">{event.actor}</strong> ({event.role})
              </div>

              {event.notes && (
                <div className="mt-1.5 p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 text-xs leading-relaxed">
                  {event.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Note Form */}
      <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add an internal staff note to this case..."
          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
        >
          <Send className="w-3.5 h-3.5" /> Post Note
        </button>
      </form>
    </div>
  );
};
