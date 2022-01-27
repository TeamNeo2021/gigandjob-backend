import { CandidateCommand } from "src/Application/Commands/Candidate/command.interface";
import { CandidateConfiguration } from "src/Application/Configuration/Candidate/configuration.interface";
import { DomainError } from "src/Application/Errors/domain.error";
import { InfrastructureError } from "src/Application/Errors/infrastructure.error";
import { CandidatePublisherEvent } from "src/Application/Publisher/Candidate/event";
import { CandidatePublisher } from "src/Application/Publisher/Candidate/publisher.interface";
import { CouldNotPublishEventsError } from "src/Application/Publisher/Errors/could-not-publish-events.error";
import { CandidateRepository } from "src/Application/Repositories/Candidate/repository.interface";
import { CouldNotFindSuspensionCountError } from "src/Application/Repositories/Candidate/Suspensions/Errors/could-not-find-suspension-count.error";
import { CandidateSuspensionRespository } from "src/Application/Repositories/Candidate/Suspensions/repository.interface";
import { CandidateScheduler } from "src/Application/Scheduler/Candidate/scheduler.interface";
import { CandidateApplicationService as Contract } from "./service.interface";
import { CandidateTransactionService } from "./transaction.interface";

export class CandidateApplicationService implements Contract {
    private candidateTransactionService: CandidateTransactionService

    constructor(
        repository: CandidateRepository, 
        suspensionRepository: CandidateSuspensionRespository,
        configuration: CandidateConfiguration,
        scheduler: CandidateScheduler,
        private publisher: CandidatePublisher
    ) {
        this.candidateTransactionService = {
            get: (id: string) => repository.get(id),
            getSuspensionCount: (id: string) => suspensionRepository.getSuspensionCount(id),
            getSuspensionLimit: () => configuration.getSuspensionLimit(),
            scheduleCandidateReactivation: async (id: string, at: Date) => {
                await scheduler.scheduleCandidateReactivation(id, at)
            }
        }
    }

    async execute<T>(command: CandidateCommand<T>): Promise<T> {
        try {
            const result = await command.execute(this.candidateTransactionService),
                  events = result.entity.GetChanges().map(evt => new CandidatePublisherEvent(evt.constructor.name, evt))

            this.publisher.publish(events)
            return result.result
        } catch(e) {
            if (e instanceof CouldNotFindSuspensionCountError
                || e instanceof CouldNotPublishEventsError) 
            {
                throw new InfrastructureError(e)
            } else {
                throw new DomainError(e)
            }
        }
    }
}