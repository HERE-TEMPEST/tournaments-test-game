import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Configuration } from '@tournaments/config';

import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const builder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Test-Game api')
    .setDescription('Some description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, builder);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get<ConfigService<Configuration>>(ConfigService);
  const { port, host } = configService.get('app');

  await app.listen(port, host);

  const uri = await app.getUrl();

  console.log(`[SERVER STARTING] server listens to ${uri}`);
}

bootstrap();
