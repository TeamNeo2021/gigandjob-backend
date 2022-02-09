import { InvalidEmployerMail } from '../Errors/InvalidEmployerMail.error';

export class EmployerMailVO {
  value_employer_mail: string;
  static pattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  private constructor(value: string) {
    this.value_employer_mail = value;
  }

  static Create(value: string) {
    if (!value || value.trim() == '') {
      throw InvalidEmployerMail.EmptyMail();
    }

    if (!this.pattern.test(value)) {
      throw InvalidEmployerMail.InvalidFormatMail();
    }

    return new EmployerMailVO(value);
  }

  static Unsafe(value: string) {
    return new EmployerMailVO(value);
  }
}
