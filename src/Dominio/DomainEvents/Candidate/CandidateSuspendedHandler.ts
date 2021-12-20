import { IDomainEvent } from "../IDomainEvent";
import { IDomainEventHandler } from "../IDomainEventHandler";

export class CandidateSuspendedHandler implements IDomainEventHandler{
    handle(event: IDomainEvent, aggregate: Object): void {
        console.log('candidate suspended')
    }
}