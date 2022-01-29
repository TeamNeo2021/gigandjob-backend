import { InvalidCvDescriptionError } from "../Errors/invalidCvDescription.error"

export class CvDescription {

    private _description: string;

    get description(){
        return this._description
    }

    constructor(_description: string) {
        if (!_description || _description.trim() == "") throw InvalidCvDescriptionError.emptyDescription()
        else if (_description.length >= 500) throw InvalidCvDescriptionError.invalidDescriptionLength()
        this._description = _description
    }
}
