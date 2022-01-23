import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './Infrastructure/Firestore/firestore.module';
import { RepositoryModule } from './Infrastructure/Repository.module';

@Module({
  imports: [
//TODO: Arreglar una vez se haya conectado bien con firestore
ConfigModule.forRoot({
  isGlobal: true,
}),
// new RepositoryModule(repository),
FirestoreModule.forRoot({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    keyFilename: configService.get<string>('SA_KEY'),
  }),
  inject: [ConfigService],
}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}