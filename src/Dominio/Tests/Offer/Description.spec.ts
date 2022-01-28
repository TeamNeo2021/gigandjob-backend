import { InvalidOfferDescription } from "../../AggRoots/Offer/Errors/InvalidOfferDescription.error";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";

describe("Descripción", ()=>{

    //Validemos nuestra descripción
    it("Deberia fallar si la descripción es nula", ()=>{ //Validar que no es vacia
        expect(()=>DescriptionVO.Create('')).toThrowError(InvalidOfferDescription)
    }),

    it("Deberia fallar si la descripción es mayor a 2000 caracteres", ()=>{ //Validar que no es mayor a 2000 caracteres
        let description = new Array(2001).fill(".").join("")
        expect(()=>DescriptionVO.Create(description)).toThrowError(InvalidOfferDescription)
    })

    it("Deberia crear cuando le pase una descripción", () => {
        expect(DescriptionVO.Create("Se aceptan recién graduados de la UCAB con experiencia en DDD")).toBeInstanceOf(DescriptionVO)
    })
})