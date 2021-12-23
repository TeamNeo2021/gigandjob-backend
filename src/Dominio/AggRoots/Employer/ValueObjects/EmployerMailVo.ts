import { InvalidEmployerMail } from "../Errors/InvalidEmployerMail.error";

export class EmployerMailVO {
    value_employer_mail: string;
    pattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    constructor(value: string) {
      if (!value || value.trim() == "") {
        throw InvalidEmployerMail.EmptyMail();
      }      
      
      if (!this.pattern.test(value)) {
        throw InvalidEmployerMail.InvalidFormatMail();
      }
      
      this.value_employer_mail = value;
    }
}

  