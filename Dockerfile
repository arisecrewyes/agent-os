FROM node:22-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Runtime
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
