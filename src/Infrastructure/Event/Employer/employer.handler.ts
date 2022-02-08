import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmployerDTO } from "src/Application/DTO/Employer/Employer.dto";
import { EmployerPublisherEvent } from "src/Application/Publisher/Employer/event";
import { EmployerRegistered } from "src/Dominio/DomainEvents/EmployerEvents/EmployerRegistered";
import { EmployerRepositoryService } from "src/Infrastructure/Firestore/Employer/repository/repository.service";

@EventsHandler(EmployerPublisherEvent)
export class EmployerEventHandler implements IEventHandler<EmployerPublisherEvent> {
    constructor(private repository: EmployerRepositoryService) {}

    handle(tEvent: EmployerPublisherEvent) {
        switch (tEvent.ident) {
            case 'EmployerRegistered': 
            let event = tEvent.body as EmployerRegistered
            this.repository.save(
              new EmployerDTO(event) //TODO REVISAR ESTO
            )
            .then(() => console.log('Empleado registrado'))
        }
    }
}