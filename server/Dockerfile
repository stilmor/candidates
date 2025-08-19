FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=development


COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]