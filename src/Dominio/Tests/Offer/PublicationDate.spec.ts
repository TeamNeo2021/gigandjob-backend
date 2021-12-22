import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO"


describe("PublicationDate",()=>{
    
     //Validemos nuestra fecha de publicación
    it("Deberia fallar si la fecha es nula", ()=>{ //validar que no es vacia
        expect(()=>new PublicationDateVO(null)).toThrowError(Error)
    })

    it("Deberia crear cuando le pase una fecha", () => {
        expect(new PublicationDateVO(new Date('2000-01-31'))).toBeInstanceOf(PublicationDateVO)
    })
})