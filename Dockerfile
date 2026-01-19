# ---------- Base ----------
FROM node:20-alpine AS base

WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm install

# ---------- Builder ----------
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# ---------- Production ----------
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3333

CMD ["node", "dist/server.js"]
