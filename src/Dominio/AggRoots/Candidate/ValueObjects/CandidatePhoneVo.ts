import { InvalidCandidatePhoneNumber } from './Errors/invalidCandidatePhoneNumber.error';
import { constants } from '../../../Core/Constants';

export class CandidatePhoneVo {
  //siento que deberiamos formatear este VO para que sea parametrizado, dependiendo del area tendra una lista de codigos de area posibles y un formato especifico. --Moncada

  private _areaCode: String;

  private _phone: String;

  constructor(areaCode: String, phone: String) {
    if (this.areaCodeValidate(areaCode) && this.phoneValidate(phone)) {
      this._areaCode = areaCode;
      this._phone = phone;
    }
  }

  get phoneNumber(): String {
    return this._phone;
  }

  public get areaCode(): String {
    return this._areaCode;
  }
  public set areaCode(value: String) {
    this._areaCode = value;
  }

  //chamo te falta validar el numero de caracteres que puede tener ese numero de telefono ---Moncada

  protected phoneValidate(phone: String): boolean {
    if (phone === null || phone === '' || phone === undefined) {
      throw InvalidCandidatePhoneNumber.emptyPhoneNumber();
    } else if (isNaN(Number(phone))) {
      throw InvalidCandidatePhoneNumber.hasCharacters();
    } else if (phone.length != constants.PHONE_LENGHT) {
      throw InvalidCandidatePhoneNumber.invalidLength(constants.PHONE_LENGHT);
    } else {
      return true;
    }
  }

  protected areaCodeValidate(code): boolean {
    if (code === null || code === '' || code === undefined) {
      throw InvalidCandidatePhoneNumber.emptyPhoneNumber();
    } else if (isNaN(Number(code))) {
      throw InvalidCandidatePhoneNumber.hasCharacters();
    } else if (constants.AREA_CODES.indexOf(code) == undefined) {
      throw InvalidCandidatePhoneNumber.invalidAreaCode();
    } else {
      return true;
    }
  }
}
