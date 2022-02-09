export class InvalidReporterIdError extends Error {
  constructor(id: string) {
    super(`Id: ${id} is not a valid id`);
  }
}
