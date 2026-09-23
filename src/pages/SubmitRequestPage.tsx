import React, { useState, useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { classifyRequest } from '../services/aiClassifier';
import { PageId } from '../components/layout/Sidebar';
import {
  Send,
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  FileText,
  User,
  Mail,
  Phone,
  BookOpen,
  HelpCircle,
  Clock
} from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';

interface SubmitRequestPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
}

export const SubmitRequestPage: React.FC<SubmitRequestPageProps> = ({ onNavigate, onSelectCase }) => {
  const { createCase, currentRole } = useCases();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requesterName, setRequesterName] = useState('Ankit Verma');
  const [requesterEmail, setRequesterEmail] = useState('ankit.verma@student.uni.edu');
  const [requesterPhone, setRequesterPhone] = useState('+91 98765 11223');
  const [studentId, setStudentId] = useState('2024-CS-098');
  const [departmentOrigin, setDepartmentOrigin] = useState('Computer Science');
  const [channel, setChannel] = useState<'Web Portal' | 'Mobile App' | 'Email Forward' | 'WhatsApp' | 'Campus Kiosk' | 'Direct Entry'>('Web Portal');

  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  // Live real-time classification preview
  const liveClassification = useMemo(() => {
    if (!title.trim() && !description.trim()) {
      return null;
    }
    return classifyRequest(title, description);
  }, [title, description]);

  const PRESETS = [
    {
      label: 'Fee Installment Request',
      title: 'Need 3 installment plan for Semester 4 tuition fees',
      desc: 'Requesting permission to pay ₹60,000 semester fee dues in 3 monthly installments due to family financial constraint.'
    },
    {
      label: 'Admissions Cutoff Query',
      title: '12th marks eligibility cutoff for B.Tech AI & Data Science admission',
      desc: 'I have 82% in 12th CBSE with PCM. Am I eligible for direct merit admission to B.Tech Artificial Intelligence?'
    },
    {
      label: 'Exam Timetable Clash',
      title: 'Exam date collision: Backlog Mathematics exam overlaps with Operating Systems exam',
      desc: 'My supplementary paper CS201 and regular paper CS401 are scheduled on the exact same date Oct 20 at 10 AM.'
    },
    {
      label: 'Hostel Water Complaint',
      title: 'Urgent: Water supply disruption in Hostel Block B washrooms',
      desc: 'Hostel Block B 2nd floor has had no running water for over 36 hours. Please direct maintenance staff immediately.'
    },
    {
      label: 'Bonafide Certificate',
      title: 'Urgent Bonafide Study Certificate for Bank Education Loan',
      desc: 'State Bank of India requires an official stamped bonafide study certificate with fee structure for loan disbursement.'
    },
    {
      label: 'Scopus Paper Verification',
      title: 'Faculty incentive claim for IEEE Transactions publication DOI verification',
      desc: 'I published a research paper in IEEE Access with DOI 10.1109/ACCESS.2026.1042. Requesting R&D cell verification.'
    }
  ];

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newCase = createCase({
      title: title.trim(),
      description: description.trim(),
      requesterName: requesterName.trim() || 'Anonymous Student',
      requesterEmail: requesterEmail.trim() || 'student@uni.edu',
      requesterPhone: requesterPhone.trim() || undefined,
      studentId: studentId.trim() || undefined,
      departmentOrigin: departmentOrigin.trim() || undefined,
      channel
    });

    setSubmittedCaseId(newCase.id);
  };

  if (submittedCaseId) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-emerald-200 p-8 shadow-sm text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Request Successfully Ingested & Classified!</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          The UniOps-AI semantic orchestrator has analyzed the request, computed confidence scores, and enqueued the case in the department review queue.
        </p>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => onSelectCase(submittedCaseId)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" /> View Case Audit & Detail
          </button>
          <button
            onClick={() => {
              setSubmittedCaseId(null);
              setTitle('');
              setDescription('');
            }}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-600" /> New Student / Institutional Request
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit a request to test the autonomous AI intent classification, routing, and review pipeline.
          </p>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Quick Test Templates (Click to fill)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-slate-700 rounded-md border border-slate-200 text-xs font-medium transition-colors text-left"
              >
                + {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Requester Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={e => setRequesterName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                University Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={requesterEmail}
                  onChange={e => setRequesterEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student / Employee ID</label>
              <input
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. 2024-CS-098"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Submission Channel</label>
              <select
                value={channel}
                onChange={e => setChannel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500"
              >
                <option value="Web Portal">Web Portal</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Email Forward">Email Forward</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Campus Kiosk">Campus Kiosk</option>
                <option value="Direct Entry">Direct Entry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Request Title / Summary <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Timetable collision between Semester 3 backlog and core exam"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-brand-500 placeholder:font-normal placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Detailed Request Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Provide all relevant background, course codes, dates, transaction IDs, or grievance details..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md shadow-brand-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit & Classify with AI
            </button>
          </div>
        </form>
      </div>

      {/* Right Col: Live AI Classification Preview */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-purple-50 via-white to-brand-50 rounded-2xl border border-purple-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-100">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                Live AI Classifier Preview
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              </h3>
              <p className="text-[11px] text-slate-500">Real-time heuristic & semantic inference</p>
            </div>
          </div>

          {liveClassification ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Confidence Match:</span>
                <ConfidenceBadge score={liveClassification.confidenceScore} />
              </div>

              <div className="p-3 bg-white rounded-lg border border-purple-100 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Identified Category</span>
                  <span className="font-bold text-slate-900 text-sm">{liveClassification.category}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Suggested Department</span>
                  <span className="font-bold text-brand-700">{liveClassification.suggestedDepartment}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Assessed Priority</span>
                  <PriorityBadge priority={liveClassification.priority} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Classification Reason:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">{liveClassification.reasoning}</p>
              </div>

              {liveClassification.extractedKeywords.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Matched Keywords</span>
                  <div className="flex flex-wrap gap-1">
                    {liveClassification.extractedKeywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 rounded bg-purple-100/70 text-purple-800 text-[10px] font-mono">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-purple-300 animate-pulse" />
              <p className="text-xs font-medium">Type a title or description on the left to see live AI routing in action.</p>
            </div>
          )}
        </div>

        {/* Security Alert Note */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-1">
          <strong className="font-semibold text-slate-700 block">Enterprise Guardrail Active:</strong>
          All incoming text is automatically filtered through the Microsoft Presidio PII sanitizer before LLM inference. Sensitive financial or medical documents require secondary Human-in-the-Loop approval.
        </div>
      </div>
    </div>
  );
};
