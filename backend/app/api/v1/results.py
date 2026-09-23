from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.results_agent import results_agent

router = APIRouter(prefix="/results", tags=["Results & Revaluation"])

@router.post("/revaluation")
async def apply_revaluation(payload: RequestCreate):
    return await results_agent.process_request(payload.model_dump())
