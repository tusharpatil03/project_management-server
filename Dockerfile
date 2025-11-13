# ---------- BUILD STAGE ----------
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Only generate Prisma client here (no DB connection)
RUN npm run prisma:generate
RUN npm run build:prod


# ---------- PRODUCTION STAGE ----------
FROM node:22.14.0-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy only what’s needed from build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

CMD ["npm", "run", "start:prod"]