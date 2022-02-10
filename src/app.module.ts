import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployerApplicationService } from './Application/ApplicationServices/Employer/employer.service';
import { CandidateModule } from './Infrastructure/Module/candidate.module';
import { MeetingController } from './Infrastructure/Controllers/meeting/Meeting.controller';
import { OfferApplicationService } from './Application/ApplicationServices/Offer/OfferApplicationService.service';
import { EmployerController } from './Infrastructure/Controllers/Employer/employer.controller';
import { EmployerRepositoryService } from './Infrastructure/Firestore/Employer/repository/repository.service';
import { FirestoreModule } from './Infrastructure/Firestore/config/firestore.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ICandidateRepository } from './Application/Repositories/CandidateRepository';
import { INotificationSender } from './Application/Ports/INotificationSender';
import { OfferController } from './Infrastructure/Controllers/Offer/OfferController.controller';
import { MeetingApplicationService } from './Application/ApplicationServices/MeetingApplicationService.service';
import { MeetingFirestoreAdapter } from './Infrastructure/Firestore/MeetingFirestoreAdapter.adapter';
import { DashboardController } from './Infrastructure/Controllers/Read-side/dashboard/dashboard.controller';
import { DashboardWebQueryFirestoreAdapter } from './Infrastructure/Firestore/DashboardWebQueryFirestoreAdapter';
import { OfferFirestoreAdapter } from './Infrastructure/Firestore/OfferFirestoreAdapter.adapter';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './Infrastructure/Services/auth.service';
import { UserRepository } from './Application/Repositories/User/repository.interface';
import { UserApplicationService } from './Application/ApplicationServices/UserApplicationService.service';
import { UserFirestoreAdapterService } from './Infrastructure/Firestore/UserFirestoreAdapter.adapter';
import { UserCreationHandler } from './Infrastructure/Event/Handlers/UserCreation.handler';
import { UserController } from './Infrastructure/Controllers/User/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './Infrastructure/Services/jwt.auth.service';
import { OfferQueryFirestoreAdapter } from './Infrastructure/Firestore/OfferMobileQueryFirestoreAdapter';
import { CandidateController } from './Infrastructure/Controllers/Candidate/candidateController.controller';
import { CandidateFirestoreAdapter } from './Infrastructure/Firestore/CandidateFirestoreAdapter.adapter';


const employerServiceProvider = {
  provide: 'EmployerApplicationService',
  useFactory: (repo: EmployerRepositoryService) => {
    return new EmployerApplicationService(repo);
  },
  inject: [EmployerRepositoryService]
}

const userServiceProvider = {
  provide: 'UserService',
  useFactory: (repo: UserRepository) => {
    return new UserApplicationService(repo)
  },
  inject: [UserFirestoreAdapterService]
}

const offerServiceProvider = {
  provide: 'OfferApplicationService',
  useFactory: (
    Offerrepo: OfferFirestoreAdapter,
    candidateRepoC: ICandidateRepository,
    Employerrepo: EmployerRepositoryService,
    Sender: INotificationSender,
  ) =>
    new OfferApplicationService(
      Offerrepo,
      candidateRepoC,
      Employerrepo,
      Sender,
    ),
  Inject: [OfferFirestoreAdapter],
};

const meetingAdapterProvider = {
  provide: 'MeetingApplicationService',
  useFactory: (repo: MeetingFirestoreAdapter) => {
    return new MeetingApplicationService(repo);
  },
  inject: [MeetingFirestoreAdapter],
};

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
        'applications',
        'users',
        'dashboardModel'
      ]
    }),
    CandidateModule,
    CqrsModule,
    JwtModule.register({
      secret: 'secret',
    })
  ],
  controllers: [
    AppController, 
    MeetingController, 
    OfferController, 
    UserController,
    EmployerController,
    DashboardController,
  ],
  providers: [
    // Users stack
    UserFirestoreAdapterService,
    userServiceProvider,
    UserCreationHandler,
    AuthService,
    JwtAuthService,

    AppService, 
    DashboardWebQueryFirestoreAdapter,
    MeetingApplicationService,
    MeetingFirestoreAdapter,
    OfferApplicationService,
    OfferFirestoreAdapter,
    EmployerRepositoryService,
    employerServiceProvider,
    meetingAdapterProvider,
    OfferQueryFirestoreAdapter,
  ],
})
export class AppModule {}
