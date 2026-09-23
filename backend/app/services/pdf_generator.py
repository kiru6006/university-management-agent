import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

def generate_bonafide_certificate_pdf(student_name: str, student_id: str, department: str) -> bytes:
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # Draw University Header
    p.setFont("Helvetica-Bold", 18)
    p.drawCentredString(300, 720, "STATE UNIVERSITY OF TECHNOLOGY")
    p.setFont("Helvetica", 11)
    p.drawCentredString(300, 700, "OFFICE OF THE REGISTRAR & STUDENT AFFAIRS")
    p.line(50, 685, 550, 685)
    
    # Certificate Title
    p.setFont("Helvetica-Bold", 14)
    p.drawCentredString(300, 640, "BONAFIDE STUDY CERTIFICATE")
    
    # Certificate Body
    p.setFont("Helvetica", 11)
    date_str = datetime.utcnow().strftime("%B %d, %Y")
    p.drawString(60, 590, f"Date: {date_str}")
    p.drawString(60, 560, f"Certificate Ref: CERT-BON-{student_id}-2026")
    
    body = (
        f"This is to certify that {student_name} (Student ID: {student_id}) is a bonafide "
        f"regular student of this University, currently pursuing studies in the Department of {department}."
    )
    p.drawString(60, 510, body[:85])
    p.drawString(60, 490, body[85:])
    
    p.drawString(60, 440, "This certificate is issued upon student request for official verification.")
    
    # Digital Signature Box
    p.setFont("Helvetica-Bold", 10)
    p.drawString(400, 360, "Digitally Signed by:")
    p.drawString(400, 345, "Registrar (Student Affairs)")
    p.drawString(400, 330, "UniOps-AI Verification Hub")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return buffer.getvalue()
