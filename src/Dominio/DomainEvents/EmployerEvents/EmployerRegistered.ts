import { EmployerComercialDesignationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVO';
import { EmployerIdVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { EmployerLocationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVO';
import { EmployerNameVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVO';
import { EmployerPhoneVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVO';
import { EmployerStateVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVO';
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
