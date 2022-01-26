import { IDomainEvent } from "../IDomainEvent";

export class OfferSuspended implements IDomainEvent {

    public dateTimeOcurred: Date;    

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());        
    }
}