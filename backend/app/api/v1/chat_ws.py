import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from backend.app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/ws", tags=["WebSockets"])

@router.websocket("/chat/{conversation_id}")
async def websocket_chat_endpoint(websocket: WebSocket, conversation_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            message = payload.get("message", "")
            classification = await orchestrator.classify_and_route(message, message)
            
            # Step 1: Send routing frame
            await websocket.send_json({
                "type": "ROUTING_UPDATE",
                "payload": {
                    "category": classification["category"],
                    "department": classification["suggested_department"],
                    "confidence": classification["confidence_score"]
                }
            })
            
            # Step 2: Stream response frame
            await websocket.send_json({
                "type": "EXECUTION_COMPLETE",
                "payload": {
                    "summary": classification["summary"],
                    "reasoning": classification["reasoning"],
                    "status": "ENQUEUED_IN_DEPARTMENT"
                }
            })
    except WebSocketDisconnect:
        pass
