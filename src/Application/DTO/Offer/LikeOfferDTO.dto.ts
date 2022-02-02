export class LikeOfferDTO {
  public id_candidate: string;
  public id_offer: string;
  public date: Date;

  constructor(data: any) {
    this.id_candidate = data.id_candidate;
    this.id_offer = data.id_offer;
    this.date = data.date;
  }
}
