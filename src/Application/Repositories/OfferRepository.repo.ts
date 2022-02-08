import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { LikeOfferDTO } from "../DTO/Offer/LikeOfferDTO.dto";
import { OfferDTO } from "../DTO/Offer/OfferDTO";

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

    /**
     * Save an Offer in the DB
     * @param Offer 
     * @return Promise<void>
     */
    save(offer: OfferDTO): Promise<void>;

    //! This are tresspassing aggregate offer
    //! by accesing directly to its VO's

    /**
     * Use it to get an Offer from the DB by its ID 
     * @param string id_offer
     * @return Promise<OfferDTO> 
     */
    getOfferById(id_offer: string): Promise<OfferDTO>;

    
    /**
     * Use it to check if an Offer exists in the DB
     * @param string id_offer
     * @return Promise<boolean> 
     */
    exists(id_offer:string): Promise<boolean>;

     /**
     * Use it to add like to an Offer in the DB
     * @param data: LikeOfferDTO
     * @return Promise<Offer[]> 
     */
    likeOffer(data: LikeOfferDTO);

    /**
     * get all the Offers from DB
     * 
     * @return Promise<OfferDTO[]> 
     */
    getAll(): Promise<OfferDTO[]>;

}