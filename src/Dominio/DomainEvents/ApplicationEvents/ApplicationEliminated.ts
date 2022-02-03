import { IDomainEvent } from "../IDomainEvent";

export class ApplicationEliminated implements IDomainEvent {

    public dateTimeOcurred: Date;    

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());        
    }
}