# Skills & Creation — Agent Skills & Optimization
# Source: https://github.com/hardikpandya/stop-slop
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/hardikpandya/stop-slop.git .

# Create a FastAPI service for skill management
COPY <<'PYEOF' /app/api_server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os, json

app = FastAPI(title="Skills API")

class SkillRequest(BaseModel):
    text: str
    skill: str = "general"

@app.get("/health")
def health():
    return {"status": "ok", "service": "skills"}

@app.post("/humanize")
def humanize(req: SkillRequest):
    """Remove AI tells from text"""
    # Basic humanization: remove common AI phrases
    text = req.text
    replacements = [
        ("I'd be happy to", ""),
        ("As an AI", "As a"),
        ("In conclusion", "To sum up"),
        ("It's important to note", ""),
        ("Delve into", "Explore"),
        ("Utilize", "Use"),
        ("Furthermore", "Also"),
        ("Moreover", "Plus"),
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    return {"result": text, "skill": "humanizer"}

@app.post("/stop-slop")
def stop_slop(req: SkillRequest):
    """Remove AI slop from text"""
    text = req.text
    # Remove filler phrases
    fillers = [
        "Let me ", "Here's the thing", "At the end of the day",
        "It goes without saying", "Needless to say",
    ]
    for f in fillers:
        text = text.replace(f, "")
    return {"result": text, "skill": "stop-slop"}

@app.get("/skills")
def list_skills():
    return {"skills": ["humanizer", "stop-slop", "skill-optimizer"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9100)
PYEOF

EXPOSE 9100
ENV PYTHONUNBUFFERED=1
ENV PORT=9100

CMD ["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "9100"]
