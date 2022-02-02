import { LikeOfferDTO } from 'src/Application/DTO/Offer/LikeOfferDTO.dto';
import { IOfferRepository } from 'src/Application/Repositories/OfferRepository.repo';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';

export class MockOfferRepo implements IOfferRepository {
  private Offers: Offer[] = [];

  async save(offer: Offer): Promise<void> {
    this.Offers.push(offer);
  }
  async load(id: OfferIdVO): Promise<Offer> {
    console.log('Me llegó este id:' + id);
    console.log('Mi longitud es:' + this.Offers.length);
    return this.Offers.find((offer) => offer._Id._value == id._value);
  }
  exists(id: OfferIdVO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  likeOffer(data: LikeOfferDTO) {
    throw new Error('Method not implemented.');
  }
}
