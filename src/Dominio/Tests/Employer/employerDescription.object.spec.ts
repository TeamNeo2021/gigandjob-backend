import { InvalidEmployerDescription } from "../../AggRoots/Employer/Errors/InvalidEmployerDescription.error"
import { EmployerDescriptionVO } from "../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO"

describe("Employer Description",()=>{
    it("should not create when value_employer_description is empty",()=>{
        expect(()=> EmployerDescriptionVO.Create("")).toThrowError(InvalidEmployerDescription)
    })
    it("should not be created when the value is more than 500 characters",()=>{
        let description = new Array(501).fill("a").join("")
        console.log(description.length)
        expect(()=> EmployerDescriptionVO.Create(description)).toThrowError(InvalidEmployerDescription)
    })
    it(" Create when the value is less than 500 characters and is not empty ",()=>{
        expect(EmployerDescriptionVO.Create("asdfghj")).toBeInstanceOf(EmployerDescriptionVO)
    })
})