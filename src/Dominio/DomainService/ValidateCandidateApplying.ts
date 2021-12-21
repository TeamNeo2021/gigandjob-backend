import { Candidate } from "../AggRoots/Candidate/Candidate";
import { CandidateStateVo, CandidateStatesEnum } from "../AggRoots/Candidate/ValueObjects/CandidateStateVo";

export class ValidateApplying{
    validate(candidate: Candidate): boolean{
        if (candidate.state === new CandidateStateVo(CandidateStatesEnum.Active)){
            return true;
        }else{
            return false;
        }
    }
}