FROM node:22-alpine

WORKDIR /app

# Install ALL dependencies (including dev — needed for build)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Prune dev dependencies after build to slim the image
RUN npm prune --production

# Runtime
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
