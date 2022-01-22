export class InfrastructureError extends Error {
    constructor(inner: Error) {
        super(`Error occured in the infrastructure layer: ${inner.message}`)
    }
}