import { IDomainEvent } from "../DomainEvents/IDomainEvent";


export interface IInternalEventHandler{
    Handle(event:IDomainEvent):void;
}