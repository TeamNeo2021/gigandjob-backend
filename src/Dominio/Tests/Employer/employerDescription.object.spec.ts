import { EmployerDescriptionVO } from "../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO"

describe("Employer Description",()=>{
    it("should not create when value_employer_description is empty",()=>{
        expect(()=>new EmployerDescriptionVO(null)).toThrowError(Error)
    })
    it("should not be created when the value is more than 500 characters",()=>{
        let description = new Array(500).fill("a").join("")
        expect(()=>new EmployerDescriptionVO(description)).toThrowError(Error)
    })
    it(" Create when the value is less than 500 characters and is not empty ",()=>{
        expect(new EmployerDescriptionVO("asdfghj")).toBeInstanceOf(EmployerDescriptionVO)
    })
})