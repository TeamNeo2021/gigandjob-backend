import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(json({ limit: '200mb' }))
  app.use(cookieParser('secret'))
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
