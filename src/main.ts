import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as functions from "firebase-functions";

let app;

async function bootstrap() {
  //TODO: some function to switch repositories
   app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableCors();
  return app.init();
}

bootstrap()
  .then(v => console.log('Main.ts: Nest Ready'))
  .catch(err => console.error('Main.ts: Nest broken', err));


export const api: functions.HttpsFunction = functions.https.onRequest(app);
 