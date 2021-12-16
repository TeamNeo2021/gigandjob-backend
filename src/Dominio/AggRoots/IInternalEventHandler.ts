import { IDomainEvent } from "../DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "../DomainEvents/IDomainEventHandler";

export interface IInternalEventHandler{
    Handle(event:IDomainEvent, handler: IDomainEventHandler):void;
}