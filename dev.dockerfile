FROM node:20.15.1

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

ENV DATABASE_URL=postgresql://user:password@database:5432/postgres?schema=public

RUN yarn prisma generate

CMD ["yarn", "dev:docker"]
