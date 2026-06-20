# Hermes Agent — Automation & Task Execution
# Source: https://github.com/NousResearch/hermes-agent
FROM python:3.11-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Clone the repo
RUN git clone --depth 1 https://github.com/NousResearch/hermes-agent.git .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx pydantic python-dotenv


# Runtime
EXPOSE 8642
ENV PYTHONUNBUFFERED=1
ENV PORT=8642


# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8642"]
