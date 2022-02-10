import { Inject, Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { CandidateConfiguration } from "../../Application/Configuration/Candidate/configuration.interface";
import { ICandidateRepository } from "../../Application/Repositories/CandidateRepository";
import { CandidateApplicationService } from "../../Application/ApplicationServices/CandidateApplicationService.service";
import { CandidateSuspensionsLimitService } from "../Configuration/candidate-suspensions-limit.service";
import { CandidateController } from "../Controllers/Candidate/candidateController.controller";
import { CandidateFirestoreAdapter } from "../Firestore/CandidateFirestoreAdapter.adapter";
import { CandidateSchedulerService } from "../Scheduler/candidate-scheduler.service";
import { Publisher } from "../Event/Publishers/publisher";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { JwtAuthService } from "../Services/jwt.auth.service";

const candidateApplicationServiceProvider = {
  provide: 'CandidateApplicationService',
  useFactory: (repo: ICandidateRepository, publisher: Publisher, ref: ModuleRef, config: CandidateConfiguration) => {
    return new CandidateApplicationService(repo, config, ref.get(CandidateSchedulerService), publisher)
  },
  inject: [CandidateFirestoreAdapter, Publisher, ModuleRef, CandidateSuspensionsLimitService]
}

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    Publisher,
    JwtAuthService,
    CandidateFirestoreAdapter,
    CandidateSchedulerService,
    CandidateSuspensionsLimitService,
    candidateApplicationServiceProvider,
  ],
  controllers: [
    CandidateController    
  ]
})
export class CandidateModule {}