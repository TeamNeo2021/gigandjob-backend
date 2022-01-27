import { InvalidEmployerName } from "../Errors/InvalidEmployerName.error";

export class EmployerNameVO {
  value_name_employer: string;

  private constructor() {}

  static Create(value: string) {
    const name = new EmployerNameVO()
    if (!value || value.trim() == "") {
      throw InvalidEmployerName.EmptyName();
    }
    if (value.length > 20) {
      throw InvalidEmployerName.TooBigName();
    }
    name.value_name_employer = value;
    return name
  }

  static Unsafe(value: string) {
    const name = new EmployerNameVO()
    name.value_name_employer = value;
    return name
  }
}
