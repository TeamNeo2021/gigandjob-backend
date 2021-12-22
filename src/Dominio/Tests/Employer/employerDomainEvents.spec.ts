import { EmployerComercialDesignationVO } from "../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVO";
import { EmployerDescriptionVO } from "../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerLocationVO } from "../../AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerMailVO } from "../../AggRoots/Employer/ValueObjects/EmployerMailVO";
import { EmployerNameVO } from "../../AggRoots/Employer/ValueObjects/EmployerNameVO";
import { EmployerPhoneVO } from "../../AggRoots/Employer/ValueObjects/EmployerPhoneVO";
import { EmployerRifVO } from "../../AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerStates, EmployerStateVO } from "../../AggRoots/Employer/ValueObjects/EmployerStateVO";
import { EmployerEliminated } from "../../DomainEvents/EmployerEliminated/EmployerEliminated";
import { EmployerRegistered } from "../../DomainEvents/EmployerRegistered/EmployerRegistered";
import { Employer } from "../../AggRoots/Employer/Employer";
import { EmployerModified } from "../../DomainEvents/EmployerModified/EmployerModified";

const exampleEmployer = Employer.RegisterEmployer(
    new EmployerNameVO("Soluciones de Prueba"),
    new EmployerDescriptionVO("El trabajo es una prueba"),
    new EmployerStateVO(EmployerStates.Active),
    new EmployerLocationVO("Av los Cedros"),
    new EmployerRifVO("J-1236782"),
    new EmployerPhoneVO("+584124578457"),
    new EmployerMailVO("prueba@test.com"),
    new EmployerComercialDesignationVO("Informatica24.c.a"),
    );
    
    describe("crear un empleador", ()=>{
    
        it("debe crear un empleador cuando se crea con un estado activo",()=>{           
            expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
        })
    });
    
    describe("modificar un empleador", ()=>{
    
        it("debe modificar el empleador cuando se cambia el estado de activo a suspendido",()=>{        
            exampleEmployer.ModifyEmployer(
                new EmployerNameVO("Soluciones de Prueba"),
                new EmployerDescriptionVO("El trabajo es una prueba"),
                new EmployerStateVO(EmployerStates.Suspended),
                new EmployerLocationVO("Av los Cedros"),
                new EmployerRifVO("J-1236782"),
                new EmployerPhoneVO("+584124578457"),
                new EmployerMailVO("prueba@test.com"),
                new EmployerComercialDesignationVO("Informatica24.c.a"),);
            expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
            expect(exampleEmployer.GetChanges()[1]).toBeInstanceOf(EmployerModified);
        }),
        it("debe modificar el empleador cuando se cambia el estado de activo a cerrado",()=>{        
            exampleEmployer.EliminateEmployer(
                new EmployerStateVO(EmployerStates.Eliminated),);
            expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
            expect(exampleEmployer.GetChanges()[1]).toBeInstanceOf(EmployerModified);
            expect(exampleEmployer.GetChanges()[2]).toBeInstanceOf(EmployerEliminated);
        }),
        it("no debe modificar el empleador cuando se cambia el estado de eliminado a activo",()=>{        
            expect(()=> exampleEmployer.ModifyEmployer(
                new EmployerNameVO("Soluciones de Prueba"),
                new EmployerDescriptionVO("El trabajo es una prueba"),
                new EmployerStateVO(EmployerStates.Active),
                new EmployerLocationVO("Av los Cedros"),
                new EmployerRifVO("J-1236782"),
                new EmployerPhoneVO("+584124578457"),
                new EmployerMailVO("prueba@test.com"),
                new EmployerComercialDesignationVO("Informatica24.c.a"),)
            ).toThrowError(Error);            
        }),
        it("no debe modificar el empleador cuando se cambia el estado de eliminado a suspendido",()=>{        
            expect(()=> exampleEmployer.ModifyEmployer(
                new EmployerNameVO("Soluciones de Prueba"),
                new EmployerDescriptionVO("El trabajo es una prueba"),
                new EmployerStateVO(EmployerStates.Suspended),
                new EmployerLocationVO("Av los Cedros"),
                new EmployerRifVO("J-1236782"),
                new EmployerPhoneVO("+584124578457"),
                new EmployerMailVO("prueba@test.com"),
                new EmployerComercialDesignationVO("Informatica24.c.a"),)
            ).toThrowError(Error);            
        })
    })