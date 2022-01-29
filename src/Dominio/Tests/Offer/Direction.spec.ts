import { InvalidOfferDirection } from "../../AggRoots/Offer/Errors/InvalidOfferDirection.error"
import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO"


describe("Direction",()=>{
    
    //Validemos nuestra dirección
    it("Deberia fallar si la dirección es nula", ()=>{ //Validar que no es vacia
        expect(()=>DirectionVO.Create('')).toThrowError(InvalidOfferDirection)
    })

    it("Deberia crear cuando le pase una dirección", () => {
        expect(DirectionVO.Create("Avenida Principal Macaracuay")).toBeInstanceOf(DirectionVO)
    })
})