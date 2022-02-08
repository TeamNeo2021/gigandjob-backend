import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //TODO: some function to switch repositories
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  await app.listen(3000);
}
bootstrap();
