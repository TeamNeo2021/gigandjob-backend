export class InvalidOfferRating extends Error {
  static EmptyRating() {
    return new InvalidOfferRating('ERROR: El rating está vacío');
  }

  static NegativeRating() {
    return new InvalidOfferRating('ERROR: El rating no debe ser menor a 0');
  }
}
