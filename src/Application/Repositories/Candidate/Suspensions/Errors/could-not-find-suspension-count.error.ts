export class CouldNotFindSuspensionCountError extends Error {
  constructor(id: string) {
    super(`Could not find suspension count for candidate with id ${id}`);
  }
}
