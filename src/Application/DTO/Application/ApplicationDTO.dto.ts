import { ApplicationStates } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates";

type ApplicationDTOConstructorData = {
    applicationId: string,
    candidateId: string,
    state: ApplicationStates,
    previous_state: ApplicationStates,
    budget: number,
    description: string,
    duration_days: number
}

export class ApplicationDTO {
  public applicationId: string
  public state: ApplicationStates
  public candidateId: string
  public previous_state: ApplicationStates
  public budget: number
  public description: string
  public duration_days: number

  constructor(
    data: ApplicationDTOConstructorData
  ) {
    this.applicationId = data.applicationId
    this.candidateId = data.candidateId
    this.state = data.state
    this.previous_state=  data.previous_state
    this.budget = data.budget
    this.description = data.description
    this.duration_days = data.duration_days;
  }
}

type ApplyToOfferDTOConstructorData  = {
  offerId: string,
  employerId: string,
  candidateId: string,
  state: ApplicationStates,
  budget: number,
  description: string,
  duration_days: number
}

export class ApplyToOfferDTO {
  // public  applicationId: string;
  public offerId: string;
  public employerId: string;
  public candidateId: string;
  public state: ApplicationStates;
  //public previous_state: string;
  public budget: number;
  public description: string;
  public duration_days: number;

  constructor(applicationData: ApplyToOfferDTOConstructorData) {
    // this.applicationId = applicationData.id;
    this.candidateId = applicationData.candidateId;
    this.offerId = applicationData.offerId;
    this.employerId = applicationData.employerId;
    this.state = applicationData.state;
    // this.previous_state = applicationData.previous_state;
    this.budget = applicationData.budget;
    this.description = applicationData.description;
    this.duration_days = applicationData.duration_days;
  }
}
