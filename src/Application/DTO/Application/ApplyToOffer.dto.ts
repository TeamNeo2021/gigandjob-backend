export class ApplyToOfferDTO {
  public OfferId: string;
  public CandidateId: string;
  public budget: number;
  public description: string;
  public time: number;

  constructor(
    OfferId: string,
    CandidateId: string,
    budget: number,
    description: string,
    time: number,
  ) {
    this.OfferId = OfferId;
    this.CandidateId = CandidateId;
    this.budget = budget;
    this.description = description;
    this.time = time;
  }
}