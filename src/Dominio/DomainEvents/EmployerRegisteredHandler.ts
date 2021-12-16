import { AggregateRoot } from "../AggRoots/AggregateRoot";
import { EmployerRegistered } from "./EmployerRegistered";
import { IDomainEvent } from "./IDomainEvent";
import { IDomainEventHandler } from "./IDomainEventHandler";

export class EmployerRegisteredHandler implements IDomainEventHandler{
    handle(event: EmployerRegistered,entity: AggregateRoot):void{
        console.log("hola soy el handler")
    }
}