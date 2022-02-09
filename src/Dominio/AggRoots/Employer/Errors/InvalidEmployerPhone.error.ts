export class InvalidEmployerPhone extends Error {
  static EmptyPhone() {
    return new InvalidEmployerPhone('ERROR: El teléfono está vacío');
  }

  static InvalidFormatPhone() {
    return new InvalidEmployerPhone(
      'ERROR: El teléfono debe comenzar con el signo +',
    );
  }

  static TooBigPhone() {
    return new InvalidEmployerPhone(
      'ERROR: El teléfono no debe tener mas de 15 digitos',
    );
  }
}
