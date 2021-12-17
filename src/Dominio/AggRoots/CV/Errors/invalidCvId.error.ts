export class InvalidCVIdError extends Error {
    constructor(id: string) {
        super(`The provided id was not valid (id: ${id})`)
    }
}
