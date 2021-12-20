import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { IDomainEvent } from "../IDomainEvent";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { CandidateEliminated } from "./CandidateEliminated";

export class CandidateEliminatedHandler implements IDomainEventHandler {
    
    
    constructor() {
        
    }

    handle(event: CandidateEliminated, aggregate: Candidate): void {
        if (aggregate.state.state == CandidateStatesEnum.Eliminated){
            return console.log('candidate already eliminated')
        }
        aggregate.state = new CandidateStateVo(CandidateStatesEnum.Eliminated,CandidateStatesEnum.Unapproved)
    }
}