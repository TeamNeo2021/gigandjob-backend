export class EmployerComercialDesignationVO {
    value: string;
    constructor(value: string) {
      if (value == '') {
        throw new Error('ERROR: la denominación comercial está vacía');
      }
      if (value.length > 50) {
        throw new Error('ERROR: La denominación comercial no debe ser mayor a 50 caracteres');
      }
      this.value = value;
    }
  }