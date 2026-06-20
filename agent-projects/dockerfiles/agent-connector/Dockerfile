# Agent OS Connector — "The Vending Machine"
# Routes dashboard chat requests to tool containers
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production 2>/dev/null || npm install express

COPY server.js .

EXPOSE 8888
ENV NODE_ENV=production
ENV PORT=8888

CMD ["node", "server.js"]
