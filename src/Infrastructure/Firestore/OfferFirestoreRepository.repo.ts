import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { IOfferRepository } from "src/Application/Repositories/OfferRepository.repo";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";

type OfferEntity = {
    id: string,
    state: string,
    publicationDate: Date,
    rating: number,
    direction: string,
    sector: string,
    budget: number,
    description: string
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
            description: offer._Description.value
        })
    }
    async load(id: OfferIdVO): Promise<Offer> {
        const offerQuery = await this.offerRepository.where('id', '==', id._value).get(),
              offerResult = offerQuery.docs[0].data()

        if (!offerResult) return null

        return new Offer(
            new OfferIdVO(offerResult.id),
            new OfferStateVO(OfferStatesEnum[offerResult.state]),
            PublicationDateVO.Unsafe(offerResult.publicationDate),
            RatingVO.Unsafe(offerResult.rating),
            DirectionVO.Unsafe(offerResult.direction),
            new SectorVO(Sectors[offerResult.sector]),
            BudgetVO.Unsafe(offerResult.budget),
            DescriptionVO.Unsafe(offerResult.description)
        )
    }

    async exists(id: OfferIdVO): Promise<boolean> {
        return (await this.offerRepository.doc('id').get()).exists
    }

    likeOffer(data: LikeOfferDTO) {
        throw new Error("Method not implemented.");
    }
    
}