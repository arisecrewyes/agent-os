FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/open-wa/wa-automate-nodejs.git /app/source 2>/dev/null || true
COPY . /app/source/ 2>/dev/null || true
WORKDIR /app/source
RUN npm ci --only=production 2>/dev/null || npm install 2>/dev/null || true
EXPOSE 8093
CMD ["node", "server.js"]
