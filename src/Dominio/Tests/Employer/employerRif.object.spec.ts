import { InvalidEmployerRif } from "../../AggRoots/Employer/Errors/InvalidEmployerRif.error"
import { EmployerRifVO } from "../../AggRoots/Employer/ValueObjects/EmployerRifVO"


describe("EmployerRifVO",()=>{
    it("No debe crearse si el Rif está vacío",()=>{
        expect(()=>EmployerRifVO.Create("")).toThrowError(InvalidEmployerRif)
    })
    it("No debe crearse si el Rif no comienza con el signo J-",()=>{
        expect(()=>EmployerRifVO.Create("455544")).toThrowError(InvalidEmployerRif)
    })
    it("No debe crearse si el Rif tiene más de 9 digitos",()=>{
        expect(()=>EmployerRifVO.Create("J-34567890123046789")).toThrowError(InvalidEmployerRif)
    })
    it("Debe crearse si el teléfono cumple con todas las restricciones",()=>{
        expect(EmployerRifVO.Create("J-25455544")).toBeInstanceOf(EmployerRifVO)
    })
})