export class EmployerMailVo {
    value: string;
    regex = RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
    
    constructor(value: string) {
      if (value == '') {
        throw new Error('ERROR: El email está vacío');
      }      
      
      if (this.regex.test(value)) {
        throw new Error('ERROR: no es un email valido');
      }
      
      this.value = value;
    }
}

  