# nestjs-learning-journey
NestJs learning process

command used
yarn create vite -- Genera la estructura del proyecto con Vite
yarn dev -- Inicializa el proyecto en entorno de desarrollo
yarn add axios -- paquete que ayuda con peticiones http 

yarn add -D @types/uuid -- generador de id
yarn add class-validator class-transformer



# Para proyectos de reportes
1. Clonar el repo
2. instalar dependencias `npm install`
3. Clonar `env.template` y renombrar a `.env` y completar variables de entorno  en .env
4. Levantar la base de datos `docker compose up -d`
5. `npx prisma deb pull`
5. Generar el Prisma Client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`

npm install pdfmake
instalación de tipado estricto `npm i --save-dev @types/pdfmake`

para solucionar error "ERROR [ExceptionHandler] TypeError: pdfmake_1.default is not a constructor" añadir en tsconfig.json `"esModuleInterop": true`


