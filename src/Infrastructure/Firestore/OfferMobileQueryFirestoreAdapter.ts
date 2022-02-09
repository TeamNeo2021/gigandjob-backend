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
    //console.log("traigo tanga")
    const offerQuery = await this.offerRepository.get();
    //console.log(offerQuery.docs)
    return offerQuery.docs.map((offerDoc) => new OfferDTO(offerDoc.data()));
  }

  /*async getAll(): Promise<OfferDTO[]> {
    const Ofertas: OfferDTO[] = [];
    const offerQuery = await this.offerRepository.get();
    offerQuery.docs.map((offerDoc) =>
      Ofertas.push(new OfferDTO(offerDoc.data())),
    );
    return Ofertas;
  }*/
}
