import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter';
import helmet from 'helmet';
import env from './utils/env';
import { getSwaggerFiles } from './utils/getSwaggerFiles';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Watch Store APIs')
    .setDescription('The description of watch store APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(env.SWAGGER_ROUTE, app, document);

  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT || 5000);

  if (env.NODE_ENV === 'development') {
    getSwaggerFiles();
  }
}
bootstrap();
