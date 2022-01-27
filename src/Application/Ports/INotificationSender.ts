import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";

export interface INotificationSender{
    send(target: string, event: IDomainEvent):void;
}