import { Candidate } from "../AggRoots/Candidate/Candidate";

export class ValidateCandidateCI{
    validate(candidate: Candidate, candidates: Candidate[]): boolean{
        let flag:boolean;
        for (let candidatesCI of candidates){
            if (candidatesCI.Id === candidate.Id){
                return true;
            }
            flag = false;
        }
        return flag;
    }
}