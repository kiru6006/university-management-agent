import React from 'react';
import { UserRole } from '../../types';
import { useCases } from '../../context/CaseContext';
import { Menu, PlusCircle, RotateCcw, UserCheck, Shield } from 'lucide-react';
import { PageId } from './Sidebar';

interface TopbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMobileMenu: () => void;
}

const ROLES: UserRole[] = [
  'System Admin',
  'Student',
  'Parent',
  'Faculty',
  'Admission Officer',
  'Finance Officer',
  'Exam Controller',
  'Scholarship Officer',
  'Placement Officer',
  'Research Cell Officer',
  'HOD / Dean',
  'Registrar',
  'Vice Chancellor / University Management'
];

export const Topbar: React.FC<TopbarProps> = ({ activePage, onNavigate, onToggleMobileMenu }) => {
  const { currentRole, setCurrentRole, currentUserName, resetToDefaultData } = useCases();

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'dashboard':
        return { title: 'Executive Operations Dashboard', subtitle: 'Live university AI routing & departmental health metrics' };
      case 'inbox':
        return { title: 'Unified AI Request Inbox', subtitle: 'All incoming student and institutional cases with AI classification' };
      case 'submit':
        return { title: 'Submit New Request', subtitle: 'Instant semantic classification & automated routing' };
      case 'case-detail':
        return { title: 'Case Audit & Resolution Detail', subtitle: 'Human-in-the-Loop review, classification reasoning & timeline' };
      case 'admissions':
        return { title: 'Admissions & Enrollment Office', subtitle: 'Program eligibility, cutoffs, 12th marks validation & inquiries' };
      case 'fees':
        return { title: 'Fees & Accounts Department', subtitle: 'Tuition fees, challans, receipts, ledger statements & installment reviews' };
      case 'exams':
        return { title: 'Controller of Examinations (COE)', subtitle: 'Exam schedules, hall tickets, seating arrangements & timetable clash alerts' };
      case 'results':
        return { title: 'Examination Cell & Results', subtitle: 'Grade sheets, SGPA/CGPA calculations, revaluation requests & corrections' };
      case 'complaints':
        return { title: 'Student Welfare & Grievance Cell', subtitle: 'Multi-category grievance classification, priority dispatch & safety bypass' };
      case 'scholarships':
        return { title: 'Scholarship & Financial Aid Cell', subtitle: 'Merit/need scholarship matching, NSP portal renewal & income checks' };
      case 'degree-programs':
        return { title: 'Academic Council & Degree Programs', subtitle: 'Syllabus search, prerequisite validation, credit audits & elective locks' };
      case 'placements':
        return { title: 'Training & Placement Cell (TPO)', subtitle: 'Corporate campus drives, resume parsing, JD matching & interview alerts' };
      case 'research-publications':
        return { title: 'Research & Development (R&D) Cell', subtitle: 'Scopus/DOI publication verification, research rewards & patent tracking' };
      case 'faculty-services':
        return { title: 'Faculty & Staff Services', subtitle: 'Faculty appraisals, workload balance, leave requests & course allocations' };
      case 'department-approvals':
        return { title: 'Human-in-the-Loop (HITL) Approvals', subtitle: 'Departmental review queues for classification confirmation & overrides' };
      case 'reports':
        return { title: 'University Intelligence & Analytics', subtitle: 'Comprehensive operational summaries, turnaround times & SLA reports' };
      case 'settings':
        return { title: 'Platform & Agent Settings', subtitle: 'Confidence thresholds, PII guardrails & integration configurations' };
      default:
        return { title: 'UniOps-AI Platform', subtitle: 'University AI Operations' };
    }
  };

  const { title, subtitle } = getPageTitle(activePage);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">{title}</h1>
          <p className="text-[11px] text-slate-500 hidden sm:block mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Right: Role Switcher & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Role Selector Dropdown */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-lg p-1 px-2.5">
          <UserCheck className="w-4 h-4 text-brand-600 hidden sm:block" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-none">Acting Role</span>
            <select
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value as UserRole)}
              className="bg-transparent font-bold text-xs text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {ROLES.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Request Quick Button */}
        {activePage !== 'submit' && (
          <button
            onClick={() => onNavigate('submit')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs shadow-brand-600/20 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Request</span>
          </button>
        )}

        {/* Reset Database Quick Action */}
        <button
          onClick={() => {
            if (window.confirm('Reset sample database to default initial state?')) {
              resetToDefaultData();
            }
          }}
          title="Reset sample database to default mock data"
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
