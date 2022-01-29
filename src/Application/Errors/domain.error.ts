export class DomainError extends Error {
    constructor(inner: Error) {
        super(`Error occured in the domain layer: ${inner.message}`)
    }
}