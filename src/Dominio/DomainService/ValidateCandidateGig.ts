import { Candidate } from "../AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { Application } from "../AggRoots/Offer/Application/Application";
import { Offer } from "../AggRoots/Offer/Offer";

export class ValidateCandidateGig{
    validate (candidate: Candidate, application: Application): boolean{
        if (candidate.Id == application.getCandidateId() ){
            return true;
        }
        return false;
    }
}