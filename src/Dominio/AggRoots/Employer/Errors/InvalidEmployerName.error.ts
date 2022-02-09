export class InvalidEmployerName extends Error {
  static EmptyName() {
    return new InvalidEmployerName('ERROR: El nombre está vacío');
  }

  static TooBigName() {
    return new InvalidEmployerName(
      'ERROR: El nombre no debe ser mayor a 20 caracteres',
    );
  }
}
