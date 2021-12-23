import { EmployerMailVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVO";
import { EmployerNameVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVO";
import { EmployerStateVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVO";
import { IDomainEvent } from "../IDomainEvent";
import { EmployerComercialDesignationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVO";
import { EmployerPhoneVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVO";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";


export class EmployerModified implements IDomainEvent {
    
    public dateTimeOcurred: Date;
    public name: EmployerNameVO;
    public description: EmployerDescriptionVO;
    public state: EmployerStateVO;
    public location: EmployerLocationVO;
    public rif: EmployerRifVO;
    public phone: EmployerPhoneVO;
    public mail: EmployerMailVO;
    public comDesignation: EmployerComercialDesignationVO;    
    
    constructor(
        name: EmployerNameVO,
        description: EmployerDescriptionVO,
        state: EmployerStateVO,
        location: EmployerLocationVO,
        rif: EmployerRifVO,
        phone: EmployerPhoneVO,
        mail: EmployerMailVO,
        comDesignation: EmployerComercialDesignationVO,
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.name = name;
        this.state = state;
        this.description = description;
        this.location = location;
        this.rif = rif;
        this.phone = phone;
        this.mail = mail;
        this.comDesignation = comDesignation;
    }
}
