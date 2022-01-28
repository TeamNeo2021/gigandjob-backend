import { InvalidEmployerPhone } from "../../AggRoots/Employer/Errors/InvalidEmployerPhone.error"
import { EmployerPhoneVO } from "../../AggRoots/Employer/ValueObjects/EmployerPhoneVo"


describe("EmployerPhoneVO", () => {
    it("No debe crearse si el teléfono está vacío", () => {
        expect(() => EmployerPhoneVO.Create("")).toThrowError(InvalidEmployerPhone)
    })
    it("No debe crearse si el teléfono no comienza con el signo +", () => {
        expect(() => EmployerPhoneVO.Create("04125455544")).toThrowError(InvalidEmployerPhone)
    })
    it("No debe crearse si el teléfono tiene más de 15 digitos", () => {
        expect(() => EmployerPhoneVO.Create("+01234567890123046789")).toThrowError(InvalidEmployerPhone)
    })
    it("Debe crearse si el teléfono cumple con todas las restricciones", () => {
        expect(EmployerPhoneVO.Create("+584125455544")).toBeInstanceOf(EmployerPhoneVO)
    })
})
