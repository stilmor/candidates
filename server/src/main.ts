import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para desarrollo (Vite en 5173)
  app.enableCors({
    origin: ['http://localhost:5173', 'https://candidates-front.onrender.com'], // añade aquí tu front en dev
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // pon true solo si usas cookies/sesión en navegador
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('Entrevistas API')
    .setDescription('Documentación de la API de entrevistas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const seed = app.get<SeedService>(SeedService); // 👈 ya no es any
  await seed.run();

  await app.listen(3000);
}
bootstrap();
