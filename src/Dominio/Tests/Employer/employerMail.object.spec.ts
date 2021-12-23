import { InvalidEmployerMail } from "../../AggRoots/Employer/Errors/InvalidEmployerMail.error"
import { EmployerMailVO } from "../../AggRoots/Employer/ValueObjects/EmployerMailVo"


describe("EmployerMailVO", () => {
    it("No debe crearse si el email está vacío", () => {
        expect(() => new EmployerMailVO("")).toThrowError(InvalidEmployerMail)
    })
    it("No debe crearse si el email no tiene un formato valido", () => {
        expect(() => new EmployerMailVO("prueba@com")).toThrowError(InvalidEmployerMail)
    })
    it("Debe crearse si el teléfono cumple con todas las restricciones", () => {
        expect(new EmployerMailVO("prueba@test.com")).toBeInstanceOf(EmployerMailVO)
    })
})
