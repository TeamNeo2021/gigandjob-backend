export class OfferIdVO {
    value: string;
  
    constructor(value: string) {
      this.value = value;
    }

    public get _value(): string {
        return this.value;
    }
  }