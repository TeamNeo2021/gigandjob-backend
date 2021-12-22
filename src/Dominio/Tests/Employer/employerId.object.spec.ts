import { randomUUID } from "crypto"
import { EmployerIdVO } from "../../AggRoots/Employer/ValueObjects/EmployerIdVO"

describe("Employer ID",()=>{
    it("should not create when Employer id is empty",()=>{ //Validar que no es vacia
    expect(()=>new EmployerIdVO('')).toThrowError(Error)
    })

    it("should not create when Employer id is a string of incorrect format",()=>{
    expect(() => new EmployerIdVO("xxxxxxxxxxx")).toThrowError(Error) 
    expect(() => new EmployerIdVO("ba36a340-3a19-49b0-b02d-0a3e8d26")).toThrowError(Error)
    expect(() => new EmployerIdVO("ba36a340-3a19-49b0b02d-d8990a3e8d26")).toThrowError(Error) // Missing a separator
    expect(() => new EmployerIdVO("ba36x340-3a19-49b0-b02d-d8990a3e8d26")).toThrowError(Error) // Invalid hex-character: w
    })

    it("should create when valid UUID is passed", () => {
        expect(new EmployerIdVO(randomUUID())).toBeInstanceOf(EmployerIdVO)
    })

    it("should create when valid UUID is passed", () => {
        expect(new EmployerIdVO("ba36a340-3a19-49b0-b02d-d8990a3e8d26")).toBeInstanceOf(EmployerIdVO)
    })
})