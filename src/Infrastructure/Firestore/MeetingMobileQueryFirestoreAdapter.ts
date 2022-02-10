import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { MeetingDTO } from 'src/Application/DTO/Meeting/Meeting.dto';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { MeeetingQueryModel } from 'src/Application/QueryModels/MeetingQueryModel';
import { OfferMobileQueryModel } from 'src/Application/QueryModels/offer_mobile';

@Injectable()
export class MeetingQueryFirestoreAdapter implements MeeetingQueryModel {
  constructor(
    @Inject('Meetings') private collection: CollectionReference<MeetingDTO>,
  ) {}

        async getAll(candidateId: string): Promise<MeetingDTO[]> {
            try {
                    console.log(candidateId)
                    let candidateMeetingDocs = await (await this.collection.where('CandidateId', '==', candidateId).get()).docs;
                    console.log('MeeetingFirestoreAdapter: getAllCandidateMeetings candidateMeetingDocs: ', candidateMeetingDocs);
                    let candidateMeetingsList = candidateMeetingDocs.map(doc => {
                        console.log('getAllCandidateMeetings ...mapping doc: ', doc);
                         return new MeetingDTO(doc.data())
                         });
                    console.log('MeeetingFirestoreAdapter: getAllCandidateMeetings candidateMeetingsList: ', candidateMeetingsList);
                    return candidateMeetingsList;
            } catch (error) {
                //console.log('MeeetingFirestoreAdapter: Error at getAllCandidateMeetings: ',error);
                throw new Error('MeeetingFirestoreAdapter: Error at getAllCandidateMeetings: '+error);
            }
    }

  /*async getAll(): Promise<OfferDTO[]> {
    const offerQuery = await this.offerRepository.get();
    return offerQuery.docs.map((offerDoc) => new OfferDTO(offerDoc.data()));
  }

  async getOne(id: string): Promise<OfferDTO> {
    const offerQuery = await this.offerRepository.doc(id).get();
    return new OfferDTO(offerQuery.data());

  }*/

}