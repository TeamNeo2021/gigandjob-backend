import { IDomainEvent } from "../IDomainEvent";

export class OfferEliminated implements IDomainEvent {

    public dateTimeOcurred: Date;    

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());        
    }
}