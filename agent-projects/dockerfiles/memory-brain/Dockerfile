# Memory & Brain — Knowledge & Vector Search
# Source: https://github.com/moorcheh-ai/memanto
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/moorcheh-ai/memanto.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx pydantic numpy

EXPOSE 8090
ENV PYTHONUNBUFFERED=1
ENV PORT=8090

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8090"]
