import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //TODO: some function to switch repositories
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
