export class InvalidEmployerLocation extends Error {
  static EmptyDirection() {
    return new InvalidEmployerLocation('ERROR: La dirección está vacía');
  }
  static coordinateNull() {
    return new InvalidEmployerLocation('Coordinate cannot be null');
  }
  static latitudeOutOfRange() {
    return new InvalidEmployerLocation(
      'Latitude is out of range, possible values [-90,90]',
    );
  }
  static longitudeOutOfRange() {
    return new InvalidEmployerLocation(
      'Longitude is out of range, possible values [-180,180]',
    );
  }
}
