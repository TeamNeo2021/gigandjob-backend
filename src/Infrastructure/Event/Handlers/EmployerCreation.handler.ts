import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmployerRegistered } from "src/Dominio/DomainEvents/EmployerEvents/EmployerRegistered";

@EventsHandler(EmployerRegistered)
export class EmployerCreationHandler implements IEventHandler<EmployerRegistered> {
    handle(event: EmployerRegistered) {
        console.log(event)
    }
}