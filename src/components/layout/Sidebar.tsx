import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  PlusCircle,
  GraduationCap,
  CreditCard,
  CalendarDays,
  Award,
  AlertTriangle,
  Banknote,
  BookOpen,
  Briefcase,
  FlaskConical,
  Users,
  ShieldCheck,
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';

export type PageId =
  | 'dashboard'
  | 'inbox'
  | 'submit'
  | 'case-detail'
  | 'admissions'
  | 'fees'
  | 'exams'
  | 'results'
  | 'complaints'
  | 'scholarships'
  | 'degree-programs'
  | 'placements'
  | 'research-publications'
  | 'faculty-services'
  | 'department-approvals'
  | 'reports'
  | 'settings';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpenMobile, onCloseMobile }) => {
  const { metrics, cases } = useCases();

  const pendingApprovalsCount = cases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;

  const NAV_SECTIONS = [
    {
      title: 'Operations Hub',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'inbox', label: 'Unified Inbox', icon: Inbox, badge: metrics.totalCases },
        { id: 'submit', label: 'Submit Request', icon: PlusCircle, highlight: true },
        { id: 'department-approvals', label: 'HITL Approvals', icon: ShieldCheck, alertBadge: pendingApprovalsCount }
      ]
    },
    {
      title: 'Academic Departments',
      items: [
        { id: 'admissions', label: 'Admissions', icon: GraduationCap },
        { id: 'fees', label: 'Fees & Finance', icon: CreditCard, count: metrics.pendingFeeIssues },
        { id: 'exams', label: 'Exams & Seating', icon: CalendarDays },
        { id: 'results', label: 'Results & Grades', icon: Award },
        { id: 'complaints', label: 'Complaints & Grievances', icon: AlertTriangle, count: metrics.openComplaints },
        { id: 'scholarships', label: 'Scholarships', icon: Banknote },
        { id: 'degree-programs', label: 'Degree Programs', icon: BookOpen },
        { id: 'placements', label: 'Placements & TPO', icon: Briefcase, count: metrics.placementRequests },
        { id: 'research-publications', label: 'Research & Publications', icon: FlaskConical },
        { id: 'faculty-services', label: 'Faculty Services', icon: Users }
      ]
    },
    {
      title: 'Analytics & Config',
      items: [
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Admin Settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-navy-950/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-900 text-slate-300 border-r border-navy-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-navy-800 bg-navy-950/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white tracking-tight text-base flex items-center gap-1.5">
              UniOps<span className="text-brand-400">AI</span>
              <span className="px-1.5 py-0.2 bg-brand-500/20 text-brand-300 text-[10px] font-mono rounded">v1.0</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">University Operations Agent</div>
          </div>
        </div>

        {/* Navigation Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id as PageId);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30 font-bold'
                          : item.highlight
                          ? 'bg-brand-500/10 text-brand-300 hover:bg-brand-500/20 border border-brand-500/20'
                          : 'text-slate-300 hover:bg-navy-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-white'
                              : item.highlight
                              ? 'text-brand-400'
                              : 'text-slate-400 group-hover:text-white'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {/* Badges */}
                      {item.alertBadge !== undefined && item.alertBadge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-navy-950 animate-pulse">
                          {item.alertBadge}
                        </span>
                      )}
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-navy-800 text-slate-300 border border-navy-700">
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* AI Agent Status Footer */}
        <div className="p-3 border-t border-navy-800 bg-navy-950/60">
          <div className="p-3 rounded-lg bg-navy-800/80 border border-navy-700 text-xs">
            <div className="flex items-center justify-between text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-white text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Semantic Router
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-400">
              11 Active Domain Sub-Agents • Presidio PII Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
