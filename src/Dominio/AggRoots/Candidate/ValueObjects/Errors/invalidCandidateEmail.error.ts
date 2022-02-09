export class InvalidCandidateEmail extends Error {
  static emptyEmail() {
    return new InvalidCandidateEmail('Candidate email cannot be empty');
  }

  static invalidEmail() {
    return new InvalidCandidateEmail(' Candidate email format is invalid');
  }
}
