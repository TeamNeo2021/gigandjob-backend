import { InvalidOfferPublicationDate } from "../Errors/InvalidOfferPublicationDate.error";

export class PublicationDateVO{

    value:Date;

    constructor(value:Date){
        if(value===null){
            throw InvalidOfferPublicationDate.EmptyPublication();
        }
        this.value=value;
    }    
}