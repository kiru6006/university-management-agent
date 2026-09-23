# Multi-Agent Technical Specifications Catalog
## University AI Operations Platform (UniOps-AI)

---

### Document Overview
This document specifies the exact technical architecture, capabilities, input/output contracts, tools, knowledge dependencies, and guardrails for all 11 specialized domain agents and the central Master Semantic Orchestrator.

---

## 1. Master Semantic Orchestrator (Intent Router & Safety Ingress)

- **Role:** Central gateway, intent classifier, multi-turn state manager, PII anonymizer, and response aggregator.
- **Input Channels:** Web Portal Chat, Mobile WebSocket, Transactional REST endpoints.
- **Core Capabilities:**
  - Zero-shot classification into 11 departmental domains.
  - Multi-intent decomposition (e.g., "What is my tuition fee due date and when is the exam schedule?").
  - Emergency & crisis detection (immediate bypass to Student Counseling / Security).
- **Tools & Dependencies:**
  - `presidio_anonymizer`: Redacts Aadhaar, SSN, PAN, phone numbers, and payment details.
  - `redis_session_manager`: Retrieves conversation history, context parameters, and active authentication claims.
- **Latency SLA:** Intent classification & dispatch `< 350ms`.

---

## 2. Domain Agent Catalog

### 2.1 Agent 1: Admission & Enrollment Agent
- **Department:** Admissions Office / Registrar
- **Capabilities:**
  1. *Program Eligibility Matching:* Evaluates candidate marks, branch cutoff trends, and entrance scores.
  2. *Interactive Q&A:* Program duration, curriculum highlights, seat availability, fees, hostel rules.
  3. *Document Pre-Verification (OCR):* Extracts marks from uploaded PDFs/JPGs and computes aggregate eligibility.
  4. *Application Tracking:* Status updates on submitted forms and pending verification items.
- **Tools:**
  - `query_program_catalog(branch_id, quota)`
  - `evaluate_marks_ocr(document_url, required_subjects)`
  - `get_application_status(application_id)`
- **Escalation Triggers:** Document forgery score $> 0.70$; eligibility borderline requests; non-standard international qualifications.

---

### 2.2 Agent 2: Student Lifecycle & Records Agent
- **Department:** Student Affairs / Registrar
- **Capabilities:**
  1. *Automated Certificate Generation:* Digital PDF dispatch of Bonafide, Medium of Instruction, and Enrollment proof with QR codes.
  2. *Profile Management:* Address updates, emergency contact updates, student ID card re-issuance.
  3. *Attendance Audit:* Summary of semester subject-wise attendance and shortage warnings.
- **Tools:**
  - `generate_bonafide_pdf(student_id, purpose)`
  - `get_attendance_summary(student_id, semester)`
  - `submit_profile_correction(student_id, updated_fields)`
- **Escalation Triggers:** Name change, Date of Birth correction, legal transfer certificate requests.

---

### 2.3 Agent 3: Fees & Finance Agent
- **Department:** Finance & Accounts Office
- **Capabilities:**
  1. *Fee Ledger Query:* Itemized breakdown of tuition, lab, hostel, examination, and transport fees.
  2. *Payment Intent Generation:* Instant Razorpay/Stripe checkout links with dynamic transaction IDs.
  3. *Installment Request Workflow:* Submission of financial hardship documentation for CFO review.
  4. *Digital Receipt Issuance:* Instant download of verified payment receipts and Form 16 / tax proofs.
- **Tools:**
  - `get_fee_ledger(student_id)`
  - `create_payment_link(student_id, amount, category)`
  - `submit_installment_application(student_id, tranches, reason, doc_url)`
- **Guardrail:** Agent is strictly read-only on core ledgers. Zero autonomous waivers.

---

### 2.4 Agent 4: Examination & Seating Agent
- **Department:** Controller of Examinations (COE)
- **Capabilities:**
  1. *Personalized Timetable:* Date, time, venue, and subject code retrieval.
  2. *Hall Ticket Eligibility:* Validation of fee clearance and attendance threshold ($\ge 75\%$).
  3. *Clash & Conflict Detection:* Flags overlapping supplementary or backlog exam papers.
  4. *Seating & Room Allocation:* Room number, bench allocation, and invigilator guidelines.
- **Tools:**
  - `get_exam_timetable(student_id, semester)`
  - `verify_hallticket_eligibility(student_id)`
  - `get_seat_allocation(student_id, exam_id)`

---

### 2.5 Agent 5: Results & Academic Performance Agent
- **Department:** Examination Cell
- **Capabilities:**
  1. *Grade & CGPA Dissemination:* Semester marksheet, internal assessment breakdown, SGPA/CGPA trends.
  2. *Revaluation Workflow:* Formal re-evaluation application submission and fee processing.
  3. *Academic Standing Evaluation:* Flags probation risks or credit deficits.
- **Tools:**
  - `get_student_results(student_id, semester)`
  - `calculate_cgpa_projection(student_id, target_grade)`
  - `initiate_revaluation(student_id, course_code, fee_tx_id)`

---

### 2.6 Agent 6: Grievance & Student Welfare Agent
- **Department:** Student Welfare & Grievance Cell
- **Capabilities:**
  1. *Complaint Categorization:* Multi-label classification (Academic, Hostel, Fees, Harassment).
  2. *Urgency & Priority Scoring:* P1 (Emergency), P2 (High), P3 (Medium), P4 (Routine).
  3. *Automated Escalation & Ticketing:* Ticket dispatch with cryptographic tracking and SLA monitoring.
- **Tools:**
  - `create_grievance_ticket(student_id, category, priority, description, attachments)`
  - `get_ticket_status(ticket_number)`
  - `trigger_emergency_alert(student_id, location, emergency_type)`

---

### 2.7 Agent 7: Scholarship & Financial Aid Agent
- **Department:** Scholarship Cell / Student Welfare
- **Capabilities:**
  1. *Scheme Discovery:* Matches student profile (category, GPA, family income) against 50+ scholarships.
  2. *Application & Renewal Tracker:* Milestone tracking and renewal reminders.
- **Tools:**
  - `match_eligible_scholarships(student_id)`
  - `get_scholarship_checklist(scheme_id)`

---

### 2.8 Agent 8: Degree Program & Curriculum Agent
- **Department:** Academic Council / Dean of Academics
- **Capabilities:**
  1. *Semantic Syllabus Search:* Natural language course curriculum queries and learning outcome mapping.
  2. *Credit Audit Engine:* Verifies fulfillment of core, elective, and audit credit requirements.
  3. *Prerequisite Tree Traversal:* Visualizes course dependency requirements.
- **Tools:**
  - `search_curriculum_rag(query, department_id)`
  - `audit_student_credits(student_id)`

---

### 2.9 Agent 9: Training & Placement (TPO) Agent
- **Department:** Training & Placement Cell
- **Capabilities:**
  1. *Corporate Drive Discovery:* Eligible company announcements based on branch, CGPA, and skill filters.
  2. *Resume Parsing & Match Scoring:* Extracts skills from student resumes and computes JD alignment scores (0–100%).
  3. *Interview Scheduling:* Calendar slot assignment and candidate notifications.
  4. *Offer & Package Benchmarking:* Tracks offers and calculates department compensation analytics.
- **Tools:**
  - `get_eligible_drives(student_id)`
  - `score_resume_against_jd(resume_url, job_id)`
  - `register_job_application(student_id, job_id)`

---

### 2.10 Agent 10: Research & Publication (R&D) Agent
- **Department:** Dean of Research & Development
- **Capabilities:**
  1. *DOI & Indexing Verification:* Queries Crossref/Scopus APIs to verify journal indexation.
  2. *Faculty & Student Research Metrics:* Computes publication counts, h-index, and citations.
  3. *Grant & Patent Registry:* Tracks internal seed grants and patent application milestones.
- **Tools:**
  - `verify_doi_indexing(doi_string)`
  - `get_author_metrics(faculty_id)`

---

### 2.11 Agent 11: Management Intelligence & Analytics Agent
- **Department:** Vice Chancellor / Registrar / Provost
- **Capabilities:**
  1. *Natural Language Business Intelligence:* Converts executive questions into aggregated SQL/Analytics queries.
  2. *At-Risk Student Early Warning System:* Predictive risk modeling combining attendance, marks, and engagement.
  3. *Accreditation Data Synthesis:* Automated compilation of NAAC / NIRF reporting metrics.
- **Tools:**
  - `execute_analytics_query(kpi_type, filters)`
  - `get_dropout_risk_cohort(department, threshold)`
