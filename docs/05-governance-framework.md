# Enterprise AI Governance, Security & Compliance Framework
## University AI Operations Platform (UniOps-AI)

---

### Document Overview
This document establishes the mandatory governance policies, statutory data privacy compliance standards (DPDP Act 2023 / FERPA / GDPR), access control matrices, red-teaming guidelines, and cryptographic audit specifications for the UniOps-AI platform.

---

## 1. Regulatory & Statutory Compliance

### 1.1 Digital Personal Data Protection (DPDP) Act 2023 Compliance
1. **Consent Management:** Explicit student consent is captured during account creation, delineating data utilization for academic workflow automation.
2. **Data Minimization:** Agents only access fields strictly required for executing a specific tool (e.g., Placement Agent cannot query fee balances or health records).
3. **Right to Correction & Erasure:** The platform exposes administrative endpoints allowing students to request data correction or complete profile anonymization upon graduation.
4. **Data Fiduciary Safeguards:** All PII data stored in PostgreSQL is encrypted at rest using **AES-256-GCM** with KMS-managed encryption keys.

---

## 2. PII Sanitization & Data Protection Architecture

```
┌─────────────────────────┐
│ Incoming User Query     │ (e.g. "My Aadhaar is 1234-5678-9012 and phone is 9876543210...")
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ Presidio PII Analyzer   │ (Entity Recognition for ID cards, phone, email, credit cards)
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ Presidio Anonymizer     │ (Transforms to <AADHAAR_ID>, <PHONE_NUMBER>, <STUDENT_ID>)
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ LLM Inference Pipeline  │ (Processed cleanly with Zero Data Retention guarantee)
└─────────────────────────┘
```

---

## 3. Role-Based & Attribute-Based Access Control (RBAC/ABAC) Matrix

| Domain / Resource | Student / Applicant | Faculty Member | Staff Reviewer | Department Head (HOD/Dean)| Super Admin / VC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Admission Applications** | Read/Write (Self) | No Access | Read/Verify | Read/Approve | Full Audit |
| **Academic Grades & Transcripts** | Read (Self) | Read/Write (Assigned) | Read Only | Approve Changes | Full Audit |
| **Fee Ledgers & Payments** | Read/Pay (Self) | No Access | Read Only | Approve Installments | Financial Reports |
| **Grievance Submissions** | Create/Track (Self)| Read (Assigned) | Process/Update | Resolve/Escalate | Oversight View |
| **Placement Drives & Resumes** | Apply/View (Self) | No Access | Read Resumes | Approve Shortlists | Placement Reports |
| **R&D Publications** | View Public | Submit/Manage | Verify Index | Approve Grants | University Output |
| **Executive BI Analytics** | No Access | No Access | No Access | Department View | Full Campus BI |

---

## 4. Cryptographic Audit Trail Specification

Every state mutation, AI generation, and staff approval creates an immutable audit record in PostgreSQL:

```json
{
  "audit_event_id": "evt_984128491823",
  "timestamp": "2026-10-01T14:32:00.124Z",
  "actor": {
    "user_id": "usr_cfo_441",
    "role": "CHIEF_FINANCE_OFFICER",
    "ip_address": "10.0.4.18"
  },
  "action": "APPROVE_INSTALLMENT_PLAN",
  "target_entity": {
    "type": "FEE_LEDGER",
    "id": "ledger_std_9088",
    "student_id": "std_2024_cs_104"
  },
  "state_delta": {
    "previous_state": { "installment_approved": false, "tranches": 1 },
    "new_state": { "installment_approved": true, "tranches": 3 }
  },
  "cryptographic_hash": "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
}
```

---

## 5. AI Red-Teaming, Safety & Anti-Jailbreak Policies

1. **System Prompt Protection:** All prompts are encapsulated behind NeMo Guardrails to block jailbreaks attempting to reveal underlying instructions.
2. **Deterministic Fallbacks:** When confidence falls below 0.70 or when safety violations are detected, the system responds with a safe fallback and initiates a human support ticket.
3. **Emergency Crisis Bypass:** Any mention of self-harm, physical violence, or extreme harassment bypasses AI response generation and immediately sends high-priority SMS/Email alerts to Campus Security and Psychological Counseling.
