FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=development

# Copiamos primero package.json + lock y la carpeta prisma para que prisma generate
# (llamado en postinstall) encuentre schema.prisma durante `npm install`.
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependencias (usa npm install para no fallar si no hay lockfile)
RUN npm install

# Copiar el resto del código
COPY . .

# (Opcional) Forzar prisma generate por si se desactiva el postinstall
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]