# Hermes Voice — Voice AI Platform
# Source: https://github.com/dograh-hq/dograh
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl build-essential portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/dograh-hq/dograh.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx pydantic python-dotenv

EXPOSE 8643
ENV PYTHONUNBUFFERED=1
ENV PORT=8643

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8643"]
