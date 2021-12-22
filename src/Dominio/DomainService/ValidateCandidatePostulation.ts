import { Candidate } from "../AggRoots/Candidate/Candidate";
import { Cv, CvState } from "../AggRoots/CV/cv.root";

export interface IValidateCandidatePostulation {
    canPostulate(candidate: Candidate, candidateCv?: Cv<CvState.Approved>): boolean
}

export class ValidateCandidatePostulation implements IValidateCandidatePostulation {
    canPostulate(_: Candidate, candidateCv?: Cv<CvState.Approved>): boolean {
        if (candidateCv) {
            return true
        }

        return false
    }

}
