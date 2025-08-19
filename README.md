Proyecto Candidate API
Este es un proyecto construido con NestJS que gestiona candidatos en una base de datos PostgreSQL mediante Prisma.

Descripción

Framework: NestJS


ORM: Prisma


Base de datos: PostgreSQL


Documentación de la API: Swagger


Despliegue: Render


Estado de despliegue
La API está desplegada en Render y puedes acceder a la URL base y la documentación:


Base URL: https://candidates-8glg.onrender.com


Swagger UI: https://candidates-8glg.onrender.com/api/docs


Instalación local
Prerrequisitos

Node.js >= 16


npm o yarn


Una instancia de PostgreSQL en ejecución


Clonar el repositorio
git clone https://github.com/stilmor/candidates.git
cd candidates

Variables de entorno
Crea un archivo .env en la raíz del proyecto con al menos la siguiente variable:

DATABASE_URL="postgresql://<usuario>:<contraseña>@<host>:5432/<base_de_datos>?sslmode=require"

Instalación de dependencias
npm install
# o
# yarn install

Generar cliente Prisma y migraciones
npx prisma migrate dev --name init
npx prisma generate

Levantar la aplicación desde la carpeta raiz del proyecto
npm run dev -w client
npm run dev -w server

La aplicación quedará disponible en http://localhost:3000.

Documentación Swagger
Una vez levantada la aplicación, la documentación interactiva de la API estará en:

GET /api/docs

ó directamente en el navegador:
http://localhost:3000/api/docs

Estructura principal

src/modules/candidate: Módulo de candidates con controlador, caso de uso y repositorio.


src/modules/candidate/infra/prisma: Implementación del repositorio y servicio de Prisma.


src/modules/candidate/dto: DTOs con class-validator y Swagger.


src/modules/candidate/entities: Entidades de dominio (si aplica).


Despliegue en Render
El despliegue en Render está configurado con:

Servicio:

    Con autoDeploy OnCommit en branch main

    Comando de build: npm ci && npm run build


    Start: npm run start:prod

Cliente:

    Comando de build: npm ci --include=optional \   && npm i -D @rollup/rollup-linux-x64-gnu@^4 --no-save \   && npm run build

    Con autoDeploy OnCommit en branch main

    Publish Directory: dist


Variables de entorno configuradas en el dashboard de Render.

## Ejecución con Docker

El proyecto incluye un `docker-compose.yml` en la raíz que levanta:

- **PostgreSQL** (`candidates_db`)
- **API NestJS** (`candidates_server`)
- **Frontend Vue** (`candidates_client`)

### 1. Levantar contenedores

docker compose up -d --build

### 2. aplicar las migraciones a la base de datos

docker compose exec server npx prisma migrate deploy

### 3. aplicar las migraciones a la base de datos

•	Frontend: http://localhost:5173
•	Backend NestJS: http://localhost:3000
•	Swagger (API Docs): http://localhost:3000/api/docs

### 4. Parar los servicios
docker compose down

# Recomendacion usar Docker Desktop
https://www.docker.com/products/docker-desktop/


Licencia
Este proyecto se distribuye bajo la licencia MIT.

