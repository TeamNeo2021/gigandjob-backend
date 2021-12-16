export class InvalidCvCandidateId extends Error {
    constructor(id: string) {
        super(`The id of the Candidate that submitted the CV is invalid: ${id}`)
    }
}
