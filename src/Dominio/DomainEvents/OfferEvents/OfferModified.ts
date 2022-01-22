import { IDomainEvent } from "../IDomainEvent";

export class OfferModified implements IDomainEvent {

    public dateTimeOcurred: Date;    

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());        
    }
}
