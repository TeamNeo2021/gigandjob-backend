export class EmptyCvPhotoError extends Error {
  constructor() {
    super('CV photo must not be empty');
  }
}
