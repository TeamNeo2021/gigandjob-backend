import { Module } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MeetingController } from './Application/ApplicationServices/Meeting.controller';
import { MeetingService } from './Application/ApplicationServices/Meeting.service';
import { OfferApplicationService } from './Application/ApplicationServices/Offer/OfferApplicationService.service';
import { OfferApi } from './Infrastructure/Controllers/Offer/OfferController.controller';
//import { FirestoreModule } from './Infrastructure/Firestore/firestore.module';
import { RepositoryModule } from './Infrastructure/Repository.module';

@Module({
  /*imports: [
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
  ],*/
  controllers: [AppController, MeetingController,OfferApi],
  providers: [AppService, MeetingService,OfferApplicationService],

})
export class AppModule {}
