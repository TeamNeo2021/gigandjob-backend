import { IOfferRepository } from 'src/Application/Repositories/OfferRepository.repo';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';

export class MockOfferRepo implements IOfferRepository {
  private Offers: Offer[] = [];

  save(offer: Offer): Promise<void> {
    return this.Offers.push(offer);
  }
  load(id: OfferIdVO): Promise<Offer> {
    return this.Offers.find((offer) => offer.id == id);
  }
  exists(id: OfferIdVO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  likeOffer(data: LikeOfferDTO) {
    throw new Error('Method not implemented.');
  }
}
