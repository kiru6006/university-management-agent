from fastapi import APIRouter
from backend.app.models.pydantic_schemas import RequestCreate
from backend.app.agents.fees_agent import fees_agent

router = APIRouter(prefix="/finance", tags=["Finance & Accounts"])

@router.post("/installment-request")
async def submit_installment_request(payload: RequestCreate):
    return await fees_agent.process_request(payload.model_dump())
