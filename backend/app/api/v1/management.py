from fastapi import APIRouter
from backend.app.agents.management_intel_agent import management_intel_agent

router = APIRouter(prefix="/management", tags=["Management Intelligence"])

@router.get("/executive-summary")
async def get_executive_summary():
    return await management_intel_agent.process_request({})
