import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';
import { LikeOfferDTO } from 'src/Application/DTO/Offer/LikeOfferDTO.dto';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { IOfferRepository } from 'src/Application/Repositories/OfferRepository.repo';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';

export class MockOfferRepo implements IOfferRepository {
  constructor(public Offers: OfferDTO[] = []) {}

  getAll(): Promise<OfferDTO[]> {
    throw new Error('Method not implemented.');
  }
  clear()  {
    this.Offers = [];
  }

  async save(offer: OfferDTO): Promise<void> {    
    this.Offers.push(offer);
  }
  async getOfferById(id_offer: string): Promise<OfferDTO> {
    console.log('OfferREPO: getOfferById: Offer id:' + id_offer);
    console.log('Offer repo length:' + this.Offers.length);
    return this.Offers.find((offer) => offer.OfferId == id_offer);
  }
  exists(id: String): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  likeOffer(data: LikeOfferDTO) {
    throw new Error('Method not implemented.');
  }
}

