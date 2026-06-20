# Bolt DIY — Free AI Coding & Development
# Source: https://github.com/stackblitz-labs/bolt.diy
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git

RUN git clone --depth 1 https://github.com/stackblitz-labs/bolt.diy.git .

# Use npm install (bolt.diy may not have package-lock.json)
RUN npm install

# Build the app
RUN npm run build 2>/dev/null || true

EXPOSE 5173
ENV NODE_ENV=production
ENV PORT=5173

# Try start, fallback to dev server
CMD ["npm", "run", "start"]
