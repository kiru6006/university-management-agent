from typing import Dict, Any, List
from backend.app.core.presidio_sanitizer import pii_sanitizer

class MasterOrchestrator:
    def __init__(self):
        self.rules = [
            {
                "category": "Fees",
                "department": "Finance Department",
                "keywords": ["fee", "payment", "receipt", "dues", "tuition", "installment", "fine", "refund", "ledger", "balance", "challan"],
                "base_confidence": 0.96
            },
            {
                "category": "Exams",
                "department": "Controller of Examinations",
                "keywords": ["exam", "hall ticket", "admit card", "timetable", "schedule", "center", "seating", "clash", "conflict", "supplementary"],
                "base_confidence": 0.98
            },
            {
                "category": "Results",
                "department": "Examination Cell",
                "keywords": ["result", "marksheet", "grade", "revaluation", "re-evaluation", "sgpa", "cgpa", "marks", "transcript", "discrepancy in marks"],
                "base_confidence": 0.95
            },
            {
                "category": "Admissions",
                "department": "Admission Office",
                "keywords": ["admission", "eligibility", "application", "cutoff", "prospectus", "entrance", "enrollment", "12th marks", "quota", "apply"],
                "base_confidence": 0.94
            },
            {
                "category": "Complaints",
                "department": "Student Welfare / Grievance Cell",
                "keywords": ["complaint", "harassment", "hostel", "facility", "ragging", "misconduct", "dispute", "unfair", "grievance", "warden", "water issue"],
                "base_confidence": 0.97
            },
            {
                "category": "Scholarships",
                "department": "Scholarship Cell",
                "keywords": ["scholarship", "financial aid", "stipend", "grant", "nsp", "post matric", "minority scholarship", "income certificate"],
                "base_confidence": 0.93
            },
            {
                "category": "Placements",
                "department": "Training & Placement Cell",
                "keywords": ["placement", "company", "interview", "offer", "resume", "package", "drive", "ctc", "tpo", "shortlist"],
                "base_confidence": 0.95
            },
            {
                "category": "Research Publications",
                "department": "Research & Development Cell",
                "keywords": ["paper", "publication", "journal", "conference", "doi", "scopus", "citation", "patent", "research grant", "manuscript"],
                "base_confidence": 0.92
            },
            {
                "category": "Degree Programs",
                "department": "Academic Council / HOD Office",
                "keywords": ["syllabus", "credits", "prerequisite", "curriculum", "elective", "course structure", "major", "branch change"],
                "base_confidence": 0.90
            },
            {
                "category": "Certificates & Records",
                "department": "Student Affairs Office",
                "keywords": ["bonafide", "transfer certificate", "migration", "id card", "provisional", "medium of instruction", "character certificate"],
                "base_confidence": 0.94
            },
            {
                "category": "Faculty Services",
                "department": "HR / Faculty Affairs",
                "keywords": ["faculty leave", "appraisal", "workload", "timetable allotment", "teaching load", "salary slip"],
                "base_confidence": 0.91
            }
        ]

    async def classify_and_route(self, title: str, description: str) -> Dict[str, Any]:
        # Step 1: PII Sanitization
        sanitized_title, _ = pii_sanitizer.sanitize_text(title)
        sanitized_desc, redacted_meta = pii_sanitizer.sanitize_text(description)
        full_text = f"{sanitized_title} {sanitized_desc}".lower()

        # Step 2: Semantic Rule & Heuristic Routing
        best_match = None
        highest_score = 0
        matched_keywords = []

        for rule in self.rules:
            matches = [kw for kw in rule["keywords"] if kw in full_text]
            if len(matches) > highest_score:
                highest_score = len(matches)
                best_match = rule
                matched_keywords = matches

        if not best_match or highest_score == 0:
            return {
                "category": "General Student Services",
                "suggested_department": "Student Affairs Office",
                "confidence_score": 0.65,
                "priority": "High" if "urgent" in full_text or "emergency" in full_text else "Low",
                "summary": title[:80],
                "reasoning": "No specific departmental keywords detected. Routed to Student Affairs Office.",
                "extracted_keywords": ["general_inquiry"],
                "pii_redacted": bool(redacted_meta)
            }

        priority = "Medium"
        if any(w in full_text for w in ["critical", "emergency", "urgent", "clash", "harassment", "ragging", "today"]):
            priority = "Critical" if any(w in full_text for w in ["harassment", "ragging", "threat", "suicide"]) else "High"
        elif any(w in full_text for w in ["general info", "just asking", "brochure"]):
            priority = "Low"

        confidence = min(round(best_match["base_confidence"] + (highest_score * 0.01), 2), 0.99)
        summary = f"{best_match['category']} inquiry regarding {title.strip()}"
        reasoning = f"Detected {highest_score} domain indicators [{', '.join(matched_keywords[:4])}] correlating with {best_match['department']}."

        return {
            "category": best_match["category"],
            "suggested_department": best_match["department"],
            "confidence_score": confidence,
            "priority": priority,
            "summary": summary,
            "reasoning": reasoning,
            "extracted_keywords": matched_keywords,
            "pii_redacted": bool(redacted_meta)
        }

orchestrator = MasterOrchestrator()
