export class ApplicationDescription {
  public value: string;

  constructor(v: string) {
    if (v == null) {
      throw new TypeError('Application Description cannot be empty');
    }
    if (v.length >= 500) {
      throw new RangeError(
        'Application Description cannot have more than 500 characters',
      );
    }
    this.value = v;
  }
}
