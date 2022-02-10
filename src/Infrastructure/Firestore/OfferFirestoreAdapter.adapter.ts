import { CollectionReference } from '@google-cloud/firestore';
import { applyDecorators, Inject, Injectable } from '@nestjs/common';
import { LikeOfferDTO } from 'src/Application/DTO/Offer/LikeOfferDTO.dto';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { IOfferRepository } from 'src/Application/Repositories/OfferRepository.repo';
import { Application } from 'src/Dominio/AggRoots/Offer/Application/Application';
import { ApplicationStates } from 'src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferLocationVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { PublicationDateVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { OfferReportVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferReportVO';
import {
  Sectors,
  SectorVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import {
  OfferStatesEnum,
  OfferStateVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';

@Injectable()
export class OfferFirestoreAdapter implements IOfferRepository {
  constructor(
    @Inject('offers') private offerRepository: CollectionReference<OfferDTO>,
  ) {}

  async getAll(): Promise<OfferDTO[]> {
    const offerQuery = await this.offerRepository.get();
    return offerQuery.docs.map((offerDoc) => new OfferDTO(offerDoc.data()));
  }

  async save(offer: OfferDTO): Promise<void> {
    await this.offerRepository.doc(offer.OfferId).set(
      { ...offer,
        //applications:{...offer.applications}
      Direction: { ...offer.Direction },
       });
    //.set({ ...offer, Direction: { ...offer.Direction } }) 
    //Esto es necesario con todos los location u objetos que sean tipo personalizados AKA DTO,variables como location
  }

  async getOfferById(id_offer: string): Promise<OfferDTO> {
    /*const offerQuery = await this.offerRepository
        .where('id', '==', id_offer)
        .get(),
      offerResult = offerQuery.docs[0].data();

    if (!offerResult) return null;

    return new OfferDTO(offerResult);*/
    const offerQuery = await this.offerRepository.doc(id_offer).get();
    return new OfferDTO(offerQuery.data());
  }

  async exists(id_offer: string): Promise<boolean> {
    return (await this.offerRepository.doc(id_offer).get()).exists;
  }

  async likeOffer(data: LikeOfferDTO) {
    try {
      const userLike = await this.offerRepository
        .doc(data.id_offer)
        .collection('likes')
        .doc(data.id_candidate)
        .get();
      let likeOffer = userLike.data().isLiked ? false : true; //Si ya le dio like ahora se desactiva si no le ha dado like entonces le da like

      let result = await this.offerRepository
        .doc(data.id_offer)
        .collection('likes')
        .doc(data.id_candidate)
        .set({
          id_candidate: data.id_candidate,
          id_offer: data.id_offer,
          isLiked: likeOffer,
          date: new Date(),
        });

      return result;
    } catch (error) {
      console.log('OfferFirestoreAdapter: likeOffer error', error);
    }
  }
}
