from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.exam_agent import exam_agent
from backend.app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/exams", tags=["Examinations"])

@router.post("/clash-check")
async def check_exam_clashes(payload: RequestCreate):
    classification = await orchestrator.classify_and_route(payload.title, payload.description)
    agent_output = await exam_agent.process_request(payload.model_dump())
    return {
        "classification": classification,
        "exam_analysis": agent_output
    }
