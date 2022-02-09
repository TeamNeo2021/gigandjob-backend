export class CandidateRegisterDTO {
  public name: string;
  public lastname: string;
  public phoneCode: string;
  public phoneNumber: string;
  public email: string;
  public birthDate: string;
  public latitude: Number;
  public longitude: Number;
  constructor(
    name: string,
    lastname: string,
    phoneCode: string,
    phoneNumber: string,
    email: string,
    birthDate: string,
    latitude: Number,
    longitude: Number,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.phoneCode = phoneCode;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.email = email;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
