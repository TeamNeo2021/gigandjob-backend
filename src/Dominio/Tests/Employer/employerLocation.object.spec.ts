import { InvalidEmployerLocation } from "../../AggRoots/Employer/Errors/InvalidEmployerLocation.error"
import { EmployerLocationVO } from "../../AggRoots/Employer/ValueObjects/EmployerLocationVO"

describe("create a new Employer Location Value Object", ()=>{

    
    it("should fail when latitude is smaller than -90",()=>{
        expect(()=> new EmployerLocationVO(-150,0)).toThrowError(InvalidEmployerLocation)
    }),
    it("should fail when latitude is bigger than 90",()=>{
        expect(()=> new EmployerLocationVO(150,0)).toThrowError(InvalidEmployerLocation)
    }),
    it("should fail when longitude is smller than -180",()=>{
        expect(()=> new EmployerLocationVO(0,-250)).toThrowError(InvalidEmployerLocation)
    }),
    it("should fail when longitude is bigger than 180",()=>{
        expect(()=> new EmployerLocationVO(0,250)).toThrowError(InvalidEmployerLocation)
    }),
    it("should succeed when entering valid coordenates",()=>{
        expect(()=> new EmployerLocationVO(24,150))
    })

}
)