import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Numeric, Integer, Text, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from backend.app.core.database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    university_id = Column(String(64), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(64), nullable=False)
    department = Column(String(128), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class CaseTicketModel(Base):
    __tablename__ = "case_tickets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ticket_id = Column(String(32), unique=True, nullable=False, index=True)
    requester_name = Column(String(255), nullable=False)
    requester_email = Column(String(255), nullable=False)
    requester_phone = Column(String(32), nullable=True)
    student_id = Column(String(64), nullable=True, index=True)
    role = Column(String(64), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    channel = Column(String(32), default="Web Portal")
    category = Column(String(64), nullable=False, index=True)
    suggested_department = Column(String(128), nullable=False)
    assigned_department = Column(String(128), nullable=False, index=True)
    confidence_score = Column(Numeric(4, 3), nullable=False)
    priority = Column(String(16), nullable=False, index=True)
    status = Column(String(32), nullable=False, default="Pending Review", index=True)
    ai_summary = Column(Text, nullable=True)
    ai_reasoning = Column(Text, nullable=True)
    extracted_keywords = Column(JSON, default=list)
    is_overridden = Column(Boolean, default=False)
    override_notes = Column(Text, nullable=True)
    overridden_by = Column(String(255), nullable=True)
    assigned_officer = Column(String(255), nullable=True)
    resolution_notes = Column(Text, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    resolved_by = Column(String(255), nullable=True)
    timeline = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
