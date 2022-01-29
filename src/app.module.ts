import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { MeetingController } from './Application/ApplicationServices/Meeting.controller';
import { MeetingApplicationService } from './Application/ApplicationServices/MeetingApplicationService.service';
//import { FirestoreModule } from './Infrastructure/Firestore/firestore.module';
import { RepositoryModule } from './Infrastructure/Repository.module';
=======
import { EmployerApplicationService } from './Application/ApplicationServices/Employer/employer.service';
import { CandidateModule } from './Infrastructure/Module/candidate.module';

import { MeetingController } from './Infrastructure/Controllers/meeting/Meeting.controller';
import { MeetingService } from './Application/ApplicationServices/Meeting.service';
import { OfferApplicationService } from './Application/ApplicationServices/Offer/OfferApplicationService.service';
import { EmployerController } from './Infrastructure/Controllers/Employer/employer.controller';
import { EmployerEventHandler } from './Infrastructure/Event/Employer/employer.handler';
import { EmployerPublisherService } from './Infrastructure/Event/Employer/employer.publisher';
import { EmployerRepositoryService } from './Infrastructure/Firestore/Employer/repository/repository.service';
import { FirestoreModule } from './Infrastructure/Firestore/config/firestore.module';
import { CqrsModule } from '@nestjs/cqrs';
import { OfferFirestoreRepository } from './Infrastructure/Firestore/OfferFirestoreRepository.repo';
import { ICandidateRepository } from './Application/Repositories/CandidateRepository';
import { INotificationSender } from './Application/Ports/INotificationSender';
import { OfferController } from './Infrastructure/Controllers/Offer/OfferController.controller';

const employerServiceProvider = {
  provide: 'EmployerApplicationService',
  useFactory: (repo: EmployerRepositoryService, publisher: EmployerPublisherService) => {
    return new EmployerApplicationService(repo, publisher)
  },
  inject: [EmployerRepositoryService, EmployerPublisherService]
}
const offerServiceProvider = {
  provide: 'OfferApplicationService',
  useFactory: (Offerrepo: OfferFirestoreRepository, candidateRepoC: ICandidateRepository, Sender: INotificationSender) => new OfferApplicationService(Offerrepo, candidateRepoC,Sender),
  Inject: [OfferFirestoreRepository]
}

>>>>>>> origin/main

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
        'offers',
        'candidates'
      ]
    }),
<<<<<<< HEAD
  ],*/
  controllers: [AppController, MeetingController],
  providers: [AppService, MeetingApplicationService],
=======
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
    MeetingService,
    OfferApplicationService,
    OfferFirestoreRepository,
    EmployerRepositoryService,
    EmployerPublisherService,
    EmployerEventHandler,
    employerServiceProvider
  ],
>>>>>>> origin/main
})
export class AppModule {}
