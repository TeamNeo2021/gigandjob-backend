import { InvalidOfferDescription } from "../Errors/InvalidOfferDescription.error";

export class DescriptionVO {
    private readonly value: string;
    constructor(value: string) {
      if (value == '') {
        throw InvalidOfferDescription.EmptyDescription();
      }
      if (value.length > 2000) {
        throw InvalidOfferDescription.TooBigDescription();
      }
      this.value = value;
    }
  }