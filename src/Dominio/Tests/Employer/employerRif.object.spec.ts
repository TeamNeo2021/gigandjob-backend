import { EmployerRifVO } from "../../AggRoots/Employer/ValueObjects/EmployerRifVO"


describe("EmployerRifVO",()=>{
    it("No debe crearse si el Rif está vacío",()=>{
        expect(()=>new EmployerRifVO("")).toThrowError(Error)
    })
    it("No debe crearse si el Rif no comienza con el signo J-",()=>{
        expect(()=>new EmployerRifVO("455544")).toThrowError(Error)
    })
    it("No debe crearse si el Rif tiene más de 9 digitos",()=>{
        expect(()=>new EmployerRifVO("J-34567890123046789")).toThrowError(Error)
    })
    it("Debe crearse si el teléfono cumple con todas las restricciones",()=>{
        expect(new EmployerRifVO("J-25455544")).toBeInstanceOf(EmployerRifVO)
    })
})