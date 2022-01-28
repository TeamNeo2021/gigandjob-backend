export class CouldNotFindEmployerError extends Error {
    constructor(inner: Error) {
        super(`Could not find employer: ${inner.message}`)
    }
}