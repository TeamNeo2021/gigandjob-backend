export class InvalidCvDescriptionError extends Error {
  static emptyDescription() {
    return new InvalidCvDescriptionError('The cv description must no be empty');
  }
  static invalidDescriptionLength() {
    return new InvalidCvDescriptionError(
      'The cv description must be less than 500 characters',
    );
  }
}
