export class CandidateBirthDateVo{
    private _birthDate: Date;

    constructor(birthDate:Date){
        if (this.birthDateValidate(birthDate)){
            this._birthDate = birthDate;
        }
    }

    get birthDate(): String{
        return this.birthDate;
    }

    protected birthDateValidate(birthDate: Date): boolean{
        const today = new Date();
        if (birthDate == null || birthDate == undefined){
            throw new Error('Es necesario la fecha de nacimiento');
        }else if (birthDate > today){
            throw new Error('Usted no pueden nacer en el futuro. Por favor introduzca una fecha de nacimiento valida');
        }else{
            return true;
        }
    }
}