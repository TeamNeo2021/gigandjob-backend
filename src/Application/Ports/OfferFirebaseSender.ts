import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { INotificationSender } from "./INotificationSender";

export class OfferFirebaseSender implements INotificationSender{
    send(target: string, event: IDomainEvent): void {
        switch(event.constructor){

        }
    }
}