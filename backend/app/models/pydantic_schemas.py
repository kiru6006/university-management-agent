from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    full_name: str

class RequestCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: str = Field(..., min_length=5)
    requester_name: str
    requester_email: EmailStr
    requester_phone: Optional[str] = None
    student_id: Optional[str] = None
    department_origin: Optional[str] = None
    channel: Optional[str] = "Web Portal"

class ClassificationResultSchema(BaseModel):
    category: str
    suggested_department: str
    confidence_score: float
    priority: str
    summary: str
    reasoning: str
    extracted_keywords: List[str]

class OverridePayload(BaseModel):
    category: str
    department: str
    priority: str
    notes: str

class ResolutionPayload(BaseModel):
    resolution_notes: str
