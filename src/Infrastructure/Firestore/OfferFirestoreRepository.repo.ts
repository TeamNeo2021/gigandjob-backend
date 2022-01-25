import { IOfferRepository } from "src/Application/Repositories/OfferRepository.repo";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";

export class OfferFirestoreRepository implements IOfferRepository{
    save(offer: Offer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    load(id: OfferIdVO): Promise<Offer> {
        throw new Error("Method not implemented.");
    }
    exists(id: OfferIdVO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    likeOffer(data: LikeOfferDTO) {
        throw new Error("Method not implemented.");
    }
    
}