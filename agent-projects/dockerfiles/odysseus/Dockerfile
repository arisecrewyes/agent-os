# Odysseus — Self-hosted AI Workspace
# Source: https://github.com/pewdiepie-archdaemon/odysseus
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/pewdiepie-archdaemon/odysseus.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx pydantic python-dotenv

EXPOSE 7000
ENV PYTHONUNBUFFERED=1
ENV PORT=7000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7000"]
