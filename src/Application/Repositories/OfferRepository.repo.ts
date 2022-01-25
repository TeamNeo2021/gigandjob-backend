import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";

export interface IOfferRepository {

    
    save(offer: Offer): Promise<void>;

    //! This are tresspassing aggregate offer
    //! by accesing directly to its VO's
    load(id: OfferIdVO): Promise<Offer>

    exists(id: OfferIdVO): Promise<boolean>

    likeOffer(data: LikeOfferDTO);



}