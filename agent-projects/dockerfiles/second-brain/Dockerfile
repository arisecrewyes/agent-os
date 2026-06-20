# Second Brain — Voice Training & Knowledge Compounding
# Shares Obsidian vault with Memory Engine
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/pewdiepie-archdaemon/odysseus.git base-src

# Install Python dependencies
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic python-dotenv

EXPOSE 8095
ENV PYTHONUNBUFFERED=1
ENV PORT=8095

# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8095"]
