export class CouldNotGetSuspensionLimitError extends Error {
    constructor(inner: Error) {
        super(`Could not fetch suspension limit: ${inner.message}`)
    }
}