FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/techenthusiast167/GITRECON.git /app/source 2>/dev/null || true
COPY . /app/source/ 2>/dev/null || true
WORKDIR /app/source
RUN pip install -r requirements.txt 2>/dev/null || pip install . 2>/dev/null || true
EXPOSE 9091
CMD ["python", "main.py"]
