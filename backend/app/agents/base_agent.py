from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseAgent(ABC):
    def __init__(self, agent_id: str, department_name: str):
        self.agent_id = agent_id
        self.department_name = department_name

    @abstractmethod
    async def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Process incoming domain request and return action output."""
        pass
