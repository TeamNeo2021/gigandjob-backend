export class EliminateOfferFromEmployerEliminatedDTO {
  public id_employer: string;
  public date: Date;

  constructor(data: any) {
    this.id_employer = data.id_employer;
    this.date = data.date;
  }
}
