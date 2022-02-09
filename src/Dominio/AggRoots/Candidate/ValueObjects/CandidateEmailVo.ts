import { InvalidCandidateEmail } from './Errors/invalidCandidateEmail.error';

export class CandidateEmailVo {
  private _email: String;

  constructor(email: String) {
    if (this.emailValidate(email)) {
      this._email = email;
    }
  }

  get email(): String {
    return this._email;
  }

  protected emailValidate(email: String) {
    const emailPatten =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
      throw InvalidCandidateEmail.emptyEmail();
    }

    if (emailPatten.test(email.toString())) {
      return true;
    } else {
      throw InvalidCandidateEmail.invalidEmail();
    }
  }
}
