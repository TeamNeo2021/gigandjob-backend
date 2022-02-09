import { InvalidOfferRating } from '../Errors/InvalidOfferRating.error';

export class RatingVO {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static Create(value: number) {
    if (value == null) {
      throw InvalidOfferRating.EmptyRating();
    }
    if (value < 0) {
      throw InvalidOfferRating.NegativeRating();
    }

    return new RatingVO(value);
  }

  static Unsafe(value: number) {
    return new RatingVO(value);
  }
}
