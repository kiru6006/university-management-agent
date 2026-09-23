import { AIClassificationResult, Department, Priority, RequestCategory } from '../types';

interface RuleDefinition {
  category: RequestCategory;
  department: Department;
  keywords: string[];
  priorityIndicators: {
    critical: string[];
    high: string[];
    medium: string[];
  };
  baseConfidence: number;
}

const RULES: RuleDefinition[] = [
  {
    category: 'Fees',
    department: 'Finance Department',
    keywords: ['fee', 'payment', 'receipt', 'dues', 'tuition', 'installment', 'fine', 'refund', 'ledger', 'balance', 'challan', 'transaction', 'bank', 'dd', 'neft'],
    priorityIndicators: {
      critical: ['fine deadline today', 'immediate block', 'unauthorized debit', 'double charge'],
      high: ['deadline', 'overdue', 'blocked from exam', 'installment request', 'medical hardship'],
      medium: ['receipt', 'tax invoice', 'breakdown', 'fee structure']
    },
    baseConfidence: 0.94
  },
  {
    category: 'Exams',
    department: 'Controller of Examinations',
    keywords: ['exam', 'hall ticket', 'admit card', 'timetable', 'schedule', 'center', 'seating', 'clash', 'conflict', 'supplementary', 'backlog exam', 'invigilation', 'room allocation'],
    priorityIndicators: {
      critical: ['exam tomorrow', 'hall ticket missing', 'timetable clash', 'same time exam'],
      high: ['room missing', 'attendance shortage', 'medical leave during exam', 'clash'],
      medium: ['schedule query', 'seat number', 'syllabus scope']
    },
    baseConfidence: 0.96
  },
  {
    category: 'Results',
    department: 'Examination Cell',
    keywords: ['result', 'marksheet', 'grade', 'revaluation', 're-evaluation', 'sgpa', 'cgpa', 'marks', 'transcript', 'failed', 'pass', 'retotalling', 'withheld', 'discrepancy in marks'],
    priorityIndicators: {
      critical: ['wrongly marked absent', 'withheld result', 'job offer revoking due to result'],
      high: ['revaluation deadline', 'grade dispute', 'transcript urgent for visa', 'cgpa wrong'],
      medium: ['grade breakdown', 'marksheet duplicate', 'provisional grade']
    },
    baseConfidence: 0.95
  },
  {
    category: 'Admissions',
    department: 'Admission Office',
    keywords: ['admission', 'eligibility', 'application', 'cutoff', 'prospectus', 'entrance', 'enrollment', '12th marks', 'quota', 'apply', 'seats', 'management quota', 'merit list', 'registration'],
    priorityIndicators: {
      critical: ['admission closing today', 'document rejected without reason', 'payment failed at deadline'],
      high: ['cutoff query', 'eligibility exception', 'seat allotment query', 'interview call'],
      medium: ['brochure request', 'fee inquiry for new course', 'campus tour']
    },
    baseConfidence: 0.93
  },
  {
    category: 'Complaints',
    department: 'Student Welfare / Grievance Cell',
    keywords: ['complaint', 'harassment', 'hostel', 'facility', 'ragging', 'misconduct', 'dispute', 'unfair', 'grievance', 'warden', 'mess', 'hygiene', 'safety', 'threat', 'bullying', 'wifi down', 'water issue'],
    priorityIndicators: {
      critical: ['ragging', 'harassment', 'physical threat', 'emergency', 'posh', 'suicide', 'assault', 'mental health'],
      high: ['warden inaction', 'hostel water power cut', 'faculty harassment', 'unhygienic mess food'],
      medium: ['ac not cooling', 'noisy room', 'broken bench', 'slow internet']
    },
    baseConfidence: 0.97
  },
  {
    category: 'Scholarships',
    department: 'Scholarship Cell',
    keywords: ['scholarship', 'financial aid', 'stipend', 'grant', 'fee concession', 'freeship', 'merit scholarship', 'nsp', 'post matric', 'minority scholarship', 'income certificate', 'fellowship'],
    priorityIndicators: {
      critical: ['scholarship portal closing', 'disbursement canceled'],
      high: ['document verification pending', 'renewal deadline', 'income threshold appeal'],
      medium: ['eligibility query', 'status tracking', 'sanction letter']
    },
    baseConfidence: 0.92
  },
  {
    category: 'Placements',
    department: 'Training & Placement Cell',
    keywords: ['placement', 'company', 'interview', 'offer', 'resume', 'package', 'drive', 'ctc', 'tpo', 'shortlist', 'internship', 'recruiter', 'aptitude', 'technical round', 'hiring'],
    priorityIndicators: {
      critical: ['interview link not working', 'offer acceptance deadline today', 'shortlist missed error'],
      high: ['drive registration issue', 'cgpa filter dispute', 'panel reschedule'],
      medium: ['resume tips', 'past package data', 'upcoming drives']
    },
    baseConfidence: 0.94
  },
  {
    category: 'Research Publications',
    department: 'Research & Development Cell',
    keywords: ['paper', 'publication', 'journal', 'conference', 'doi', 'scopus', 'citation', 'patent', 'research grant', 'manuscript', 'ugc care', 'h-index', 'plagiarism', 'turnitin', 'peer review'],
    priorityIndicators: {
      critical: ['seed grant deadline', 'conference presentation approval'],
      high: ['scopus indexing verification', 'patent filing approval', 'plagiarism clearance'],
      medium: ['publication reward claim', 'journal list query', 'citation tracking']
    },
    baseConfidence: 0.91
  },
  {
    category: 'Degree Programs',
    department: 'Academic Council / HOD Office',
    keywords: ['syllabus', 'credits', 'prerequisite', 'curriculum', 'elective', 'course structure', 'major', 'minor', 'branch change', 'open elective', 'course outline', 'graduation requirements'],
    priorityIndicators: {
      critical: ['credit shortage for degree', 'wrong elective locked'],
      high: ['branch change application', 'prerequisite waiver', 'credit transfer from nptel'],
      medium: ['syllabus download', 'subject recommendation', 'credit audit']
    },
    baseConfidence: 0.89
  },
  {
    category: 'Certificates & Records',
    department: 'Student Affairs Office',
    keywords: ['bonafide', 'transfer certificate', 'migration', 'id card', 'provisional', 'medium of instruction', 'character certificate', 'study certificate', 'custodian', 'lor', 'recommendation letter'],
    priorityIndicators: {
      critical: ['visa appointment tomorrow', 'passport verification urgent'],
      high: ['bank education loan bonafide', 'transfer certificate for job'],
      medium: ['duplicate id card', 'general bonafide', 'address proof certificate']
    },
    baseConfidence: 0.93
  },
  {
    category: 'Faculty Services',
    department: 'HR / Faculty Affairs',
    keywords: ['faculty leave', 'appraisal', 'workload', 'timetable allotment', 'faculty grant', 'teaching load', 'exam duty', 'salary slip', 'faculty accommodation'],
    priorityIndicators: {
      critical: ['medical emergency leave', 'salary discrepancy'],
      high: ['duty clash', 'appraisal submission deadline'],
      medium: ['leave balance', 'conference travel grant']
    },
    baseConfidence: 0.90
  }
];

export function classifyRequest(title: string, description: string): AIClassificationResult {
  const fullText = `${title} ${description}`.toLowerCase();
  
  let bestMatch: RuleDefinition | null = null;
  let highestScore = 0;
  let matchedKeywords: string[] = [];

  for (const rule of RULES) {
    let matchCount = 0;
    const currentMatches: string[] = [];

    for (const keyword of rule.keywords) {
      if (fullText.includes(keyword.toLowerCase())) {
        matchCount++;
        currentMatches.push(keyword);
      }
    }

    if (matchCount > highestScore) {
      highestScore = matchCount;
      bestMatch = rule;
      matchedKeywords = currentMatches;
    }
  }

  // If no strong keyword matches found, fallback to General Student Services
  if (!bestMatch || highestScore === 0) {
    return {
      category: 'General Student Services',
      suggestedDepartment: 'Student Affairs Office',
      confidenceScore: 0.65,
      priority: fullText.includes('urgent') || fullText.includes('emergency') ? 'High' : 'Low',
      summary: title.slice(0, 80),
      reasoning: 'No specific departmental keywords detected. Routed to Student Affairs Office for general assessment and routing.',
      extractedKeywords: ['general_inquiry']
    };
  }

  // Calculate dynamic confidence score
  const confidenceBoost = Math.min(highestScore * 0.02, 0.05);
  const confidence = Math.min(Math.round((bestMatch.baseConfidence + confidenceBoost) * 100) / 100, 0.99);

  // Determine Priority
  let priority: Priority = 'Medium';
  const isCritical = bestMatch.priorityIndicators.critical.some(indicator => fullText.includes(indicator));
  const isHigh = bestMatch.priorityIndicators.high.some(indicator => fullText.includes(indicator));
  const isLow = fullText.includes('general info') || fullText.includes('just asking') || fullText.includes('brochure');

  if (isCritical) {
    priority = 'Critical';
  } else if (isHigh) {
    priority = 'High';
  } else if (isLow) {
    priority = 'Low';
  }

  // Construct meaningful AI summary and reasoning
  const summary = `${bestMatch.category} request regarding ${title.trim()}`;
  const reasoning = `Detected ${highestScore} domain keywords [${matchedKeywords.slice(0, 4).join(', ')}] strongly correlating with ${bestMatch.department} operational scope. Urgency indicator evaluated as ${priority}.`;

  return {
    category: bestMatch.category,
    suggestedDepartment: bestMatch.department,
    confidenceScore: confidence,
    priority,
    summary,
    reasoning,
    extractedKeywords: matchedKeywords
  };
}
