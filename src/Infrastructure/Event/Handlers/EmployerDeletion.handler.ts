import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmployerEliminated } from "src/Dominio/DomainEvents/EmployerEvents/EmployerEliminated";

@EventsHandler(EmployerEliminated)
export class EmployerDeletionHandler implements IEventHandler<EmployerEliminated> {
    handle(event: EmployerEliminated) {
        console.log(event)
    }
} 