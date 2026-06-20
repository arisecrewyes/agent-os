# Agent OS Connector — "The Vending Machine"
# Routes dashboard chat requests to tool containers
FROM node:22-alpine

WORKDIR /app

# Copy package files from the agent-projects directory
COPY agent-projects/dockerfiles/agent-connector/package.json package.json
COPY agent-projects/dockerfiles/agent-connector/server.js server.js

RUN npm install --only=production

EXPOSE 8888
ENV NODE_ENV=production
ENV PORT=8888

CMD ["node", "server.js"]
