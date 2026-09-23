export type UserRole =
  | 'Student'
  | 'Parent'
  | 'Faculty'
  | 'Admission Officer'
  | 'Finance Officer'
  | 'Exam Controller'
  | 'Scholarship Officer'
  | 'Placement Officer'
  | 'Research Cell Officer'
  | 'HOD / Dean'
  | 'Registrar'
  | 'Vice Chancellor / University Management'
  | 'System Admin';

export type RequestCategory =
  | 'Admissions'
  | 'Fees'
  | 'Exams'
  | 'Results'
  | 'Complaints'
  | 'Scholarships'
  | 'Degree Programs'
  | 'Placements'
  | 'Research Publications'
  | 'Faculty Services'
  | 'Certificates & Records'
  | 'General Student Services';

export type Department =
  | 'Admission Office'
  | 'Finance Department'
  | 'Controller of Examinations'
  | 'Examination Cell'
  | 'Student Welfare / Grievance Cell'
  | 'Scholarship Cell'
  | 'Academic Council / HOD Office'
  | 'Training & Placement Cell'
  | 'Research & Development Cell'
  | 'Student Affairs Office'
  | 'HR / Faculty Affairs';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export type CaseStatus =
  | 'Submitted'
  | 'AI Classified'
  | 'Pending Review'
  | 'Routed'
  | 'In Progress'
  | 'Waiting for Student'
  | 'Resolved'
  | 'Closed';

export type Channel = 'Web Portal' | 'Mobile App' | 'Email Forward' | 'WhatsApp' | 'Campus Kiosk' | 'Direct Entry';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  notes?: string;
  previousState?: string;
  newState?: string;
}

export interface CaseItem {
  id: string;
  ticketId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  role: UserRole;
  studentId?: string;
  departmentOrigin?: string;
  title: string;
  description: string;
  channel: Channel;
  category: RequestCategory;
  suggestedDepartment: Department;
  assignedDepartment: Department;
  confidenceScore: number; // 0.0 - 1.0 (or 0-100)
  priority: Priority;
  status: CaseStatus;
  aiSummary: string;
  aiReasoning: string;
  extractedKeywords: string[];
  isOverridden: boolean;
  overrideNotes?: string;
  overriddenBy?: string;
  assignedOfficer?: string;
  timeline: TimelineEvent[];
  resolutionNotes?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIClassificationResult {
  category: RequestCategory;
  suggestedDepartment: Department;
  confidenceScore: number;
  priority: Priority;
  summary: string;
  reasoning: string;
  extractedKeywords: string[];
}

export interface DashboardMetrics {
  totalCases: number;
  pendingReview: number;
  routedCases: number;
  resolvedCases: number;
  lowConfidenceCases: number;
  openComplaints: number;
  pendingFeeIssues: number;
  examResultIssues: number;
  placementRequests: number;
  researchSubmissions: number;
  avgResolutionTimeHours: number;
  automationRatePercentage: number;
}
