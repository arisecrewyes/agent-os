# Second Brain — Voice Training & Knowledge Compounding
# Shares Obsidian vault with Memory Engine
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/pewdiepie-archdaemon/odysseus.git base-src

COPY <<'PYEOF' /app/api_server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os, json, datetime

app = FastAPI(title="Second Brain API")

VAULT_PATH = os.getenv("OBSIDIAN_VAULT_PATH", "/data/obsidian-vault")

class NoteRequest(BaseModel):
    title: str
    content: str
    tags: list = []
    category: str = "inbox"  # inbox, projects, areas, resources, archive

@app.get("/health")
def health():
    return {"status": "ok", "service": "second-brain", "vault": VAULT_PATH}

@app.post("/notes")
def create_note(req: NoteRequest):
    today = datetime.date.today().isoformat()
    filename = f"{req.category}/{today}-{req.title.replace(' ', '-').lower()}.md"
    filepath = os.path.join(VAULT_PATH, filename)
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    note_content = f"""# {req.title}
Created: {today}
Tags: {', '.join(req.tags)}
Category: {req.category}

{req.content}
"""
    with open(filepath, 'w') as f:
        f.write(note_content)
    
    return {"status": "created", "path": filename}

@app.get("/notes")
def list_notes():
    notes = []
    for root, dirs, files in os.walk(VAULT_PATH):
        for f in files:
            if f.endswith('.md'):
                notes.append(os.path.join(root, f).replace(VAULT_PATH + '/', ''))
    return {"notes": notes[:50]}

@app.get("/search")
def search(q: str):
    results = []
    for root, dirs, files in os.walk(VAULT_PATH):
        for f in files:
            if f.endswith('.md'):
                path = os.path.join(root, f)
                with open(path) as fh:
                    content = fh.read()
                    if q.lower() in content.lower():
                        results.append({"path": path.replace(VAULT_PATH + '/', ''), "snippet": content[:200]})
    return {"results": results[:20]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8095)
PYEOF

EXPOSE 8095
ENV PYTHONUNBUFFERED=1
ENV PORT=8095

CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8095"]
