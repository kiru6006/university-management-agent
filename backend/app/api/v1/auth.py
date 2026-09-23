from fastapi import APIRouter, HTTPException, status
from backend.app.models.pydantic_schemas import UserLogin, TokenResponse
from backend.app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    # Prototyping mock authentication for university portal
    role = "Student"
    full_name = "Aditya Sharma"
    
    if "admin" in credentials.email:
        role = "System Admin"
        full_name = "System Administrator"
    elif "cfo" in credentials.email or "finance" in credentials.email:
        role = "Finance Officer"
        full_name = "Mr. R. Sundaram (CFO)"
    elif "coe" in credentials.email or "exam" in credentials.email:
        role = "Exam Controller"
        full_name = "Prof. K. Venkatesh (COE)"

    token = create_access_token(subject=credentials.email, role=role)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role=role,
        full_name=full_name
    )
