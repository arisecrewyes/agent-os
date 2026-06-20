# ColdContactXLSX — Cold Email Outreach
# Source: https://github.com/aasthas2022/ColdContactXLSX
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/aasthas2022/ColdContactXLSX.git .

RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || \
    pip install --no-cache-dir fastapi uvicorn httpx pandas openpyxl jinja2

EXPOSE 8680
ENV PYTHONUNBUFFERED=1
ENV PORT=8680




# Copy entry point
COPY main.py /app/main.py

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8680"]
