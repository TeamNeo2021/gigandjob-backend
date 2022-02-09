import { CandidateStatesEnum } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { LocationDTO } from "../Location.dto";

type CandidateDTOConstructorParams = {
  candidateId: string,
  name: string,
  lastname: string,
  state: CandidateStatesEnum,
  phone: string,
  email: string,
  birthdate: Date,
  location: {
    latitude: number,
    longitude: number
  }
}

export class CandidateDTO {
  public candidateId: string;
  public state: string;
  public name: string;
  public lastname: string;
  public phone: string;
  public email: string;
  public birthDate: Date;
  public location: LocationDTO;

  constructor(candidateData: CandidateDTOConstructorParams) {
    this.candidateId = candidateData.candidateId;
    this.state = CandidateStatesEnum[candidateData.state];
    this.name = candidateData.name;
    this.lastname = candidateData.lastname;
    this.phone = candidateData.phone;
    this.email = candidateData.email;
    this.birthDate = candidateData.birthdate;
    this.location = new LocationDTO(candidateData.location);
  }
}
