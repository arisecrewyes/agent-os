# MiniMax M3 + Hermes — Free AI Agent Stack
# Since MiniMax has no public repo, this is a lightweight connector
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uvicorn explicitly
RUN pip install --no-cache-dir uvicorn fastapi httpx pydantic

COPY <<'PYEOF' /app/api_server.py
from fastapi import FastAPI
from pydantic import BaseModel
import httpx, os

app = FastAPI(title="MiniMax-Hermes Connector")

class ChatRequest(BaseModel):
    message: str
    model: str = "minimax"

@app.get("/health")
def health():
    return {"status": "ok", "service": "minimax-hermes"}

@app.post("/chat")
def chat(req: ChatRequest):
    api_url = os.getenv("MINIMAX_API_URL", "https://api.minimaxi.chat/v1")
    api_key = os.getenv("MINIMAX_API_KEY", "")
    if not api_key:
        return {"response": f"[MiniMax-Hermes] Echo: {req.message}", "note": "Set MINIMAX_API_KEY"}
    try:
        with httpx.Client() as client:
            resp = client.post(
                f"{api_url}/text/chatcompletion_v2",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": "abab6.5s-chat", "messages": [{"role": "user", "content": req.message}]},
                timeout=30
            )
            return resp.json()
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8660)
PYEOF

EXPOSE 8660
ENV PYTHONUNBUFFERED=1
ENV PORT=8660

CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8660"]
