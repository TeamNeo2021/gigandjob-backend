import { InvalidCvDescriptionError } from "../Errors/invalidCvDescription.error"

export class CvDescription {
    constructor(_description: string) {
        if (!_description || _description.trim() == "") throw InvalidCvDescriptionError.emptyDescription()
        else if (_description.length < 500) throw InvalidCvDescriptionError.invalidDescriptionLength()
    }
}
