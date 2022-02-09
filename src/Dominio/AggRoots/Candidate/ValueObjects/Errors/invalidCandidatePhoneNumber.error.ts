export class InvalidCandidatePhoneNumber extends Error {
  static emptyPhoneNumber() {
    return new InvalidCandidatePhoneNumber(
      'Candidate phone number cannot be empty',
    );
  }

  static hasCharacters() {
    return new InvalidCandidatePhoneNumber(
      ' Candidate Phone number can only contain numbers',
    );
  }

  static invalidLength(digits: Number) {
    return new InvalidCandidatePhoneNumber(
      ' Candidate Phone lenght has to be ' + digits + ' digits',
    );
  }

  static invalidAreaCode() {
    return new InvalidCandidatePhoneNumber(' The Area Code is invalid');
  }
}
