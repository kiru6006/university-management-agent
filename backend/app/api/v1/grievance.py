from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.grievance_agent import grievance_agent
from backend.app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/grievance", tags=["Grievance Redressal"])

@router.post("/submit")
async def submit_grievance(payload: RequestCreate):
    classification = await orchestrator.classify_and_route(payload.title, payload.description)
    agent_output = await grievance_agent.process_request(payload.model_dump())
    return {
        "classification": classification,
        "grievance_status": agent_output
    }
