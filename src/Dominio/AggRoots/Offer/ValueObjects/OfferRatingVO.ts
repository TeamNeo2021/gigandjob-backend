import { InvalidOfferRating } from "../Errors/InvalidOfferRating.error";

export class RatingVO {
    private readonly value: number;
  
    constructor(value: number) {
        if (value == null) {
            throw InvalidOfferRating.EmptyRating();
        }
        if (value < 0) {
            throw InvalidOfferRating.NegativeRating();
        }
      this.value = value;
    }
  }