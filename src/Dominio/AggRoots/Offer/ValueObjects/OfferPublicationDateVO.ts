import { InvalidOfferPublicationDate } from "../Errors/InvalidOfferPublicationDate.error";

export class PublicationDateVO{

    readonly value:Date;

    private constructor(value:Date){
        this.value=value;
    }    

    static Create(value: Date) {
        if(value===null){
            throw InvalidOfferPublicationDate.EmptyPublication();
        }
        
        return new PublicationDateVO(value)
    }

    static Unsafe(value: Date) {
        return new PublicationDateVO(value)
    }
}