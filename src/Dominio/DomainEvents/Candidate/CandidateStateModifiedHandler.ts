import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";

import { IDomainEventHandler } from "../IDomainEventHandler";
import { CandidateStateModified } from "./CandidateStateModified";

export class CandidateStateModifiedHandler implements IDomainEventHandler{


    handle(event: CandidateStateModified, aggregate: Candidate): void {
        aggregate.state = new CandidateStateVo(event.new_current_state);
        
    }

}