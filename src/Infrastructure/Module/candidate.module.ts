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

const candidateApplicationServiceProvider = {
  provide: 'CandidateApplicationService',
  useFactory: (repo: ICandidateRepository, ref: ModuleRef, config: CandidateConfiguration) => {
    return new CandidateApplicationService(repo, config, ref.get(CandidateSchedulerService))
  },
  inject: [CandidateFirestoreAdapter, ModuleRef, CandidateSuspensionsLimitService]
}

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [
    CandidateFirestoreAdapter,
    CandidateSchedulerService,
    CandidateSuspensionsLimitService,
    candidateApplicationServiceProvider
  ],
  controllers: [
    CandidateController    
  ]
})
export class CandidateModule {}