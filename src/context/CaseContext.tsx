import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CaseItem, CaseStatus, DashboardMetrics, Department, Priority, RequestCategory, UserRole } from '../types';
import { storageService } from '../services/storageService';
import { classifyRequest } from '../services/aiClassifier';

interface CaseContextType {
  cases: CaseItem[];
  currentRole: UserRole;
  currentUserName: string;
  setCurrentRole: (role: UserRole) => void;
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string | null) => void;
  metrics: DashboardMetrics;
  createCase: (data: {
    title: string;
    description: string;
    requesterName: string;
    requesterEmail: string;
    requesterPhone?: string;
    studentId?: string;
    departmentOrigin?: string;
    channel?: CaseItem['channel'];
  }) => CaseItem;
  approveClassification: (caseId: string, assignedOfficer?: string) => void;
  overrideClassification: (
    caseId: string,
    overrides: {
      category: RequestCategory;
      department: Department;
      priority: Priority;
      notes: string;
    }
  ) => void;
  updateCaseStatus: (caseId: string, status: CaseStatus, notes?: string) => void;
  resolveCase: (caseId: string, resolutionNotes: string) => void;
  addTimelineNote: (caseId: string, note: string) => void;
  resetToDefaultData: () => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseItem[]>(() => storageService.loadCases());
  const [currentRole, setCurrentRole] = useState<UserRole>('System Admin');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    storageService.saveCases(cases);
  }, [cases]);

  const currentUserName = useMemo(() => {
    switch (currentRole) {
      case 'Student':
        return 'Aditya Sharma (Student)';
      case 'Admission Officer':
        return 'Dr. Meenakshi (Admissions)';
      case 'Finance Officer':
        return 'Mr. R. Sundaram (CFO Office)';
      case 'Exam Controller':
        return 'Prof. K. Venkatesh (COE)';
      case 'Placement Officer':
        return 'Sandeep Varma (TPO)';
      case 'HOD / Dean':
        return 'Dr. S. K. Roy (Dean of Academics)';
      case 'Vice Chancellor / University Management':
        return 'Prof. M. Ramachandran (Vice Chancellor)';
      default:
        return `${currentRole} (Admin)`;
    }
  }, [currentRole]);

  const metrics: DashboardMetrics = useMemo(() => {
    const total = cases.length;
    const pendingReview = cases.filter(c => c.status === 'Pending Review' || c.status === 'AI Classified').length;
    const routed = cases.filter(c => c.status === 'Routed' || c.status === 'In Progress').length;
    const resolved = cases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    const lowConfidence = cases.filter(c => c.confidenceScore < 0.80).length;
    const openComplaints = cases.filter(c => c.category === 'Complaints' && c.status !== 'Resolved' && c.status !== 'Closed').length;
    const pendingFeeIssues = cases.filter(c => c.category === 'Fees' && c.status !== 'Resolved' && c.status !== 'Closed').length;
    const examResultIssues = cases.filter(c => (c.category === 'Exams' || c.category === 'Results') && c.status !== 'Resolved' && c.status !== 'Closed').length;
    const placementRequests = cases.filter(c => c.category === 'Placements' && c.status !== 'Resolved' && c.status !== 'Closed').length;
    const researchSubmissions = cases.filter(c => c.category === 'Research Publications' && c.status !== 'Resolved' && c.status !== 'Closed').length;

    return {
      totalCases: total,
      pendingReview,
      routedCases: routed,
      resolvedCases: resolved,
      lowConfidenceCases: lowConfidence,
      openComplaints,
      pendingFeeIssues,
      examResultIssues,
      placementRequests,
      researchSubmissions,
      avgResolutionTimeHours: 4.2,
      automationRatePercentage: 88.5
    };
  }, [cases]);

  const createCase = (data: {
    title: string;
    description: string;
    requesterName: string;
    requesterEmail: string;
    requesterPhone?: string;
    studentId?: string;
    departmentOrigin?: string;
    channel?: CaseItem['channel'];
  }): CaseItem => {
    const aiResult = classifyRequest(data.title, data.description);
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `UNI-2026-${randomSuffix}`;

    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      ticketId,
      requesterName: data.requesterName,
      requesterEmail: data.requesterEmail,
      requesterPhone: data.requesterPhone,
      role: currentRole === 'Faculty' ? 'Faculty' : 'Student',
      studentId: data.studentId || '2025-GEN-001',
      departmentOrigin: data.departmentOrigin || 'General Campus',
      title: data.title,
      description: data.description,
      channel: data.channel || 'Web Portal',
      category: aiResult.category,
      suggestedDepartment: aiResult.suggestedDepartment,
      assignedDepartment: aiResult.suggestedDepartment,
      confidenceScore: aiResult.confidenceScore,
      priority: aiResult.priority,
      status: 'Pending Review',
      aiSummary: aiResult.summary,
      aiReasoning: aiResult.reasoning,
      extractedKeywords: aiResult.extractedKeywords,
      isOverridden: false,
      timeline: [
        {
          id: `tl-${Date.now()}-1`,
          timestamp: now,
          actor: data.requesterName,
          role: currentRole,
          action: 'Request Submitted',
          notes: 'Submitted via Web Submission Form.'
        },
        {
          id: `tl-${Date.now()}-2`,
          timestamp: now,
          actor: 'UniOps-AI Orchestrator',
          role: 'AI Agent',
          action: 'AI Classified & Scored',
          notes: `Assigned category [${aiResult.category}] -> [${aiResult.suggestedDepartment}] with ${(aiResult.confidenceScore * 100).toFixed(0)}% confidence.`
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    setCases(prev => [newCase, ...prev]);
    return newCase;
  };

  const approveClassification = (caseId: string, assignedOfficer?: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const newTimeline = [
          ...c.timeline,
          {
            id: `tl-${Date.now()}`,
            timestamp: now,
            actor: currentUserName,
            role: currentRole,
            action: 'Classification Approved & Routed',
            notes: `Approved AI assignment to [${c.assignedDepartment}]. Assigned Officer: ${assignedOfficer || currentUserName}`
          }
        ];
        return {
          ...c,
          status: 'Routed',
          assignedOfficer: assignedOfficer || currentUserName,
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const overrideClassification = (
    caseId: string,
    overrides: {
      category: RequestCategory;
      department: Department;
      priority: Priority;
      notes: string;
    }
  ) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const newTimeline = [
          ...c.timeline,
          {
            id: `tl-${Date.now()}`,
            timestamp: now,
            actor: currentUserName,
            role: currentRole,
            action: 'Human Staff Override',
            notes: `Overrode to Category: [${overrides.category}], Department: [${overrides.department}], Priority: [${overrides.priority}]. Justification: ${overrides.notes}`
          }
        ];
        return {
          ...c,
          category: overrides.category,
          assignedDepartment: overrides.department,
          priority: overrides.priority,
          isOverridden: true,
          overrideNotes: overrides.notes,
          overriddenBy: currentUserName,
          status: 'Routed',
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const updateCaseStatus = (caseId: string, status: CaseStatus, notes?: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const newTimeline = [
          ...c.timeline,
          {
            id: `tl-${Date.now()}`,
            timestamp: now,
            actor: currentUserName,
            role: currentRole,
            action: `Status changed to ${status}`,
            notes: notes || `Status updated to ${status}`
          }
        ];
        return {
          ...c,
          status,
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const resolveCase = (caseId: string, resolutionNotes: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const newTimeline = [
          ...c.timeline,
          {
            id: `tl-${Date.now()}`,
            timestamp: now,
            actor: currentUserName,
            role: currentRole,
            action: 'Case Resolved',
            notes: resolutionNotes
          }
        ];
        return {
          ...c,
          status: 'Resolved',
          resolutionNotes,
          resolvedAt: now,
          resolvedBy: currentUserName,
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const addTimelineNote = (caseId: string, note: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setCases(prev =>
      prev.map(c => {
        if (c.id !== caseId) return c;
        const newTimeline = [
          ...c.timeline,
          {
            id: `tl-${Date.now()}`,
            timestamp: now,
            actor: currentUserName,
            role: currentRole,
            action: 'Staff Note Added',
            notes: note
          }
        ];
        return {
          ...c,
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const resetToDefaultData = () => {
    const initial = storageService.resetToDefault();
    setCases(initial);
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        currentRole,
        currentUserName,
        setCurrentRole,
        selectedCaseId,
        setSelectedCaseId,
        metrics,
        createCase,
        approveClassification,
        overrideClassification,
        updateCaseStatus,
        resolveCase,
        addTimelineNote,
        resetToDefaultData
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
};
