# 빌드 스테이지
FROM node:20.15.1-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

ENV DATABASE_URL=postgresql://user:password@database:5432/postgres?schema=public

RUN yarn prisma generate
RUN yarn build

# 실행 스테이지
FROM node:20.15.1-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/config ./src/config


ENV DATABASE_URL=postgresql://user:password@database:5432/postgres?schema=public
ENV NODE_ENV=production

CMD ["node", "dist/src/main.js"]
