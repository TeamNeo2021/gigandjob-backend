export class InvalidOfferDirection extends Error {
  static EmptyDirection() {
    return new InvalidOfferDirection('ERROR: La dirección está vacía');
  }
  static coordinateNull() {
    return new InvalidOfferDirection('Coordinate cannot be null');
  }
  static latitudeOutOfRange() {
    return new InvalidOfferDirection(
      'Latitude is out of range, possible values [-90,90]',
    );
  }
  static longitudeOutOfRange() {
    return new InvalidOfferDirection(
      'Longitude is out of range, possible values [-180,180]',
    );
  }
}
