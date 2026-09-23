from typing import Dict, Any
from backend.app.agents.base_agent import BaseAgent

class ExamAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_exams_01", department_name="Controller of Examinations")

    async def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "agent_id": self.agent_id,
            "department": self.department_name,
            "action": "EXAM_CLASH_ANALYSIS",
            "status": "EVALUATED",
            "clash_detected": "clash" in str(payload).lower(),
            "hall_ticket_status": "ELIGIBLE",
            "recommendation": "Backlog slot shifted to Oct 22 Afternoon Session."
        }

exam_agent = ExamAgent()
