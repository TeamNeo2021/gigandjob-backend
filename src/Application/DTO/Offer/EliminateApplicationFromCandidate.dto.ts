export class EliminateApplicationFromCandidateDTO {
  public id_candidate: string;
  public date: Date;

  constructor(data: any) {
    this.id_candidate = data.id_employer;
    this.date = data.date;
  }
}
