import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { IDomainEvent } from "../IDomainEvent";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { CandidateEliminated } from "./CandidateEliminated";

export class CandidateEliminatedHandler implements IDomainEventHandler {
    
    
    constructor() {
        
    }

    handle(event: CandidateEliminated, aggregate: Candidate): void {
        aggregate.state = new CandidateStateVo(CandidateStatesEnum.Eliminated,CandidateStatesEnum.Unapproved)
    }
}