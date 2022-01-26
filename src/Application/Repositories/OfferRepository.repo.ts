import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";

export interface IOfferRepository {

    
    save(offer: Offer): void;

    //! This are tresspassing aggregate offer
    //! by accesing directly to its VO's
    load(id: OfferIdVO): Offer;

    exists(id: OfferIdVO): boolean;

    likeOffer(data: LikeOfferDTO);



}