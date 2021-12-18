export class CandidateDescriptionVo{
    private _description: String;

    constructor(description: String){
        this._description = description;
    }

    get description(): String{
        return this.description;
    }
}