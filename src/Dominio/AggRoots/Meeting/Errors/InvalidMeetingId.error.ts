export class InvalidMeetingIdError extends Error {
    constructor(id: string) {
        super(`The provided id was not valid (id: ${id})`)
    }
}