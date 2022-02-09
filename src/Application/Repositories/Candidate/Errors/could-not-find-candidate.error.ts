export class CouldNotFindCandidateError extends Error {
  constructor(private id: string) {
    super(`Could not find candidate with id: ${id}`);
  }
}
