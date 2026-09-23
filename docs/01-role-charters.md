# Role Charters & Stakeholder Governance Framework
## University AI Operations Platform (UniOps-AI)

---

### Document Overview
This document defines the accountability, responsibilities, operational boundaries, and escalation matrix for university leadership, department heads, and AI system stewards overseeing the **University AI Operations Platform (UniOps-AI)**.

---

## 1. Executive Stakeholder Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Board of Management / VC                        │
│                   Institutional Governance & Strategy                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│  Academic Operations   │  │ Student Affairs & Adm. │  │  Finance & Corporate   │
│ ├─ Controller of Exams │  │ ├─ Chief of Admissions │  │ ├─ Chief Finance Off.  │
│ ├─ Dean of Academics   │  │ ├─ Dean of Students    │  │ ├─ Head of Placements  │
│ └─ Dean of R&D         │  │ └─ Grievance Chair     │  │ └─ Scholarship Officer │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

---

## 2. Detailed Role Charters

### 2.1 Senior AI Business Analyst & AI Operations Lead
- **Reports to:** Chief Technology Officer / Project Director
- **Primary Mission:** Bridge institutional workflows with multi-agent orchestration, ensuring high automation rates, compliance with educational mandates, and continuous SLA adherence.
- **Key Responsibilities:**
  1. Translate departmental manual workflows into structured LangGraph agentic state machines.
  2. Monitor agent confidence thresholds and optimize prompt engineering based on LLM-as-a-judge telemetry.
  3. Conduct weekly operational reviews with department heads to resolve unclassified or escalated requests.
  4. Ensure adherence to data privacy frameworks (DPDP Act 2023, FERPA, GDPR).
- **Target 90-Day Success Criteria:**
  - Overall platform query automation rate $\ge 85\%$.
  - End-to-end first-contact resolution $\ge 90\%$.
  - Departmental staff operational time savings $\ge 40\%$.

---

### 2.2 Chief of Admissions & Enrollment
- **Supervisory Agent:** Admission AI Agent
- **Accountability:** Student acquisition, prospective inquiry response velocity, document verification accuracy, and enrollment conversion.
- **Core Governance Responsibilities:**
  1. Maintain authoritative program catalog metadata (cutoffs, seats, fee tiers, eligibility prerequisites).
  2. Define criteria for OCR document validation pass/fail thresholds.
  3. Supervise manual review queues for international applicants, reservation quota edge cases, and fee concessions.
- **Escalation Triggers:**
  - Suspected forged or unverified academic transcripts.
  - Eligibility borderline appeals (within $\pm 1\%$ cutoff).
  - Unresponsive applicant inquiries $> 48$ hours.

---

### 2.3 Controller of Examinations (COE)
- **Supervisory Agent:** Exam Schedule Agent & Results Agent
- **Accountability:** Examination integrity, clash-free timetable synthesis, secure grade dissemination, and revaluation tracking.
- **Core Governance Responsibilities:**
  1. Authorize official timetable releases and hall ticket generation parameters (e.g., minimum 75% attendance rule).
  2. Validate grade upload pipelines from department grading committees to read-only replica databases.
  3. Supervise student re-evaluation, grade dispute, and supplementary examination workflows.
- **Escalation Triggers:**
  - Disputed grade corrections requiring academic committee intervention.
  - Examination hall conflicts or simultaneous student paper clashes.
  - Attendance shortage exemptions submitted with medical certification.

---

### 2.4 Chief Finance Officer (CFO) & Accounts Head
- **Supervisory Agent:** Fees & Finance Agent
- **Accountability:** Fee collection efficiency, accurate ledger generation, payment gateway reconciliation, and financial hardship installment plans.
- **Core Governance Responsibilities:**
  1. Authorize fee structure matrix per department, hostel category, and lab fee.
  2. Review and cryptographically approve/reject installment and fee extension requests.
  3. Supervise automated payment gateway reconciliation and refund processing.
- **Escalation Triggers:**
  - Multi-tranche fee installment requests $> 2$ tranches.
  - Unreconciled payment gateway webhooks $> 24$ hours.
  - Fee waiver and special scholarship appeals.

---

### 2.5 Training & Placement Officer (TPO)
- **Supervisory Agent:** Placement AI Agent
- **Accountability:** Corporate partner relationships, job-to-student matching efficiency, interview logistics, and institutional placement statistics.
- **Core Governance Responsibilities:**
  1. Validate incoming Corporate Job Descriptions (JDs), compensation structures, and eligibility criteria.
  2. Review automated AI candidate shortlist rankings before sending resumes to recruiters.
  3. Track student offer letters, dual-offer compliance, and salary benchmarking reports.
- **Escalation Triggers:**
  - Recruiter complaints or interview slot rescheduling requests.
  - Student candidate no-show or disciplinary infractions during recruitment drives.
  - Disputed candidate eligibility overrides (e.g., backlog exemptions).

---

### 2.6 Dean of Student Welfare & Grievance Redressal Chair
- **Supervisory Agent:** Grievance & Student Welfare Agent
- **Accountability:** Student safety, campus life quality, anti-ragging compliance, and transparent dispute resolution.
- **Core Governance Responsibilities:**
  1. Supervise incoming grievance classifications (Academic, Facility, Harassment, Discrimination).
  2. Enforce strict SLA adherence across assigned staff officers.
  3. Oversee immediate bypass triggers for psychological distress and emergency safety alerts.
- **Escalation Triggers:**
  - P1 Critical alerts (Harassment, Ragging, Mental Health distress).
  - Unresolved departmental grievances exceeding 5 working days.

---

### 2.7 Dean of Research & Development (R&D)
- **Supervisory Agent:** Research & Publication Agent
- **Accountability:** Faculty/student research output, Scopus/Web of Science indexing integrity, and grant disbursements.
- **Core Governance Responsibilities:**
  1. Review verified publication claims and citation index tracking.
  2. Supervise seed grant allocations and patent filing submissions.
- **Escalation Triggers:**
  - Flagged predatory journal submissions.
  - Plagiarism index $> 10\%$ on institutional submissions.

---

## 3. Human-in-the-Loop (HITL) Delegation & Escalation Protocol

```
┌─────────────────────────────────┬───────────────────┬───────────────────┬──────────────┐
│ Action Category                 │ AI Agent Role     │ Human Reviewer    │ SLA Target   │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ Routine Program / Policy Query  │ Autonomous (100%) │ None (Audit Only) │ < 2 Seconds  │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ Bonafide Certificate Generation │ Autonomous Verify │ Auto-Generated    │ < 1 Minute   │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ High School Marksheet Verify    │ OCR Extraction    │ Admission Officer │ < 24 Hours   │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ Fee Installment Application     │ Prepare Schedule  │ CFO / Accounts    │ < 48 Hours   │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ Exam Grade Re-evaluation        │ Create Ticket/Fee │ Exam Cell Chair   │ < 5 Days     │
├─────────────────────────────────┼───────────────────┼───────────────────┼──────────────┤
│ P1 Harassment / Ragging Alert   │ Immediate Flag    │ Proctor / Dean    │ < 15 Minutes │
└─────────────────────────────────┴───────────────────┴───────────────────┴──────────────┘
```
