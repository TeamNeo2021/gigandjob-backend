import { InvalidOfferDirection } from "../Errors/InvalidOfferDirection.error";

export class DirectionVO {
    readonly value: string;
    private constructor(value: string) {
      if (!value || value.trim() == "") {
        throw InvalidOfferDirection.EmptyDirection();
      }
      this.value = value;
    }

    static Create(value: string) {
      if (!value || value.trim() == "") {
        throw InvalidOfferDirection.EmptyDirection();
      }
      return new DirectionVO(value)
    }

    static Unsafe(value: string) {
      return new DirectionVO(value)
    }
  }