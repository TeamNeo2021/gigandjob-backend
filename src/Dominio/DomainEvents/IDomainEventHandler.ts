import { AggregateRoot } from "../AggRoots/AggregateRoot";
import { IDomainEvent } from "./IDomainEvent";

export interface IDomainEventHandler{
    handle(event:IDomainEvent, aggregate:AggregateRoot):void
}