export class InvalidMeetingIdError extends Error {
  constructor(id: String) {
    super(`The provided id was not valid (id: ${id})`);
  }
}
