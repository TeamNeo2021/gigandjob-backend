import { EmployerCommand } from "src/Application/Commands/Employer/command.interface";
import { DomainError } from "src/Application/Errors/domain.error";
import { InfrastructureError } from "src/Application/Errors/infrastructure.error";
import { CouldNotPublishEventsError } from "src/Application/Publisher/Employer/Errors/could-not-publish-events.error";
import { EmployerPublisherEvent } from "src/Application/Publisher/Employer/event";
import { EmployerPublisher } from "src/Application/Publisher/Employer/publisher.interface";
import { EmployerQuery } from "src/Application/Queries/Employer/query.interface";
import { CouldNotFindEmployerError } from "src/Application/Repositories/Employer/Errors/could-not-find-employer.error";
import { CouldNotGetAllEmployersError } from "src/Application/Repositories/Employer/Errors/could-not-get-all-employers.error";
import { EmployerRepository } from "src/Application/Repositories/Employer/repository.interface";
import { EmployerApplicationService as Contract  } from "./service.interface";
import { EmployerTransactionService } from "./transaction.interface";

export class EmployerApplicationService implements Contract {
    transactionService: EmployerTransactionService

    constructor(repository: EmployerRepository, private publisher: EmployerPublisher) {
        this.transactionService = {
            get(id: string) {
                return repository.get(id)
            },
            getAll() {
                return repository.getAll()
            }
        }
    }

    async execute<T>(command: EmployerCommand<T>): Promise<T> {
        try {
            const commandResult = await command.execute(this.transactionService),
                  eventsToPublish = commandResult.events.map(evt => new EmployerPublisherEvent(evt.constructor.name, evt))
            
            this.publisher.publish(eventsToPublish) 
            return commandResult.result
        } catch(e) {
            if (e instanceof CouldNotPublishEventsError) {
                throw new InfrastructureError(e) // Publisher errors
            } else if (e instanceof CouldNotFindEmployerError || e instanceof CouldNotGetAllEmployersError) {
                throw new InfrastructureError(e) // Repository errors
            } else {
                throw new DomainError(e) // Domain layer errors
            }

        }
    }
    query<T>(query: EmployerQuery<T>): Promise<T> {
        try {
            return query.query(this.transactionService)
        } catch(e) {
            if (e instanceof CouldNotFindEmployerError || e instanceof CouldNotGetAllEmployersError) {
                throw new InfrastructureError(e) // Repository errors
            } else {
                throw new DomainError(e) // Domain errors
            }
        }
    }
}