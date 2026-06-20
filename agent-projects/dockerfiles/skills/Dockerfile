# Skills & Creation — Agent Skills & Optimization
# Source: https://github.com/hardikpandya/stop-slop
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/hardikpandya/stop-slop.git .

# Install Python dependencies
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic python-dotenv

EXPOSE 9100
ENV PYTHONUNBUFFERED=1
ENV PORT=9100

# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9100"]
