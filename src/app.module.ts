import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployerApplicationService } from './Application/ApplicationServices/Employer/employer.service';
import { CandidateModule } from './Infrastructure/Module/candidate.module';

import { MeetingController } from './Infrastructure/Controllers/meeting/Meeting.controller';
import { OfferApplicationService } from './Application/ApplicationServices/Offer/OfferApplicationService.service';
import { EmployerController } from './Infrastructure/Controllers/Employer/employer.controller';
import { EmployerEventHandler } from './Infrastructure/Event/Employer/employer.handler';
import { EmployerPublisherService } from './Infrastructure/Event/Employer/employer.publisher';
import { EmployerRepositoryService } from './Infrastructure/Firestore/Employer/repository/repository.service';
import { FirestoreModule } from './Infrastructure/Firestore/config/firestore.module';
import { CqrsModule } from '@nestjs/cqrs';
import { OfferFirestoreRepository } from './Infrastructure/Firestore/OfferFirestoreAdapter.adapter.';
import { ICandidateRepository } from './Application/Repositories/CandidateRepository';
import { INotificationSender } from './Application/Ports/INotificationSender';
import { OfferController } from './Infrastructure/Controllers/Offer/OfferController.controller';
import { MeetingApplicationService } from './Application/ApplicationServices/MeetingApplicationService.service';
import { MeetingFirestoreAdapter } from './Infrastructure/Firestore/MeetingFirestoreAdapter.adapter';

const employerServiceProvider = {
  provide: 'EmployerApplicationService',
  useFactory: (repo: EmployerRepositoryService, publisher: EmployerPublisherService) => {
    return new EmployerApplicationService(repo, publisher)
  },
  inject: [EmployerRepositoryService, EmployerPublisherService]
}
const offerServiceProvider = {
  provide: 'OfferApplicationService',
  useFactory: (Offerrepo: OfferFirestoreRepository, candidateRepoC: ICandidateRepository, Employerrepo: EmployerRepositoryService, Sender: INotificationSender) => new OfferApplicationService(Offerrepo, candidateRepoC, Employerrepo,Sender),
  Inject: [OfferFirestoreRepository]
}

const meetingAdapterProvider = {
  provide: 'MeetingApplicationService',
  useFactory: (repo: MeetingFirestoreAdapter) => {
    return new MeetingApplicationService(repo)
  },
  inject: [MeetingFirestoreAdapter]
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
        'employers',
        'meetings',
        'offers',
        'candidates',
        'applications'
      ]
    }),
    CandidateModule,
    CqrsModule
  ],
  controllers: [
    AppController, 
    MeetingController, 
    OfferController, 
    EmployerController
  ],
  providers: [
    AppService, 
    MeetingApplicationService,
    MeetingFirestoreAdapter,
    OfferApplicationService,
    OfferFirestoreRepository,
    EmployerRepositoryService,
    EmployerPublisherService,
    EmployerEventHandler,
    employerServiceProvider,
    meetingAdapterProvider
  ],
})
export class AppModule {}
