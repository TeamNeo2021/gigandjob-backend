import { Candidate } from "../AggRoots/Candidate/Candidate"
import { CandidateStatesEnum, CandidateStateVo } from "../AggRoots/Candidate/ValueObjects/CandidateStateVo"
import { Meeting } from "../AggRoots/Meeting/Meeting"

export class ValidateCandidateSuspended{
    validate(candidate: Candidate): boolean{
        if (candidate.state === new CandidateStateVo(CandidateStatesEnum.Suspended, CandidateStatesEnum.Unapproved) ||
            candidate.state === new CandidateStateVo(CandidateStatesEnum.Suspended, CandidateStatesEnum.Approbed)){
            return false
        }
        return true
    }
}