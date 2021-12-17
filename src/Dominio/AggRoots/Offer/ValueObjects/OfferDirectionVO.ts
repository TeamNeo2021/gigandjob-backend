export class DirectionVO {
    private readonly value: string;
    constructor(value: string) {
      if (value == '') {
        throw new Error('ERROR: La dirección está vacía');
      }
      this.value = value;
    }
  }