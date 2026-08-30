FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/types/package*.json ./packages/types/

RUN npm install

COPY . .

RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

RUN npm run build --workspace=apps/api

EXPOSE 3500
CMD ["sh", "-c", "cd apps/api && npx prisma migrate deploy && node dist/src/main.js"]