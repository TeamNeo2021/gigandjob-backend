import { IDomainEvent } from "../IDomainEvent";


export class EmployerModified implements IDomainEvent {

    public dateTimeOcurred: Date;
    

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());        
    }
}
