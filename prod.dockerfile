# 빌드 스테이지
FROM node:20.15.1-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

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

ENV NODE_ENV=production

CMD ["node", "dist/src/main.js"]
