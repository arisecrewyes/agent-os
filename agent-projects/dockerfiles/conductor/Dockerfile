# Conductor — Browser Agent Orchestration
# Browser automation service using Playwright
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl wget gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js for browser automation
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Install Playwright browsers
RUN pip install --no-cache-dir fastapi uvicorn playwright
RUN playwright install --with-deps chromium

COPY <<'PYEOF' /app/api_server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from playwright.sync_api import sync_playwright
import json

app = FastAPI(title="Conductor Browser API")

class BrowserAction(BaseModel):
    action: str  # navigate, click, type, screenshot, evaluate
    url: str = ""
    selector: str = ""
    text: str = ""
    script: str = ""

@app.get("/health")
def health():
    return {"status": "ok", "service": "conductor"}

@app.post("/execute")
def execute(action: BrowserAction):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            if action.action == "navigate" and action.url:
                page.goto(action.url)
                result = {"status": "navigated", "url": action.url}
            elif action.action == "screenshot":
                page.screenshot(path="/tmp/screenshot.png")
                result = {"status": "screenshot_saved"}
            elif action.action == "evaluate" and action.script:
                result = {"result": page.evaluate(action.script)}
            else:
                result = {"status": "unknown_action"}
            
            browser.close()
            return result
    except Exception as e:
        raise HTTPException(500, str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
PYEOF

EXPOSE 3002
ENV PYTHONUNBUFFERED=1
ENV PORT=3002


# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "3002"]
