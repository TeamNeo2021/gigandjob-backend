import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";

describe("Descripción", ()=>{

    //Validemos nuestra descripción
    it("Deberia fallar si la descripción es nula", ()=>{ //Validar que no es vacia
        expect(()=>new DescriptionVO('')).toThrowError(Error)
    }),

    it("Deberia fallar si la descripción es mayor a 2000 caracteres", ()=>{ //Validar que no es mayor a 2000 caracteres
        let description = new Array(2001).fill(".").join("")
        expect(()=>new DescriptionVO(description)).toThrowError(Error)
    })

    it("Deberia crear cuando le pase una descripción", () => {
        expect(new DescriptionVO("Se aceptan recién graduados de la UCAB con experiencia en DDD")).toBeInstanceOf(DescriptionVO)
    })
})