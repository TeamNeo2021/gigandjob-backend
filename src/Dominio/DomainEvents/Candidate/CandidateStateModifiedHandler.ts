import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { CandidateStateModified } from "./CandidateStateModified";

export class CandidateStateModifiedHandler implements IDomainEventHandler{


    handle(event: CandidateStateModified, aggregate: Candidate): void {
        aggregate.state = CandidateStateVo.fromString(
            event.new_current);
        
    }

}

