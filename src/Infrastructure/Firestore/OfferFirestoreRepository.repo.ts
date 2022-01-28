import { IOfferRepository } from "src/Application/Repositories/OfferRepository.repo";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";

export class OfferFirestoreRepository implements IOfferRepository{
    async save(offer: Offer): Promise<void> {

        //await db to respond
        throw new Error("Method not implemented.");
    }
    async load(id: OfferIdVO): Promise<Offer> {

        //await db to respond
        throw new Error("Method not implemented.");
    }
    async exists(id: OfferIdVO): Promise<boolean> {

        //await db to respond
        throw new Error("Method not implemented.");
    }
    likeOffer(data: LikeOfferDTO) {
        throw new Error("Method not implemented.");
    }
    
}