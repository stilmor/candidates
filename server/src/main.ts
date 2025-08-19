import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seed/seed.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina props no declaradas en el DTO
      forbidNonWhitelisted: true, // si llegan props extra -> 400
      transform: true, // convierte tipos (strings a numbers, dates, etc.)
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true, // primer error y corta
      validationError: { target: false, value: true },
    }),
  );

  // CORS para desarrollo (Vite en 5173)
  app.enableCors({
    origin: ['http://localhost:5173', 'https://candidates-front.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('Entrevistas API')
    .setDescription('Documentación de la API de entrevistas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const seed = app.get<SeedService>(SeedService);
  await seed.run();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
