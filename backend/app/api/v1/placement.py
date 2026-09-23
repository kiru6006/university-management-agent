from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.placement_agent import placement_agent

router = APIRouter(prefix="/placements", tags=["Placements & TPO"])

@router.post("/match-drives")
async def match_placement_drives(payload: RequestCreate):
    return await placement_agent.process_request(payload.model_dump())
