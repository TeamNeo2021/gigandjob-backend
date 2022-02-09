export class InvalidMeetingDescriptionError extends Error {
  static emptyDescription() {
    return new InvalidMeetingDescriptionError(
      'The meeting description must no be empty',
    );
  }
  static invalidDescriptionLength() {
    return new InvalidMeetingDescriptionError(
      'The meeting description must be less than 250 characters',
    );
  }
}
