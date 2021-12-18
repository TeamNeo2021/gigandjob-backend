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
        }else{
            return true;
        }
    }
}