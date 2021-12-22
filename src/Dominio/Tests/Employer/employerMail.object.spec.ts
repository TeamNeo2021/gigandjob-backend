import { EmployerMailVO } from "../../AggRoots/Employer/ValueObjects/EmployerMailVO"


describe("EmployerMailVO",()=>{
    it("No debe crearse si el email está vacío",()=>{
        expect(()=>new EmployerMailVO("")).toThrowError(Error)
    })
    it("No debe crearse si el email no tiene un formato valido",()=>{
        expect(()=>new EmployerMailVO("prueba@com")).toThrowError(Error)
    })    
    it("Debe crearse si el teléfono cumple con todas las restricciones",()=>{
        expect(new EmployerMailVO("prueba@test.com")).toBeInstanceOf(EmployerMailVO)
    })
})