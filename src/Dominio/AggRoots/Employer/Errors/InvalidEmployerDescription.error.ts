export class InvalidEmployerDescription extends Error {
  static EmptyDescription() {
    return new InvalidEmployerDescription('ERROR: La descripcion está vacía');
  }

  static TooBigDescription() {
    return new InvalidEmployerDescription(
      'ERROR: La descripcion no debe ser mayor a 500 caracteres',
    );
  }
}
