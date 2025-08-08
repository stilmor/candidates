# Imagen base con Node
FROM node:24

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias y código
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Puerto expuesto por Vite
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host"]