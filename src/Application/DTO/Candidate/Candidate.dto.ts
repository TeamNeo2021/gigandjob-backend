import { LocationDTO } from "../Location.dto";

export class CandidateDTO {
  public candidateId: string;
  public state: string;
  public name: string;
  public phone: string;
  public email: string;
  public birthDate: Date;
  public location: LocationDTO;

  constructor(candidateData: any) {
    this.candidateId = candidateData.candidateId;
    this.state = candidateData.state;
    this.name = candidateData.name;
    this.phone = candidateData.phone;
    this.email = candidateData.email;
    this.birthDate = candidateData.birthDate;
    this.location = new LocationDTO(candidateData.location);
  }
}
