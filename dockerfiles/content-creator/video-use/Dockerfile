FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/browser-use/video-use.git /app/source 2>/dev/null || true
COPY . /app/source/ 2>/dev/null || true
WORKDIR /app/source
RUN npm ci --only=production 2>/dev/null || npm install 2>/dev/null || true
EXPOSE 8092
CMD ["node", "server.js"]
