from typing import List, Dict, Any

def match_resume_skills(extracted_skills: List[str], required_skills: List[str]) -> Dict[str, Any]:
    matched = [s for s in extracted_skills if any(r.lower() in s.lower() for r in required_skills)]
    match_percentage = round((len(matched) / max(len(required_skills), 1)) * 100, 1)
    
    return {
        "matched_skills": matched,
        "missing_skills": [s for s in required_skills if s not in matched],
        "match_percentage": match_percentage,
        "is_shortlisted": match_percentage >= 70.0
    }
