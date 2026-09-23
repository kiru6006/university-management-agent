from typing import Dict, Any
from backend.app.agents.base_agent import BaseAgent

class GrievanceAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_grievance_01", department_name="Student Welfare / Grievance Cell")

    async def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        text = str(payload).lower()
        is_crisis = any(w in text for w in ["ragging", "harassment", "assault", "threat", "suicide"])
        
        return {
            "agent_id": self.agent_id,
            "department": self.department_name,
            "action": "GRIEVANCE_CLASSIFICATION",
            "priority": "P1_CRITICAL" if is_crisis else "P2_HIGH",
            "crisis_bypass_triggered": is_crisis,
            "sla_hours": 2 if is_crisis else 24,
            "assigned_cell": "Anti-Harassment & Proctor Committee" if is_crisis else "Hostel Facility Management"
        }

grievance_agent = GrievanceAgent()
