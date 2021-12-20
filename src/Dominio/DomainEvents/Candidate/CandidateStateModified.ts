import { IDomainEvent } from "../IDomainEvent";

export class CandidateStateModified implements IDomainEvent{
    dateTimeOcurred: Date;

    new_current: string;
    new_isApprobed: string;


    constructor(new_state: string, new_isApprobed: string){
        this.dateTimeOcurred = new Date();
        this.new_current = new_state;
        this.new_isApprobed = new_isApprobed
    }
}