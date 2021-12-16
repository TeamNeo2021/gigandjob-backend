import { AggregateRoot } from "../AggRoots/AggregateRoot";
import { IDomainEvent } from "./IDomainEvent";
import { IDomainEventHandler } from "./IDomainEventHandler";

export class EmployerRegisteredHandler implements IDomainEventHandler{
    handle(event: IDomainEvent,entity: AggregateRoot):void{
        console.log('hola soy la estrategia')
    }
}