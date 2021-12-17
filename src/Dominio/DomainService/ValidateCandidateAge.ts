import { CandidateBirthDateVo } from "../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";

export class ValidateCandidateAge{
    validate(ageLimit: Number, candidateBirth: CandidateBirthDateVo):boolean{
        const today = new Date();
        const userAge = today.getFullYear() - candidateBirth.birthDate.getFullYear();
        if(userAge > ageLimit){
            return true;
        }else{
            throw new Error('User cannot be registered, age is under '+ageLimit+' years old');
            return false;
        }
    }


}