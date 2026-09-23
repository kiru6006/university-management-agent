import React, { useState, useRef, useEffect } from 'react';
import { useCases } from '../../context/CaseContext';
import { classifyRequest } from '../../services/aiClassifier';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import {
  MessageSquare,
  Sparkles,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  agentName?: string;
  category?: string;
  department?: string;
  confidenceScore?: number;
  actionPayload?: {
    type: 'CREATE_TICKET';
    title: string;
    description: string;
  };
  ticketCreatedId?: string;
}

export const AIChatbot: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const { createCase, currentUserName, currentRole } = useCases();

  const [isOpen, setIsOpen] = useState(embedded);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: `Hello ${currentUserName.split(' ')[0]}! I am the **UniOps-AI Central Campus Assistant**. I can help you with admissions, fees, exam timetables, result disputes, grievances, scholarships, and placements. How can I assist you today?`,
      timestamp: 'Just now',
      agentName: 'UniOps-AI Orchestrator',
      category: 'General Student Services',
      confidenceScore: 0.99
    }
  ]);

  const QUICK_PROMPTS = [
    "How can I apply for fee installment?",
    "When is the Semester 4 exam timetable?",
    "Check B.Tech CS admission cutoffs",
    "Water supply issue in Hostel Block C",
    "Where is the bonafide certificate issued?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateAgentResponse = (userQuery: string) => {
    const classification = classifyRequest(userQuery, userQuery);
    let reply = "";
    const agentName = `${classification.category} Agent (${classification.suggestedDepartment})`;

    switch (classification.category) {
      case 'Fees':
        reply = `Your request regarding **Fees & Dues** has been routed to the **Finance Department**.\n\n- **Tuition Statements:** You can view itemized fees under the Fees & Finance tab.\n- **Installments:** Under university hardship policy, students can request up to 3 monthly installments.\n\nWould you like me to create an official CFO review ticket for this?`;
        break;
      case 'Exams':
        reply = `The **Controller of Examinations (COE)** handles timetables, admit cards, and hall tickets.\n\n- **Timetable Check:** Regular end-semester exams commence October 15.\n- **Clash Resolution:** If your regular paper overlaps with a supplementary exam, we can immediately file a collision dispute.`;
        break;
      case 'Results':
        reply = `I have matched your query to the **Examination Cell**.\n\n- **Grade Transcripts:** SGPA & CGPA ledgers are live on the Results tab.\n- **Revaluation:** If you have a discrepancy or were wrongly marked absent, formal re-evaluation can be initiated with an audit fee of ₹500.`;
        break;
      case 'Admissions':
        reply = `Welcome to the **Admissions Office** assistance!\n\n- **Cutoff Eligibility:** Engineering programs require 60%+ aggregate in 12th standard (PCM).\n- **Document Verification:** You can upload your marksheet for real-time OCR validation on our Admissions Portal.`;
        break;
      case 'Complaints':
        reply = `Your concern has been categorized as a **Priority Grievance** for the **Student Welfare & Grievance Cell**.\n\n- **Resolution SLA:** Routine facility matters are addressed within 24–48 hours.\n- **Emergency Safety:** Any harassment or safety issue immediately bypasses routine queues to alert Campus Security & Counseling.`;
        break;
      case 'Scholarships':
        reply = `The **Scholarship Cell** supports 50+ national (NSP), state merit, and corporate financial aid schemes. Verification of income certificates is currently open for the active semester.`;
        break;
      case 'Placements':
        reply = `The **Training & Placement Cell (TPO)** is actively hosting corporate recruitment drives. Current active drives include Microsoft (SDE), CloudScale Technologies, and Nexus Analytics.`;
        break;
      case 'Certificates & Records':
        reply = `You can generate official, digitally signed **Bonafide Study Certificates** with verification QR codes in less than 30 seconds from the Student Services tab.`;
        break;
      default:
        reply = `I understand your inquiry. The **Student Affairs Office** is ready to assist you. You can ask further details or create an official ticket for departmental follow-up.`;
    }

    return {
      reply,
      classification,
      agentName
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, classification, agentName } = generateAgentResponse(text);

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName,
        category: classification.category,
        department: classification.suggestedDepartment,
        confidenceScore: classification.confidenceScore,
        actionPayload: {
          type: 'CREATE_TICKET',
          title: text.length > 60 ? text.slice(0, 60) + '...' : text,
          description: text
        }
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCreateTicketFromChat = (msg: ChatMessage) => {
    if (!msg.actionPayload) return;

    const newCase = createCase({
      title: msg.actionPayload.title,
      description: msg.actionPayload.description,
      requesterName: currentUserName,
      requesterEmail: 'student@uni.edu',
      channel: 'Web Portal'
    });

    setMessages(prev =>
      prev.map(m =>
        m.id === msg.id
          ? {
              ...m,
              ticketCreatedId: newCase.ticketId
            }
          : m
      )
    );
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'agent',
        text: `Conversation cleared. How can I help you across university admissions, fees, exams, or student services?`,
        timestamp: 'Just now',
        agentName: 'UniOps-AI Orchestrator',
        category: 'General Student Services',
        confidenceScore: 0.99
      }
    ]);
  };

  // If Embedded on Dashboard
  if (embedded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-navy-900 to-brand-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/30 border border-brand-400/30 flex items-center justify-center text-brand-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                UniOps-AI Interactive Assistant
                <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              </h3>
              <p className="text-[10px] text-slate-300">Autonomous multi-agent routing & inquiry resolution</p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Agent Tag */}
              {msg.sender === 'agent' && msg.agentName && (
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-500 font-semibold pl-1">
                  <Bot className="w-3.5 h-3.5 text-purple-600" />
                  <span>{msg.agentName}</span>
                  {msg.confidenceScore && <ConfidenceBadge score={msg.confidenceScore} />}
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Ticket Creation Prompt Button */}
                {msg.sender === 'agent' && msg.actionPayload && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    {msg.ticketCreatedId ? (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ticket Logged: {msg.ticketCreatedId}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCreateTicketFromChat(msg)}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <FileText className="w-3 h-3" /> Log Official Ticket
                      </button>
                    )}
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
              <Bot className="w-4 h-4 text-purple-500 animate-bounce" />
              <span>UniOps-AI is analyzing intent...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors border border-slate-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about admissions, fees, exam clashes, or grievances..."
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-slate-400 transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="p-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Floating Widget Mode
  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group ring-4 ring-brand-500/20"
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-bold pr-1 hidden sm:inline">Ask UniOps-AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute top-1 right-1 border-2 border-white"></span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-navy-900 via-navy-800 to-brand-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/30 border border-brand-400/30 flex items-center justify-center text-brand-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs flex items-center gap-1.5 text-white">
                  UniOps-AI Assistant
                  <Sparkles className="w-3 h-3 text-brand-300" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> 11 Agents Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Clear chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thread */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'agent' && msg.agentName && (
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 font-semibold pl-1">
                    <Bot className="w-3 h-3 text-purple-600" />
                    <span>{msg.agentName}</span>
                    {msg.confidenceScore && <ConfidenceBadge score={msg.confidenceScore} />}
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-xs shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {msg.sender === 'agent' && msg.actionPayload && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      {msg.ticketCreatedId ? (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ticket: {msg.ticketCreatedId}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCreateTicketFromChat(msg)}
                          className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-md text-[10px] font-bold transition-all flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" /> Log Official Ticket
                        </button>
                      )}
                      <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pl-2">
                <Bot className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                <span>Routing to specialized agent...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
