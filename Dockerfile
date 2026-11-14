# ---------- BUILD STAGE ----------
FROM node:22-slim AS builder

#woking directory
WORKDIR /app

#install openssl for prisma client generation
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

#copy prisma schema
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Only generate Prisma client here (no DB connection)
RUN npm run prisma:generate
RUN npm run build:prod

# Drop dev dependencies, keeping the generated Prisma client
RUN npm prune --omit=dev


# ---------- PRODUCTION STAGE ----------
FROM node:22-slim AS production
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install production dependencies only
# RUN npm ci --omit=dev

# Copy only what’s needed from build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

user node
EXPOSE 4000

CMD ["npm", "run", "start:prod"]