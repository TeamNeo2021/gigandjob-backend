export class ApplyToOfferDTO {
  // public  applicationId: string;
  public offerId: string;
  public employerId: string;
  public candidateId: string;
  public state: string;
  //public previous_state: string;
  public budget: number;
  public description: string;
  public duration_days: number;

  constructor(applicationData: any) {
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
