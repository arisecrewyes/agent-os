FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/stackblitz-labs/bolt.diy.git /app/source 2>/dev/null || true
COPY . /app/source/ 2>/dev/null || true
WORKDIR /app/source
RUN npm ci --only=production 2>/dev/null || npm install 2>/dev/null || true
EXPOSE 5173
CMD ["node", "server.js"]
