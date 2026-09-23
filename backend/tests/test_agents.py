import pytest
from backend.app.agents.admission_agent import admission_agent
from backend.app.agents.fees_agent import fees_agent
from backend.app.agents.exam_agent import exam_agent
from backend.app.services.resume_matcher import match_resume_skills
from backend.app.services.doi_verifier import verify_doi_index

@pytest.mark.asyncio
async def test_admission_agent():
    res = await admission_agent.process_request({"title": "Admission cutoffs"})
    assert res["status"] == "PROCESSED"
    assert res["department"] == "Admission Office"

@pytest.mark.asyncio
async def test_fees_agent():
    res = await fees_agent.process_request({"amount": 65000})
    assert res["installment_supported"] is True
    assert res["department"] == "Finance Department"

def test_resume_matching_logic():
    extracted = ["Python", "FastAPI", "PostgreSQL", "Docker"]
    required = ["Python", "FastAPI", "AWS", "Docker"]
    match = match_resume_skills(extracted, required)
    assert match["match_percentage"] == 75.0
    assert match["is_shortlisted"] is True

def test_doi_verification():
    doi = "10.1109/ACCESS.2026.1042"
    res = verify_doi_index(doi)
    assert res["valid"] is True
    assert res["indexed_in_scopus"] is True
