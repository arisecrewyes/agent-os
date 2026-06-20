# Agent OS Connector — "The Vending Machine"
# Routes dashboard chat requests to tool containers
FROM node:22-alpine

WORKDIR /app

# package.json and server.js are copied by the workflow into the build context
COPY package.json server.js ./

RUN npm install --only=production

EXPOSE 8888
ENV NODE_ENV=production
ENV PORT=8888

CMD ["node", "server.js"]
