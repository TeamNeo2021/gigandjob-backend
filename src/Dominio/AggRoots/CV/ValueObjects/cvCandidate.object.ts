import { InvalidCvCandidate } from '../Errors/invalidCvCandidate.error';

const UUID_FORMAT =
  /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;

export class CvCandidate {
  private _id: string;
  private _birthdate: Date;

  get id() {
    return this._id;
  }
  get birthdate() {
    return this._birthdate;
  }

  constructor(id: string, birthdate: Date) {
    if (!id || id.trim() == '') throw InvalidCvCandidate.invalidId(id);
    if (!id.match(UUID_FORMAT)) throw InvalidCvCandidate.invalidId(id);
    if (birthdate.getTime() >= Date.now())
      throw InvalidCvCandidate.invalidBirthdate();
    this._id = id;
    this._birthdate = birthdate;
  }
}
