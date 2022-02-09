import { InvalidOfferDescription } from '../Errors/InvalidOfferDescription.error';

export class DescriptionVO {
  readonly value: string;
  private constructor(value: string) {
    if (!value || value.trim() == '') {
      throw InvalidOfferDescription.EmptyDescription();
    }
    if (value.length > 2000) {
      throw InvalidOfferDescription.TooBigDescription();
    }
    this.value = value;
  }

  static Create(value: string) {
    if (!value || value.trim() == '') {
      throw InvalidOfferDescription.EmptyDescription();
    }
    if (value.length > 2000) {
      throw InvalidOfferDescription.TooBigDescription();
    }
    return new DescriptionVO(value);
  }

  static Unsafe(value: string) {
    return new DescriptionVO(value);
  }
}
