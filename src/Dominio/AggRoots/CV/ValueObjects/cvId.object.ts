import { randomUUID } from "crypto";
import { InvalidCVIdError } from "../Errors/invalidCvId.error";

export class CvId {
    _id: string

    get id() { return this._id }

    constructor(id: string = randomUUID()) {
        if (!id || id.trim() == "") throw new InvalidCVIdError(id)
        this._id = id
    }
}
