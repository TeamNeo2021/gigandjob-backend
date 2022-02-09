import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CandidateApplicationService } from 'src/Application/ApplicationServices/CandidateApplicationService.service';
import { ReactivateCandidateDTO } from 'src/Application/DTO/Candidate/ReactivateCandidate.dto';
import { CandidateScheduler } from 'src/Application/Scheduler/Candidate/scheduler.interface';

@Injectable()
export class CandidateSchedulerService implements CandidateScheduler {
  constructor(
    @Inject(forwardRef(() => 'CandidateApplicationService'))
    private candidateApplicationService: CandidateApplicationService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async scheduleCandidateReactivation(id: string, at: Date): Promise<void> {
    console.log(at);
    const job = new CronJob({
      cronTime: at,
      onTick: async () => {
        try {
          await this.candidateApplicationService.Handle(
            new ReactivateCandidateDTO(id),
          );
        } catch (e) {
          console.error(e);
        }
      },
      timeZone: 'America/Caracas',
    });
    console.log(job.nextDate());

    this.schedulerRegistry.addCronJob(`reactivate-${id}`, job);
    job.start();
  }
}
