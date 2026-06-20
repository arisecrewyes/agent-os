from fastapi import FastAPI
import os

app = FastAPI(title="Coldcontactxlsx")

SERVICE_NAME = os.getenv("SERVICE_NAME", "coldcontactxlsx")

@app.get("/health")
def health():
    return {"status": "ok", "service": SERVICE_NAME}

@app.get("/")
def root():
    return {"message": f"{SERVICE_NAME}", "version": "0.1.0"}

@app.post("/api/chat")
def chat(data: dict):
    message = data.get("message", "")
    return {"response": f"Echo: {message}", "note": "Set OPENROUTER_API_KEY for real responses"}
