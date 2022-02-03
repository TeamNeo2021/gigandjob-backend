import { CollectionReference } from "@google-cloud/firestore";
import { applyDecorators, Inject, Injectable } from "@nestjs/common";
import { LikeOfferDTO } from "src/Application/DTO/Offer/LikeOfferDTO.dto";
import { IOfferRepository } from "src/Application/Repositories/OfferRepository.repo";
import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { ApplicationStates } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { OfferReportVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferReportVO";
import { Sectors, SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";

type ApplicationEntity = { 
    id: string, 
    state: string, 
    candidateId: string, 
    previous_state: string, 
    budget: number, 
    description: string, 
    time: number 
}

type OfferEntity = {
    id: string,
    state: string,
    publicationDate: Date,
    rating: number,
    direction: string,
    sector: string,
    budget: number,
    description: string,
    reports: readonly { reporterId: string, reason: string }[],
    applications: readonly ApplicationEntity[]
}

@Injectable()
export class OfferFirestoreRepository implements IOfferRepository{
    constructor(@Inject('offers') private offerRepository: CollectionReference<OfferEntity>) {}

    async save(offer: Offer): Promise<void> {
        await this.offerRepository.doc(offer._Id._value).set({
            id: offer._Id._value,
            state: offer._State.state.toString(),
            publicationDate: offer._PublicationDate.value,
            rating: offer._Rating.value,
            direction: offer._Direction.value,
            sector: offer._Sector.value.toString(),
            budget: offer._Budget.value,
            description: offer._Description.value,
            reports: offer.Reports.map(r => ({ reporterId: r.reporterId, reason: r.reason})),
            applications: offer._application.map(app => ({
                id: app.guid.value,
                description: app.getDescription().value,
                candidateId: app.getCandidateId().value,
                budget: app.getBudget.value,
                time: app.getTime().days,
                previous_state: ApplicationStates[app.getPreviousState()],
                state: ApplicationStates[app.getState()]
            }))
        })
    }
    async load(id: OfferIdVO): Promise<Offer> {
        const offerQuery = await this.offerRepository.where('id', '==', id._value).get(),
              offerResult = offerQuery.docs[0].data()

        if (!offerResult) return null

        const offer = new Offer(
            new OfferIdVO(offerResult.id),
            new OfferStateVO(OfferStatesEnum[offerResult.state]),
            PublicationDateVO.Unsafe(offerResult.publicationDate),
            RatingVO.Unsafe(offerResult.rating),
            DirectionVO.Unsafe(offerResult.direction),
            new SectorVO(Sectors[offerResult.sector]),
            BudgetVO.Unsafe(offerResult.budget),
            DescriptionVO.Unsafe(offerResult.description),
            offerResult.reports?.map(raw => OfferReportVO.Unsafe(raw.reporterId, raw.reason)) || []
        )
        return offer
    }

    async exists(id: OfferIdVO): Promise<boolean> {
        return (await this.offerRepository.doc('id').get()).exists
    }

    likeOffer(data: LikeOfferDTO) {
        try {

            let result = this.offerRepository.doc(data.id_offer).collection('likes').doc(data.id_candidate).set({
                id_candidate: data.id_candidate,
                id_offer: data.id_offer,
                like: true,
                date: new Date()
            });

            return result;
        } catch (error) {
            console.log('OfferFirestoreAdapter: likeOffer error', error)
            
        }
    }
    
}