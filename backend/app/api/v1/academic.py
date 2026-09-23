from fastapi import APIRouter, Response
from backend.app.services.pdf_generator import generate_bonafide_certificate_pdf
from backend.app.agents.academic_agent import academic_agent

router = APIRouter(prefix="/academic", tags=["Academic & Records"])

@router.get("/student/{student_id}/profile")
async def get_student_academic_profile(student_id: str):
    return await academic_agent.process_request({"student_id": student_id})

@router.get("/student/{student_id}/bonafide-certificate")
async def download_bonafide_certificate(student_id: str, name: str = "Aditya Sharma", dept: str = "Computer Science"):
    pdf_bytes = generate_bonafide_certificate_pdf(student_name=name, student_id=student_id, department=dept)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=bonafide_{student_id}.pdf"}
    )
