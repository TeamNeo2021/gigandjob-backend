import { InvalidEmployerLocation } from "../../AggRoots/Employer/Errors/InvalidEmployerLocation.error"
import { EmployerLocationVO } from "../../AggRoots/Employer/ValueObjects/EmployerLocationVO"

describe("Employer Location",()=>{
    it("should not create when value_employer_location is empty",()=>{
        expect(()=>EmployerLocationVO.Create(" ")).toThrowError(InvalidEmployerLocation)
    })
    it(" Create when the value_employer_location is not empty ",()=>{
        expect(EmployerLocationVO.Create("asdfghj")).toBeInstanceOf(EmployerLocationVO)
    })
})