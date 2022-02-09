import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  //TODO: some function to switch repositories
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(cookieParser('secret'))
  await app.listen(3000);
}
bootstrap();
