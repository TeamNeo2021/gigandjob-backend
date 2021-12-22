import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO"


describe("Direction",()=>{
    
    //Validemos nuestra dirección
    it("Deberia fallar si la dirección es nula", ()=>{ //Validar que no es vacia
        expect(()=>new DirectionVO('')).toThrowError(Error)
    })

    it("Deberia crear cuando le pase una dirección", () => {
        expect(new DirectionVO("Avenida Principal Macaracuay")).toBeInstanceOf(DirectionVO)
    })
})