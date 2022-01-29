import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";

//Repository for the aggregate Offer

export interface IOfferRepository {

    /* 
       This methods returns promises because
       they are supposed to await for a DB to respond.
       
       The implementations of this interface should use
       async functions, and promises too
       
       Check an example of implementation in:
       src/Infraestructure/Firestore/OfferFirestoreRepository.repo.ts
    */

    save(offer: Offer): Promise<void>;

    //! This are tresspassing aggregate offer
    //! by accesing directly to its VO's
    load(id: OfferIdVO): Promise<Offer>;

    exists(id: OfferIdVO): Promise<boolean>;

    likeOffer(data: LikeOfferDTO);



}