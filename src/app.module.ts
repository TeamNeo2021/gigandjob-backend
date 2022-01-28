import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './Infrastructure/Module/candidate.module';

// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MeetingController } from './Application/ApplicationServices/Meeting.controller';
// import { MeetingService } from './Application/ApplicationServices/Meeting.service';
// import { FirestoreModule } from './Infrastructure/Firestore/firestore.module';
// import { RepositoryModule } from './Infrastructure/Repository.module';

@Module({
  /*
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
  */

  controllers: [AppController, MeetingController,OfferApi],
  providers: [AppService, MeetingService,OfferService], 

  imports: [CandidateModule]

})
export class AppModule {}
