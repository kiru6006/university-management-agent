from typing import Dict, Any
from backend.app.agents.base_agent import BaseAgent

class FeesAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_fees_01", department_name="Finance Department")

    async def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "agent_id": self.agent_id,
            "department": self.department_name,
            "action": "FEE_LEDGER_&_INSTALLMENT_ROUTING",
            "status": "ENQUEUED_FOR_CFO_SIGNATURE",
            "outstanding_balance": 65000,
            "payment_link": "https://pay.university.edu/tx/89412",
            "installment_supported": True,
            "max_tranches": 3
        }

fees_agent = FeesAgent()
