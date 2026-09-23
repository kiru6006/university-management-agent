import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "University AI Operations Platform (UniOps-AI)"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Security
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "uniops_super_secret_jwt_key_2026_change_in_production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Databases
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://uniops_user:uniops_secret@localhost:5432/uniops_db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    
    # LLM Settings
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:4200",
        "http://localhost:3000",
        "http://localhost:8000"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
