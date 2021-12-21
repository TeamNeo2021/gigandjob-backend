import { IDomainEvent } from "../IDomainEvent";

export class CandidateStateModified implements IDomainEvent{
    dateTimeOcurred: Date;

    new_current: string;


    constructor(new_state: string){
        this.dateTimeOcurred = new Date();
        this.new_current = new_state;       
    }
}