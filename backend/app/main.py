from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.v1 import (
    auth, admission, chat_ws, academic, exams, results, grievance,
    finance, placement, scholarship, research, management, hitl_admin
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ingest all Phase 1-4 API routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(admission.router, prefix=settings.API_V1_STR)
app.include_router(academic.router, prefix=settings.API_V1_STR)
app.include_router(exams.router, prefix=settings.API_V1_STR)
app.include_router(results.router, prefix=settings.API_V1_STR)
app.include_router(grievance.router, prefix=settings.API_V1_STR)
app.include_router(finance.router, prefix=settings.API_V1_STR)
app.include_router(placement.router, prefix=settings.API_V1_STR)
app.include_router(scholarship.router, prefix=settings.API_V1_STR)
app.include_router(research.router, prefix=settings.API_V1_STR)
app.include_router(management.router, prefix=settings.API_V1_STR)
app.include_router(hitl_admin.router, prefix=settings.API_V1_STR)
app.include_router(chat_ws.router)

@app.get("/api/v1/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "pii_sanitizer": "active",
        "phase": "Phase 4 Production Ready (Full End-to-End Suite)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
