import { EmployerPhoneVO } from "../../AggRoots/Employer/ValueObjects/EmployerPhoneVO"


describe("EmployerPhoneVO",()=>{
    it("No debe crearse si el teléfono está vacío",()=>{
        expect(()=>new EmployerPhoneVO("")).toThrowError(Error)
    })
    it("No debe crearse si el teléfono no comienza con el signo +",()=>{
        expect(()=>new EmployerPhoneVO("04125455544")).toThrowError(Error)
    })
    it("No debe crearse si el teléfono tiene más de 15 digitos",()=>{
        expect(()=>new EmployerPhoneVO("+01234567890123046789")).toThrowError(Error)
    })
    it("Debe crearse si el teléfono cumple con todas las restricciones",()=>{
        expect(new EmployerPhoneVO("+584125455544")).toBeInstanceOf(EmployerPhoneVO)
    })
})