import { InvalidEmployerRif } from '../Errors/InvalidEmployerRif.error';

export class EmployerRifVO {
  readonly value_employer_rif: String;

  private constructor(value_employer_rif: String) {
    this.value_employer_rif = value_employer_rif;
  }

  static Create(value_employer_rif: string) {
    if (!value_employer_rif || value_employer_rif.trim() == '') {
      throw InvalidEmployerRif.EmptyRif();
    }
    if (value_employer_rif[0] != 'J' && value_employer_rif[1] != '-') {
      throw InvalidEmployerRif.InvalidFormatRif();
    }
    if (value_employer_rif.length - 2 > 9) {
      throw InvalidEmployerRif.TooBigRif();
    }

    return new EmployerRifVO(value_employer_rif);
  }

  static Unsafe(value_employer_rif: string) {
    return new EmployerRifVO(value_employer_rif);
  }
}
