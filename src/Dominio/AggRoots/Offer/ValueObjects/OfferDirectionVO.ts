import { InvalidOfferDirection } from "../Errors/InvalidOfferDirection.error";

export class DirectionVO {
    private readonly value: string;
    constructor(value: string) {
      if (value == '') {
        throw InvalidOfferDirection.EmptyDirection();
      }
      this.value = value;
    }
  }