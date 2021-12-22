import { Candidate } from "../AggRoots/Candidate/Candidate";
import { CandidateStatesEnum } from "../AggRoots/Candidate/ValueObjects/CandidateStateVo";

export interface IValidateCandidateCvRevisionRequest {
    canRequestCvRevision(candidate: Candidate): boolean
}

export class ValidateCandidateCvRevisionRequest implements IValidateCandidateCvRevisionRequest {
    canRequestCvRevision(candidate: Candidate) {
        if (candidate.state.state == CandidateStatesEnum.Suspended) return false

        return true
    }

}
