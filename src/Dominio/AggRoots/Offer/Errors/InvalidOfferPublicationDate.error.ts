export class InvalidOfferPublicationDate extends Error {
  static EmptyPublication() {
    return new InvalidOfferPublicationDate('ERROR: La fecha está vacía');
  }
}
