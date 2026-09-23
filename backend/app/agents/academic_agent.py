from typing import Dict, Any
from backend.app.agents.base_agent import BaseAgent

class AcademicAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_academic_01", department_name="Student Affairs Office")

    async def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "agent_id": self.agent_id,
            "department": self.department_name,
            "action": "STUDENT_RECORD_QUERY",
            "status": "COMPLETED",
            "data": {
                "enrollment_status": "Active (Semester 4)",
                "attendance_percentage": 88.5,
                "standing": "Good Standing"
            }
        }

academic_agent = AcademicAgent()
