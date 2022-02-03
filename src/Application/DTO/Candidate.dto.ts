import { LocationDTO } from './Location.dto';

export class CandidateDTO {
  public id: string;
  public state: String;
  public name: String;

  public phone: String;
  public email: String;
  public birthDate: Date;
  public location: LocationDTO;

  constructor(candidateData: any) {
    this.id = candidateData.id;
    this.state = candidateData.state;
    this.name = candidateData.name;
    this.phone = candidateData.phone;
    this.email = candidateData.email;
    this.birthDate = candidateData.birthDate;
    this.location = new LocationDTO(candidateData.location);
  }
}
