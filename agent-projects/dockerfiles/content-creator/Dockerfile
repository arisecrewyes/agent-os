# Content Creator — Video, Media & AI Generation
# Source: https://github.com/averygan/reclip (base for content tools)
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Clone reclip as base content tool
RUN git clone --depth 1 https://github.com/averygan/reclip.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx yt-dlp

# Install additional content tools
RUN pip install --no-cache-dir openai requests Pillow

EXPOSE 8080
ENV PYTHONUNBUFFERED=1
ENV PORT=8080


# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
