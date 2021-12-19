import { EmployerMailVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerNameVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerStateVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { IDomainEvent } from "../IDomainEvent";
import { EmployerComercialDesignationVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
import { EmployerPhoneVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";


export class EmployerModified implements IDomainEvent {
    
    public dateTimeOcurred: Date;
    public name: EmployerNameVo;
    public description: EmployerDescriptionVO;
    public state: EmployerStateVo;
    public location: EmployerLocationVO;
    public rif: EmployerRifVO;
    public phone: EmployerPhoneVo;
    public mail: EmployerMailVo;
    public comDesignation: EmployerComercialDesignationVo;    
    
    constructor(
        name: EmployerNameVo,
        description: EmployerDescriptionVO,
        state: EmployerStateVo,
        location: EmployerLocationVO,
        rif: EmployerRifVO,
        phone: EmployerPhoneVo,
        mail: EmployerMailVo,
        comDesignation: EmployerComercialDesignationVo,
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
