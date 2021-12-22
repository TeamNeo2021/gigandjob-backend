import { EmployerNameVO } from "../../AggRoots/Employer/ValueObjects/EmployerNameVO"

it("Deberia fallar si el nombre es nulo", ()=>{ //Validar que no es vacia
    expect(()=>new EmployerNameVO('')).toThrowError(Error)
}),

it("Deberia fallar si el nombre es mayor a 20 caracteres", ()=>{ //Validar que no es mayor a 20 caracteres
    let nombre = new Array(21).fill(".").join("")
    expect(()=>new EmployerNameVO(nombre)).toThrowError(Error)
})