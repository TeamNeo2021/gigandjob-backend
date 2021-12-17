import { CandidateBirthDateVo } from "../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { InvalidCandidateBirthDate } from "../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error";

export class ValidateCandidateAge{
    validate(ageLimit: Number, candidateBirth: CandidateBirthDateVo):boolean{
        const today = new Date();
        const userAge = today.getFullYear() - candidateBirth.birthDate.getFullYear();
        if(userAge > ageLimit){
            return true;
        }else{
            throw  InvalidCandidateBirthDate.candidateUnderAge(ageLimit)
            return false;
        }
    }


}