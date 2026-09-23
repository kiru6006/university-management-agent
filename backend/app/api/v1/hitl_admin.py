from fastapi import APIRouter
from backend.app.models.pydantic_schemas import OverridePayload, ResolutionPayload

router = APIRouter(prefix="/hitl", tags=["Human-in-the-Loop Admin"])

@router.post("/tickets/{ticket_id}/approve")
async def approve_ticket(ticket_id: str, officer_name: str = "Staff Reviewer"):
    return {
        "ticket_id": ticket_id,
        "status": "ROUTED",
        "approved_by": officer_name,
        "action": "AI_CLASSIFICATION_CONFIRMED"
    }

@router.post("/tickets/{ticket_id}/override")
async def override_ticket(ticket_id: str, payload: OverridePayload):
    return {
        "ticket_id": ticket_id,
        "status": "ROUTED",
        "overridden_category": payload.category,
        "overridden_department": payload.department,
        "notes": payload.notes,
        "is_overridden": True
    }

@router.post("/tickets/{ticket_id}/resolve")
async def resolve_ticket(ticket_id: str, payload: ResolutionPayload):
    return {
        "ticket_id": ticket_id,
        "status": "RESOLVED",
        "resolution_notes": payload.resolution_notes
    }
