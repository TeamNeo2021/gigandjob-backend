export class EmptyMeetingDateError extends Error {
    constructor() { super("Meeting date must not be empty") }
}
