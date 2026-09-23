from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.orchestrator import orchestrator
from backend.app.agents.admission_agent import admission_agent

router = APIRouter(prefix="/admissions", tags=["Admissions"])

@router.post("/query")
async def process_admission_query(payload: RequestCreate):
    classification = await orchestrator.classify_and_route(payload.title, payload.description)
    agent_output = await admission_agent.process_request(payload.model_dump())
    
    return {
        "classification": classification,
        "agent_response": agent_output
    }
