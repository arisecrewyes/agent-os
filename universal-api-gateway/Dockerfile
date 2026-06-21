FROM node:22-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create Python virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies in venv
RUN pip install --no-cache-dir dnspython requests

# Install Node.js dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Install Playwright for browser automation
RUN npx playwright install chromium
RUN npx playwright install-deps chromium

# Copy application code
COPY server.js ./
COPY adapters/ ./adapters/

# Make Python adapters executable
RUN chmod +x /app/adapters/*.py

EXPOSE 8889

CMD ["node", "server.js"]
