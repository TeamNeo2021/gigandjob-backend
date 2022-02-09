export class InvalidCandidateLocationError extends Error {
  static coordinateNull() {
    return new InvalidCandidateLocationError('Coordinate cannot be null');
  }
  static latitudeOutOfRange() {
    return new InvalidCandidateLocationError(
      'Latitude is out of range, possible values [-90,90]',
    );
  }
  static longitudeOutOfRange() {
    return new InvalidCandidateLocationError(
      'Longitude is out of range, possible values [-180,180]',
    );
  }
}
