import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployerApplicationService } from './Application/ApplicationServices/Employer/employer.service';
import { CandidateModule } from './Infrastructure/Module/candidate.module';

import { MeetingController } from './Infrastructure/API/meeting/Meeting.controller';
import { MeetingService } from './Application/ApplicationServices/Meeting.service';
import { OfferService } from './Application/ApplicationServices/OfferService.service';
import { EmployerController } from './Infrastructure/API/Employer/employer.controller';
import { OfferApi } from './Infrastructure/API/Offer/offer.controller';
import { EmployerEventHandler } from './Infrastructure/Event/Employer/employer.handler';
import { EmployerPublisherService } from './Infrastructure/Event/Employer/employer.publisher';
import { EmployerRepositoryService } from './Infrastructure/Firestore/Employer/repository/repository.service';
import { FirestoreModule } from './Infrastructure/Firestore/config/firestore.module';
import { CqrsModule } from '@nestjs/cqrs';

const employerProvider = {
  provide: 'EmployerApplicationService',
  useFactory: (repo: EmployerRepositoryService, publisher: EmployerPublisherService) => {
    return new EmployerApplicationService(repo, publisher)
  },
  inject: [EmployerRepositoryService, EmployerPublisherService]
}

@Module({
  
  imports: [
    //TODO: Arreglar una vez se haya conectado bien con firestore
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('KEY_PATH'),
      }),
      inject: [ConfigService],
      collections: [
        'employers'
      ]
    }),
    CandidateModule,
    CqrsModule
  ],
  controllers: [
    AppController, 
    MeetingController, 
    OfferApi, 
    EmployerController
  ],
  providers: [
    AppService, 
    MeetingService,
    OfferService,
    EmployerRepositoryService,
    EmployerPublisherService,
    EmployerEventHandler,
    employerProvider,
  ],
})
export class AppModule {}
