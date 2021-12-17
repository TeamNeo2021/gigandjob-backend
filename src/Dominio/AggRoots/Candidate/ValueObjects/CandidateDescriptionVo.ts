export class CandidateDescriptionVo{
    private _description: String;

    constructor(description: String){
        if (this.descriptionValidate(description)){
            this._description = description;
        }
    }

    get description(): String{
        return this.description;
    }

    protected descriptionValidate(description: String): boolean{
        if (description == null || description == undefined){
            throw new Error('Es necesario una descripción');
        }else{
            return true;
        }
    }
}