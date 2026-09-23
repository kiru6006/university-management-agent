from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.scholarship_agent import scholarship_agent

router = APIRouter(prefix="/scholarships", tags=["Scholarships"])

@router.post("/eligibility")
async def evaluate_scholarships(payload: RequestCreate):
    return await scholarship_agent.process_request(payload.model_dump())
