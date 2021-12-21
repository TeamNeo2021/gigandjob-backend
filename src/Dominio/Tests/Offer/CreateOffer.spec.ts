import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO"
import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVO"
import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";


//B5.T4 Test de entidad oferta creada
describe("Debería crear una nueva oferta", ()=>{

    //Validemos nuestro estado
    /*it("Deberia fallar si el estado es nulo", ()=>{ //Validate state is not empty
        expect(()=>new OfferStateVO(null)).toEqual(OfferStatesEnum.Active)toThrowError("Estado nulo")
    })*/

    //Validemos nuestra fecha de publicación
    it("Deberia fallar si la fecha es nula", ()=>{ //validar que no es vacia
        expect(()=>new PublicationDateVO(null)).toThrowError(Error)
    })

    //Validemos nuestra rating
    it("Deberia fallar si el rating es nulo", ()=>{ //Validate que no es vacia
        expect(()=>new RatingVO(null)).toThrowError(Error)
    }),

    it("Deberia fallar si el rating es menor a 0", ()=>{ //Validate que no es negativa
        expect(()=>new RatingVO(-41)).toThrowError(Error)
    })

    //Validemos nuestra dirección
    it("Deberia fallar si la dirección es nula", ()=>{ //Validar que no es vacia
        expect(()=>new DirectionVO('')).toThrowError(Error)
    })

    //Validemos nuestro presupuesto
    it("Deberia fallar si el presupuesto es nulo", ()=>{ //Validate que no es vacia
        expect(()=>new BudgetVO(null)).toThrowError(Error)
    }),

    it("Deberia fallar si el presupuesto es menor a 0", ()=>{ //Validate que no es negativa
        expect(()=>new BudgetVO(-231)).toThrowError(Error)
    })

    //Validemos nuestra descrpción
    it("Deberia fallar si la descripción es nula", ()=>{ //Validar que no es vacia
        expect(()=>new DescriptionVO('')).toThrowError(Error)
    }),

    it("Deberia fallar si la descripción es mayor a 2000 caracteres", ()=>{ //Validar que no es mayor a 2000 caracteres
        let description = new Array(2001).fill(".").join("")
        expect(()=>new DescriptionVO(description)).toThrowError(Error)
    })
})