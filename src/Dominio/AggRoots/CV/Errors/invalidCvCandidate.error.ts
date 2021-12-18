export class InvalidCvCandidate extends Error {
    static invalidId(id: string) {
        return new InvalidCvCandidate(`The id of the Candidate that submitted the CV is invalid: ${id}`)
    }
    static invalidBirthdate() {
        return new InvalidCvCandidate(`The birthdate of the Candidate that submitted the CV is cannot be grater than the today date`)
    }
}
