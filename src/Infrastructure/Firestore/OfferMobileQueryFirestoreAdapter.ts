import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { OfferMobileQueryModel } from 'src/Application/QueryModels/offer_mobile';

@Injectable()
export class OfferQueryFirestoreAdapter implements OfferMobileQueryModel {
  constructor(
    @Inject('offers') private offerRepository: CollectionReference<OfferDTO>,
  ) {}

  async getAll(): Promise<OfferDTO[]> {
    const offerQuery = await this.offerRepository.get();
    return offerQuery.docs.map((offerDoc) => new OfferDTO(offerDoc.data()));
  }

  async getOne(id: string): Promise<OfferDTO> {
    const offerQuery = await this.offerRepository.doc(id).get();
    return new OfferDTO(offerQuery.data());

  }

}
