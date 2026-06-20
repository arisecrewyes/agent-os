# OSINT Specialist — Sherlock Username Search
# Source: https://github.com/sherlock-project/sherlock
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl tor \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/sherlock-project/sherlock.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir requests aiohttp fastapi uvicorn

# Wrap Sherlock in a FastAPI service
COPY <<'PYEOF' /app/api_server.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import subprocess, json, os

app = FastAPI(title="Sherlock OSINT API")

@app.get("/health")
def health():
    return {"status": "ok", "service": "sherlock"}

@app.post("/search")
def search(data: dict):
    username = data.get("username", "")
    if not username:
        raise HTTPException(400, "username required")
    try:
        result = subprocess.run(
            ["python", "sherlock", "--output", "/dev/stdout", username],
            capture_output=True, text=True, timeout=60
        )
        return {"username": username, "results": result.stdout}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9090)
PYEOF

EXPOSE 9090
ENV PYTHONUNBUFFERED=1
ENV PORT=9090


# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "9090"]
