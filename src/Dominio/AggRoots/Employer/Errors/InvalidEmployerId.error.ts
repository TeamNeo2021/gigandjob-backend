export class InvalidEmployerId extends Error {
  static EmptyId() {
    return new InvalidEmployerId('ERROR: El id está vacío');
  }

  static InvalidFormatId(id: string) {
    return new InvalidEmployerId(
      `ERROR: El formato del id es invalido  (id: ${id})`,
    );
  }
}
