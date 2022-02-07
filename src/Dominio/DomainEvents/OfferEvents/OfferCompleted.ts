import { IDomainEvent } from "../IDomainEvent";

export class OfferCompleted implements IDomainEvent {
    dateTimeOcurred: Date;

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());
    }
}