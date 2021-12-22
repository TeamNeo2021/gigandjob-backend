import { EmployerComercialDesignationVO } from "../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo"

describe("Employer Comercial Designation",() =>{
    it("should not create when value is empty",()=>{
        expect(()=>new EmployerComercialDesignationVO("")).toThrowError(Error)
    })
    it("should not create when the value has more than 50 characters ",()=>{
        expect(()=>new EmployerComercialDesignationVO("naonfnfuofauafuoauafuafaaalfaanjjajnajnajanjjfjfajjnajn")).toThrowError(Error)
    })
    it(" Create when the value is less than 50 characters and is not empty ",()=>{
        expect(new EmployerComercialDesignationVO("asdfghj")).toBeInstanceOf(EmployerComercialDesignationVO)
    })
})