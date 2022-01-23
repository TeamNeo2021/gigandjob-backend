export class CouldNotPublishEventsError extends Error {
    constructor(inner: Error) {
        super(`Could not publish events: ${inner.message}`)
    }
}