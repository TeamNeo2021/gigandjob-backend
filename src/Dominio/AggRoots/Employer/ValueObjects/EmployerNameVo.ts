import { InvalidEmployerName } from "../Errors/InvalidEmployerName.error";

export class EmployerNameVO {
  value_name_employer: string;
  constructor(value: string) {
    if (!value || value.trim() == "") {
      throw InvalidEmployerName.EmptyName();
    }
    if (value.length > 20) {
      throw InvalidEmployerName.TooBigName();
    }
    this.value_name_employer = value;
  }
}
