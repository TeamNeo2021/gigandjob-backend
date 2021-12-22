import { randomUUID } from "crypto"
import { OfferIdVO } from "../../AggRoots/Offer/ValueObjects/OfferIdVO"

describe("Offer ID",()=>{

    //Validemos nuestra Id
    it("No debería crear si el Id es vacio",()=>{ //Validar que no es vacia
    expect(()=>new OfferIdVO('')).toThrowError(Error)
    })

    it("No debería crear si el Id es de formato incorrecto",()=>{
    expect(() => new OfferIdVO("xxxxxxxxxxx")).toThrowError(Error) 
    expect(() => new OfferIdVO("4992c888-2e37-4d66-945b-b29ed3aa")).toThrowError(Error)
    expect(() => new OfferIdVO("4992c888-2e37-4d66945b-b29ed3aa7720")).toThrowError(Error) 
    expect(() => new OfferIdVO("4992c888-2e37-4d66-945b-b29zd3aa7720")).toThrowError(Error) 
    })

    it("Debería crear si le paso un uuid correcto", () => {
        expect(new OfferIdVO(randomUUID())).toBeInstanceOf(OfferIdVO)
    })

    it("Debería crear si le paso un uuid correcto", () => {
        expect(new OfferIdVO("4992c888-2e37-4d66-945b-b29ed3aa7720")).toBeInstanceOf(OfferIdVO)
    })
})