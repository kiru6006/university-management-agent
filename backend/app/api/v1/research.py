from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.research_agent import research_agent

router = APIRouter(prefix="/research", tags=["Research & Publications"])

@router.post("/verify-doi")
async def verify_doi(payload: RequestCreate):
    return await research_agent.process_request(payload.model_dump())
