import { constants } from "../../../Core/Constants";
import { InvalidCandidateBirthDate } from "./Errors/invalidCandidateBirthDate.error";

export class CandidateBirthDateVo{
    private _birthDate: Date;

    constructor(birthDate:Date){
        if (this.birthDateValidate(birthDate)){
            this._birthDate = birthDate;
        }
    }

    get birthDate(): Date{
        return this._birthDate;
    }

    protected birthDateValidate(birthDate: Date){
        const today = new Date();
        if (birthDate == null || birthDate == undefined){
            throw  InvalidCandidateBirthDate.emptyBirthDate();
        }else if (birthDate > today){
            throw  InvalidCandidateBirthDate.birthDateAfterToday();
        }else if(!this.isOlderThan(constants.MIN_AGE, birthDate)){
            throw  InvalidCandidateBirthDate.candidateUnderAge(constants.MIN_AGE);
        }
        else{
            return true;
        }
    }

    isOlderThan(ageLimit: Number, birthDate: Date):boolean{
        const today = new Date();
        const userAge = today.getFullYear() - birthDate.getFullYear();
        if(userAge > ageLimit){
            return true;
        }else{
            return false;
        }
    }
}