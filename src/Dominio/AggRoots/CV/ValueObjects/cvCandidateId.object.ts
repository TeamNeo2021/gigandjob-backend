import { randomUUID } from "crypto"
import { InvalidCvCandidateId } from "../Errors/invalidCvCandidateId.error"

export class CvCandidateId {
    _id: string

    get id() { return this._id }

    constructor(id: string = randomUUID()) {
        if (!id || id.trim() == "") throw new InvalidCvCandidateId(id)
        this._id = id
    }
}
