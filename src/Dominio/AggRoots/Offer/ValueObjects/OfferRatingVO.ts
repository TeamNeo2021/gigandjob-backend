export class RatingVO {
    private readonly value: boolean;
    constructor(value: boolean) {
      if (value == null) {
        throw new Error('ERROR: El rating está vacío');
      }
      this.value = value;
    }
  }