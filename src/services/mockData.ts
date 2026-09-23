import { CaseItem } from '../types';

export const INITIAL_CASES: CaseItem[] = [
  {
    id: 'case-001',
    ticketId: 'UNI-2026-1049',
    requesterName: 'Aditya Sharma',
    requesterEmail: 'aditya.sharma@student.uni.edu',
    requesterPhone: '+91 98765 43210',
    role: 'Student',
    studentId: '2023-CS-042',
    departmentOrigin: 'Computer Science & Eng',
    title: 'Installment payment request for Semester 4 tuition fee dues',
    description: 'My father underwent unexpected surgery last week. Can I please get permission to pay my Semester 4 tuition fee of ₹65,000 in 3 monthly installments? Due date is approaching on Oct 15.',
    channel: 'Web Portal',
    category: 'Fees',
    suggestedDepartment: 'Finance Department',
    assignedDepartment: 'Finance Department',
    confidenceScore: 0.98,
    priority: 'High',
    status: 'Pending Review',
    aiSummary: 'Fees request regarding Semester 4 tuition fee installment plan due to medical emergency.',
    aiReasoning: 'Detected domain keywords [fee, payment, dues, tuition, installment] correlating with Finance Department. Priority set to High based on upcoming due date and financial hardship appeal.',
    extractedKeywords: ['fee', 'payment', 'dues', 'tuition', 'installment'],
    isOverridden: false,
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-09-23 09:15',
        actor: 'Aditya Sharma',
        role: 'Student',
        action: 'Case Submitted',
        notes: 'Submitted via Web Portal with hospital medical bill attachment.'
      },
      {
        id: 'tl-2',
        timestamp: '2026-09-23 09:16',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified & Scored',
        notes: 'Classified as Fees (98% confidence) -> Finance Department. Enqueued in Accounts Staff Review inbox.'
      }
    ],
    createdAt: '2026-09-23 09:15',
    updatedAt: '2026-09-23 09:16'
  },
  {
    id: 'case-002',
    ticketId: 'UNI-2026-1050',
    requesterName: 'Pooja Narang',
    requesterEmail: 'pooja.n@gmail.com',
    requesterPhone: '+91 91234 56789',
    role: 'Student',
    departmentOrigin: 'Prospective Applicant',
    title: 'Eligibility criteria and 12th marks cutoff for B.Sc Data Science admission',
    description: 'I scored 78% in 12th CBSE with Mathematics and Computer Science. Am I eligible for direct merit admission to B.Sc Data Science? Also what is the deadline to submit the online form?',
    channel: 'Web Portal',
    category: 'Admissions',
    suggestedDepartment: 'Admission Office',
    assignedDepartment: 'Admission Office',
    confidenceScore: 0.97,
    priority: 'Medium',
    status: 'Routed',
    aiSummary: 'Admissions query regarding 12th eligibility cutoff and registration deadline for B.Sc Data Science.',
    aiReasoning: 'Detected keywords [admission, eligibility, cutoff, 12th marks] mapping to Admission Office.',
    extractedKeywords: ['admission', 'eligibility', 'cutoff', '12th marks'],
    isOverridden: false,
    assignedOfficer: 'Dr. Meenakshi Sundaram (Admission Cell)',
    timeline: [
      {
        id: 'tl-3',
        timestamp: '2026-09-23 08:30',
        actor: 'Pooja Narang',
        role: 'Student',
        action: 'Case Submitted',
        notes: 'Submitted via Public Admissions Portal.'
      },
      {
        id: 'tl-4',
        timestamp: '2026-09-23 08:31',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified',
        notes: 'Category: Admissions (97% confidence).'
      },
      {
        id: 'tl-5',
        timestamp: '2026-09-23 08:45',
        actor: 'Rahul Varma',
        role: 'Admission Officer',
        action: 'Staff Approved & Routed',
        notes: 'Classification verified. Assigned to Data Science admissions desk.'
      }
    ],
    createdAt: '2026-09-23 08:30',
    updatedAt: '2026-09-23 08:45'
  },
  {
    id: 'case-003',
    ticketId: 'UNI-2026-1051',
    requesterName: 'Karthik Raja',
    requesterEmail: 'karthik.raja@student.uni.edu',
    role: 'Student',
    studentId: '2022-EC-089',
    departmentOrigin: 'Electronics & Comm',
    title: 'Severe timetable clash: Supplementary Signal Processing exam overlaps with Core VLSI exam',
    description: 'My Semester 3 backlog exam for Signals & Systems is scheduled on Oct 18, 10:00 AM - 1:00 PM. My core Semester 5 VLSI Design exam is also scheduled on the same date and same time slot. Please resolve this clash urgently.',
    channel: 'Mobile App',
    category: 'Exams',
    suggestedDepartment: 'Controller of Examinations',
    assignedDepartment: 'Controller of Examinations',
    confidenceScore: 0.99,
    priority: 'Critical',
    status: 'In Progress',
    aiSummary: 'Exams collision: Supplementary Signal Processing paper overlaps with VLSI Design paper on Oct 18.',
    aiReasoning: 'Critical timetable clash detected on matching date/slot. High urgency assigned due to upcoming exam date.',
    extractedKeywords: ['exam', 'timetable', 'clash', 'conflict', 'supplementary', 'schedule'],
    isOverridden: false,
    assignedOfficer: 'Prof. K. Venkatesh (COE Office)',
    timeline: [
      {
        id: 'tl-6',
        timestamp: '2026-09-22 17:10',
        actor: 'Karthik Raja',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-7',
        timestamp: '2026-09-22 17:11',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified & High-Priority Alerted',
        notes: 'Triggered immediate clash notification to Controller of Examinations.'
      },
      {
        id: 'tl-8',
        timestamp: '2026-09-22 17:30',
        actor: 'Prof. K. Venkatesh',
        role: 'Exam Controller',
        action: 'Investigation Started',
        notes: 'Valid clash identified across 14 students. Rescheduling supplementary slot to Oct 22 Afternoon session.'
      }
    ],
    createdAt: '2026-09-22 17:10',
    updatedAt: '2026-09-22 17:30'
  },
  {
    id: 'case-004',
    ticketId: 'UNI-2026-1052',
    requesterName: 'Sneha Patel',
    requesterEmail: 'sneha.patel@student.uni.edu',
    role: 'Student',
    studentId: '2023-BT-014',
    departmentOrigin: 'Biotechnology',
    title: 'Discrepancy in marksheet: Marked Absent in Biochemistry Lab despite full attendance',
    description: 'My Semester 3 results show "AB" (Absent) for Biochemistry Lab (BT302L). I attended all lab sessions and submitted my record signed by Dr. Ananya. My internal score was 48/50. Please correct this result error.',
    channel: 'Web Portal',
    category: 'Results',
    suggestedDepartment: 'Examination Cell',
    assignedDepartment: 'Examination Cell',
    confidenceScore: 0.96,
    priority: 'High',
    status: 'In Progress',
    aiSummary: 'Results error: Student erroneously marked absent in Biochemistry Lab (BT302L).',
    aiReasoning: 'Detected marksheet discrepancy keywords [result, marksheet, grade, absent, discrepancy in marks]. Priority High.',
    extractedKeywords: ['result', 'marksheet', 'grade', 'marks', 'discrepancy in marks'],
    isOverridden: false,
    assignedOfficer: 'Exam Cell Assistant Registrar',
    timeline: [
      {
        id: 'tl-9',
        timestamp: '2026-09-22 14:00',
        actor: 'Sneha Patel',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-10',
        timestamp: '2026-09-22 14:02',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified'
      },
      {
        id: 'tl-11',
        timestamp: '2026-09-22 15:10',
        actor: 'Exam Cell Staff',
        role: 'Exam Controller',
        action: 'Verified Attendance Ledger',
        notes: 'Contacted Lab In-Charge Dr. Ananya for internal marks folios.'
      }
    ],
    createdAt: '2026-09-22 14:00',
    updatedAt: '2026-09-22 15:10'
  },
  {
    id: 'case-005',
    ticketId: 'UNI-2026-1053',
    requesterName: 'Vikram Choudhury',
    requesterEmail: 'vikram.c@student.uni.edu',
    role: 'Student',
    studentId: '2023-ME-055',
    departmentOrigin: 'Mechanical Eng',
    title: 'Hostel Block-C 3rd Floor water supply completely disrupted for 48 hours',
    description: 'Water supply in Hostel Block C 3rd floor washrooms has been non-functional for two days. Multiple verbal complaints to the block warden went unaddressed. Hygiene conditions are rapidly deteriorating.',
    channel: 'Mobile App',
    category: 'Complaints',
    suggestedDepartment: 'Student Welfare / Grievance Cell',
    assignedDepartment: 'Student Welfare / Grievance Cell',
    confidenceScore: 0.98,
    priority: 'High',
    status: 'Pending Review',
    aiSummary: 'Hostel facility grievance regarding 48h water supply disruption in Block C.',
    aiReasoning: 'Detected grievance keywords [complaint, hostel, facility, warden, water issue]. Assigned High priority for sanitation hazard.',
    extractedKeywords: ['complaint', 'hostel', 'facility', 'warden', 'water issue'],
    isOverridden: false,
    timeline: [
      {
        id: 'tl-12',
        timestamp: '2026-09-23 07:45',
        actor: 'Vikram Choudhury',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-13',
        timestamp: '2026-09-23 07:46',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified as Grievance (98% confidence)'
      }
    ],
    createdAt: '2026-09-23 07:45',
    updatedAt: '2026-09-23 07:46'
  },
  {
    id: 'case-006',
    ticketId: 'UNI-2026-1054',
    requesterName: 'Rohan Gupta',
    requesterEmail: 'rohan.gupta@student.uni.edu',
    role: 'Student',
    studentId: '2021-CS-110',
    departmentOrigin: 'Computer Science',
    title: 'Resume shortlist and interview link issue for Microsoft campus placement drive',
    description: 'I was shortlisted for the Technical Round for Microsoft SDE drive scheduled today at 3:00 PM, but the Teams meeting link is showing expired. Kindly provide the updated panel link.',
    channel: 'Web Portal',
    category: 'Placements',
    suggestedDepartment: 'Training & Placement Cell',
    assignedDepartment: 'Training & Placement Cell',
    confidenceScore: 0.99,
    priority: 'Critical',
    status: 'Resolved',
    aiSummary: 'Placement interview emergency: Microsoft candidate interview meeting link expired.',
    aiReasoning: 'Urgent interview keyword detected with today deadline. Immediate TPO alert generated.',
    extractedKeywords: ['placement', 'company', 'interview', 'resume', 'drive', 'tpo'],
    isOverridden: false,
    assignedOfficer: 'TPO Officer Sandeep',
    resolutionNotes: 'Updated Microsoft Teams panel link dispatched via WhatsApp & SMS. Student successfully attended interview.',
    resolvedAt: '2026-09-23 11:30',
    resolvedBy: 'Sandeep (TPO)',
    timeline: [
      {
        id: 'tl-14',
        timestamp: '2026-09-23 10:15',
        actor: 'Rohan Gupta',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-15',
        timestamp: '2026-09-23 10:20',
        actor: 'Sandeep',
        role: 'Placement Officer',
        action: 'Staff Overrode & Sent Link'
      },
      {
        id: 'tl-16',
        timestamp: '2026-09-23 11:30',
        actor: 'Sandeep',
        role: 'Placement Officer',
        action: 'Case Resolved',
        notes: 'Confirmed interview completion with Microsoft campus hiring team.'
      }
    ],
    createdAt: '2026-09-23 10:15',
    updatedAt: '2026-09-23 11:30'
  },
  {
    id: 'case-007',
    ticketId: 'UNI-2026-1055',
    requesterName: 'Dr. Ramesh Balan',
    requesterEmail: 'ramesh.balan@faculty.uni.edu',
    role: 'Faculty',
    departmentOrigin: 'Dept of Physics',
    title: 'Incentive claim and Scopus indexing verification for IEEE Transactions publication',
    description: 'I have published a research paper titled "Quantum Dot Cellular Automata in Nano-scale Computing" in IEEE Transactions on Nanotechnology (DOI: 10.1109/TNANO.2026.98412). Requesting R&D cell verification for faculty research reward.',
    channel: 'Web Portal',
    category: 'Research Publications',
    suggestedDepartment: 'Research & Development Cell',
    assignedDepartment: 'Research & Development Cell',
    confidenceScore: 0.97,
    priority: 'Medium',
    status: 'Routed',
    aiSummary: 'Research publication incentive and Scopus DOI verification for IEEE Transactions paper.',
    aiReasoning: 'Detected research keywords [paper, publication, journal, doi, scopus, citation]. Correlated to R&D Cell.',
    extractedKeywords: ['paper', 'publication', 'journal', 'doi', 'scopus'],
    isOverridden: false,
    assignedOfficer: 'Dean (R&D)',
    timeline: [
      {
        id: 'tl-17',
        timestamp: '2026-09-21 16:00',
        actor: 'Dr. Ramesh Balan',
        role: 'Faculty',
        action: 'Case Submitted'
      },
      {
        id: 'tl-18',
        timestamp: '2026-09-21 16:05',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified & Scopus Verified'
      }
    ],
    createdAt: '2026-09-21 16:00',
    updatedAt: '2026-09-21 16:05'
  },
  {
    id: 'case-008',
    ticketId: 'UNI-2026-1056',
    requesterName: 'Fatima Zohra',
    requesterEmail: 'fatima.z@student.uni.edu',
    role: 'Student',
    studentId: '2024-EE-031',
    departmentOrigin: 'Electrical Engineering',
    title: 'Post-Matric Government Scholarship renewal status and verification form',
    description: 'My National Scholarship Portal (NSP) application requires the Institute Verification stamp before the Oct 30 deadline. What documents are needed from the Scholarship Cell?',
    channel: 'Web Portal',
    category: 'Scholarships',
    suggestedDepartment: 'Scholarship Cell',
    assignedDepartment: 'Scholarship Cell',
    confidenceScore: 0.95,
    priority: 'Medium',
    status: 'Waiting for Student',
    aiSummary: 'NSP Government Scholarship renewal verification request before Oct 30 portal closing.',
    aiReasoning: 'Detected scholarship keywords [scholarship, nsp, post matric, financial aid].',
    extractedKeywords: ['scholarship', 'nsp', 'financial aid'],
    isOverridden: false,
    assignedOfficer: 'Scholarship Coordinator',
    timeline: [
      {
        id: 'tl-19',
        timestamp: '2026-09-20 11:20',
        actor: 'Fatima Zohra',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-20',
        timestamp: '2026-09-20 14:00',
        actor: 'Scholarship Officer',
        role: 'Scholarship Officer',
        action: 'Requested Documents',
        notes: 'Please upload income certificate and previous semester marksheet.'
      }
    ],
    createdAt: '2026-09-20 11:20',
    updatedAt: '2026-09-20 14:00'
  },
  {
    id: 'case-009',
    ticketId: 'UNI-2026-1057',
    requesterName: 'Suresh Kumar',
    requesterEmail: 'suresh.k@student.uni.edu',
    role: 'Student',
    studentId: '2023-IT-077',
    departmentOrigin: 'Information Technology',
    title: 'Urgent Bonafide Certificate required for Passport Police Verification appointment',
    description: 'I have a passport verification appointment scheduled at the Regional Passport Office this Friday. Need an official signed Bonafide Study Certificate with permanent address endorsement.',
    channel: 'Mobile App',
    category: 'Certificates & Records',
    suggestedDepartment: 'Student Affairs Office',
    assignedDepartment: 'Student Affairs Office',
    confidenceScore: 0.98,
    priority: 'High',
    status: 'Resolved',
    aiSummary: 'Urgent Bonafide Certificate dispatch for passport police verification appointment.',
    aiReasoning: 'Detected certificate keywords [bonafide, passport verification urgent, certificate]. Assigned High priority.',
    extractedKeywords: ['bonafide', 'certificate', 'passport verification urgent'],
    isOverridden: false,
    resolutionNotes: 'Digitally signed Bonafide Certificate (PDF) generated and sent to registered student email.',
    resolvedAt: '2026-09-23 10:45',
    resolvedBy: 'UniOps-AI Auto-Service',
    timeline: [
      {
        id: 'tl-21',
        timestamp: '2026-09-23 10:44',
        actor: 'Suresh Kumar',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-22',
        timestamp: '2026-09-23 10:45',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'Automated Certificate Issued & Resolved',
        notes: 'Verified enrollment standing; generated PDF with QR verification code.'
      }
    ],
    createdAt: '2026-09-23 10:44',
    updatedAt: '2026-09-23 10:45'
  },
  {
    id: 'case-010',
    ticketId: 'UNI-2026-1058',
    requesterName: 'Ananya Deshmukh',
    requesterEmail: 'ananya.d@student.uni.edu',
    role: 'Student',
    studentId: '2024-CS-012',
    departmentOrigin: 'Computer Science',
    title: 'Course prerequisite waiver and elective credit structure for Cloud Architecture',
    description: 'I want to enroll in the 6th semester elective "Advanced Cloud Computing", but it has "Distributed Systems" as a mandatory prerequisite. Can I take both concurrently as co-requisites?',
    channel: 'Web Portal',
    category: 'Degree Programs',
    suggestedDepartment: 'Academic Council / HOD Office',
    assignedDepartment: 'Academic Council / HOD Office',
    confidenceScore: 0.92,
    priority: 'Medium',
    status: 'Pending Review',
    aiSummary: 'Degree program query regarding prerequisite waiver for Cloud Architecture elective.',
    aiReasoning: 'Detected curriculum keywords [syllabus, prerequisite, credits, elective, course]. Correlated to Academic Council.',
    extractedKeywords: ['prerequisite', 'elective', 'credits', 'course'],
    isOverridden: false,
    timeline: [
      {
        id: 'tl-23',
        timestamp: '2026-09-23 12:10',
        actor: 'Ananya Deshmukh',
        role: 'Student',
        action: 'Case Submitted'
      },
      {
        id: 'tl-24',
        timestamp: '2026-09-23 12:11',
        actor: 'UniOps-AI Orchestrator',
        role: 'AI Agent',
        action: 'AI Classified -> Academic Council Review'
      }
    ],
    createdAt: '2026-09-23 12:10',
    updatedAt: '2026-09-23 12:11'
  }
];
