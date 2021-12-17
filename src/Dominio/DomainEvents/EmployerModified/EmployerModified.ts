import { EmployerMailVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerNameVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerStateVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { IDomainEvent } from "../IDomainEvent";
import { EmployerComercialDesignationVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";


export class EmployerModified implements IDomainEvent {
    
    public dateTimeOcurred: Date;
    public Name: EmployerNameVo;
    public Description: EmployerDescriptionVO;
    public State: EmployerStateVo;
    public Location: EmployerLocationVO;
    public Rif: EmployerRifVO;
    public Phone: EmployerPhoneVo;
    public Mail: EmployerMailVo;
    public ComDesignation: EmployerComercialDesignationVo;    
    
    constructor(
        Name: EmployerNameVo,
        Description: EmployerDescriptionVO,
        State: EmployerStateVo,
        Location: EmployerLocationVO,
        Rif: EmployerRifVO,
        Phone: EmployerPhoneVo,
        Mail: EmployerMailVo,
        ComDesignation: EmployerComercialDesignationVo,
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.Name = Name;
        this.State = State;
        this.Description = Description;
        this.Location = Location;
        this.Rif = Rif;
        this.Phone = Phone;
        this.Mail = Mail;
        this.ComDesignation = ComDesignation;
    }
}
