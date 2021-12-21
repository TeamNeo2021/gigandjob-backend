import { EmployerLocationVO } from "../../AggRoots/Employer/ValueObjects/EmployerLocationVO"

describe("Employer Location",()=>{
    it("should not create when value_employer_location is empty",()=>{
        expect(()=>new EmployerLocationVO(" ")).toThrowError(Error)
    })
    it(" Create when the value_employer_location is not empty ",()=>{
        expect(new EmployerLocationVO("asdfghj")).toBeInstanceOf(EmployerLocationVO)
    })
})