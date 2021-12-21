import { CandidateStatesEnum } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { IDomainEvent } from "../IDomainEvent";

export class CandidateStateModified implements IDomainEvent{
    dateTimeOcurred: Date;

    new_current_state: CandidateStatesEnum;
    


    constructor(new_state: CandidateStatesEnum){
        this.dateTimeOcurred = new Date();
        this.new_current_state = new_state;
    }
}