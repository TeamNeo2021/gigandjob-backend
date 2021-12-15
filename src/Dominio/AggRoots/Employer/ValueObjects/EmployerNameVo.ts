export class EmployerNameVo {
  value: string;
  constructor(value: string) {
    if (value == '') {
      throw new Error('ERROR: El nombre está vacío');
    }
    if (value.length > 20) {
      throw new Error('ERROR: El nombre no debe ser mayor a 10 caracteres');
    }
    this.value = value;
  }
}
