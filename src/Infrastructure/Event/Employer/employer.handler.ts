import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
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
            this.repository.insert(
                event.id.guid_value,
                event.name.value_name_employer,
                event.description.value_employer_description.valueOf(),
                event.location.value_employer_location.valueOf(),
                event.state.value_state.toString(),
                event.rif.value_employer_rif.valueOf(),
                event.phone.value_employer_phone.valueOf(),
                event.mail.value_employer_mail,
                event.comDesignation.value_comercial_designation
            )
            .then(() => console.log('Empleado registrado'))
        }
    }
}