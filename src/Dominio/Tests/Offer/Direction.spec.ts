import { InvalidOfferDirection } from "../../AggRoots/Offer/Errors/InvalidOfferDirection.error"
import { OfferLocationVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO"


describe("create a new Offer Location Value Object", ()=>{

    
    it("should fail when latitude is smaller than -90",()=>{
        expect(()=> new OfferLocationVO(-150,0)).toThrowError(InvalidOfferDirection)
    }),
    it("should fail when latitude is bigger than 90",()=>{
        expect(()=> new OfferLocationVO(150,0)).toThrowError(InvalidOfferDirection)
    }),
    it("should fail when longitude is smller than -180",()=>{
        expect(()=> new OfferLocationVO(0,-250)).toThrowError(InvalidOfferDirection)
    }),
    it("should fail when longitude is bigger than 180",()=>{
        expect(()=> new OfferLocationVO(0,250)).toThrowError(InvalidOfferDirection)
    }),
    it("should succeed when entering valid coordenates",()=>{
        expect(()=> new OfferLocationVO(24,150))
    })

}
)