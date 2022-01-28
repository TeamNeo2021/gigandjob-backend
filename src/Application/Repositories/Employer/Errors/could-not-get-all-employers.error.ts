export class CouldNotGetAllEmployersError extends Error {
    constructor(inner: Error) {
        super(`Could not get all employers: ${inner.message}`)
    }
}