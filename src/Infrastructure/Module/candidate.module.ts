import { Inject, Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { CandidateConfiguration } from "src/Application/Configuration/Candidate/configuration.interface";
import { ICandidateRepository } from "src/Application/Repositories/CandidateRepository";
import { CandidateScheduler } from "src/Application/Scheduler/Candidate/scheduler.interface";
import { isNumberObject } from "util/types";
import { CandidateApplicationService } from "../../Application/ApplicationServices/CandidateApplicationService.service";
import { CandidateSuspensionsLimitService } from "../Configuration/candidate-suspensions-limit.service";
import { CandidateController } from "../Controllers/candidateController.controller";
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