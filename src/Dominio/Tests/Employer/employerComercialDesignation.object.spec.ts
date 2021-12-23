import { InvalidEmployerComercialDesignation } from "../../AggRoots/Employer/Errors/InvalidEmployerComercialDesignation.error"
import { EmployerComercialDesignationVO } from "../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVO"

describe("Employer Comercial Designation",() =>{
    it("should not create when value is empty",()=>{
        expect(()=>new EmployerComercialDesignationVO("")).toThrowError(InvalidEmployerComercialDesignation)
    })
    it("should not create when the value has more than 100 characters ",()=>{
        expect(()=>new EmployerComercialDesignationVO("naonfnfuofauafuoauafuafaaalfaanjjajnajnajanjjfjfajjnajnnaonfnfuofauafuoauafuafaaalfaanjjajnajnajanjjfjfajjnajn")).toThrowError(InvalidEmployerComercialDesignation)
    })
    it(" Create when the value is less than 100 characters and is not empty ",()=>{
        expect(new EmployerComercialDesignationVO("asdfghj")).toBeInstanceOf(EmployerComercialDesignationVO)
    })
})