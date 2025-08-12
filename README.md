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
git clone <URL_DEL_REPOSITORIO>
cd <directorio_del_proyecto>

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

Levantar la aplicación
npm run start:dev
# o
# yarn start:dev

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


Comando de build: npm run build


Start: npm run start:prod


Variables de entorno configuradas en el dashboard de Render.


Licencia
Este proyecto se distribuye bajo la licencia MIT.

