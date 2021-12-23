import { EmployerComercialDesignationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';
import { EmployerIdVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { EmployerLocationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo';
import { EmployerNameVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo';
import { EmployerPhoneVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo';
import { EmployerStateVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { EmployerDescriptionVO } from '../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO';
import { EmployerRifVO } from '../../AggRoots/Employer/ValueObjects/EmployerRifVO';
import { IDomainEvent } from '../IDomainEvent';

export class EmployerRegistered implements IDomainEvent {
    public dateTimeOcurred: Date;

    name: EmployerNameVO;
    description: EmployerDescriptionVO;
    state: EmployerStateVO;
    location: EmployerLocationVO;
    rif: EmployerRifVO;
    phone: EmployerPhoneVO;
    mail: EmployerMailVO;
    comDesignation: EmployerComercialDesignationVO;

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
        this.description = description;
        this.state = state;
        this.location = location;
        this.rif = rif;
        this.phone = phone;
        this.mail = mail;
        this.comDesignation = comDesignation;
    }
}
