import { IDomainEvent } from "../IDomainEvent";

export class OfferEliminited implements IDomainEvent {
    dateTimeOcurred: Date;

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());
    }
}