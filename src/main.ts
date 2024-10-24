import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Включите автоматическое преобразование
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  
  const config = new DocumentBuilder()
    .setTitle('Papersd-API')
    .setDescription('The papers API description')
    .setVersion('1.0')
    .addTag('papers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors({
    "origin": process.env.HOST_NAME,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": 'Content-Type, Accept',
    "preflightContinue": false,
    "optionsSuccessStatus": 200
   });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

}
bootstrap();
