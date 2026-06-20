# Bolt DIY — Free AI Coding & Development
# Source: https://github.com/stackblitz-labs/bolt.diy
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git

RUN git clone --depth 1 https://github.com/stackblitz-labs/bolt.diy.git .

RUN npm ci

EXPOSE 5173
ENV NODE_ENV=production
ENV PORT=5173

CMD ["npm", "run", "start"]
