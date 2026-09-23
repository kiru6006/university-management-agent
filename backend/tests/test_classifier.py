import pytest
from backend.app.agents.orchestrator import orchestrator
from backend.app.core.presidio_sanitizer import pii_sanitizer

@pytest.mark.asyncio
async def test_fees_classification():
    result = await orchestrator.classify_and_route(
        "Need tuition installment plan",
        "Can I pay my semester fee dues in 3 installments?"
    )
    assert result["category"] == "Fees"
    assert result["suggested_department"] == "Finance Department"
    assert result["confidence_score"] >= 0.90

@pytest.mark.asyncio
async def test_exam_clash_classification():
    result = await orchestrator.classify_and_route(
        "Exam timetable clash",
        "My backlog exam overlaps with regular exam date."
    )
    assert result["category"] == "Exams"
    assert result["suggested_department"] == "Controller of Examinations"
    assert result["priority"] in ["High", "Critical"]

@pytest.mark.asyncio
async def test_grievance_classification():
    result = await orchestrator.classify_and_route(
        "Hostel water disruption",
        "Block C has had no water supply for two days."
    )
    assert result["category"] == "Complaints"
    assert result["suggested_department"] == "Student Welfare / Grievance Cell"

def test_pii_sanitization():
    raw_text = "My phone is 9876543210 and Aadhaar is 1234 5678 9012"
    masked, meta = pii_sanitizer.sanitize_text(raw_text)
    assert "<REDACTED_PHONE>" in masked
    assert "<REDACTED_AADHAAR_ID>" in masked
    assert "9876543210" not in masked
