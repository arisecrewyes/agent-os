FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production 2>/dev/null || npm install
COPY . .
EXPOSE 8090
CMD ["node", "server.js"]
