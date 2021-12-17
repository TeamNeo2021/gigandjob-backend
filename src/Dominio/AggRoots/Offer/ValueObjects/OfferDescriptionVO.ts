export class DescriptionVO {
    private readonly value: string;
    constructor(value: string) {
      if (value == '') {
        throw new Error('ERROR: El nombre está vacío');
      }
      if (value.length > 2000) {
        throw new Error('ERROR: El nombre no debe ser mayor a 2000 caracteres');
      }
      this.value = value;
    }
  }