import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegisteredHandler } from '../../DomainEvents/EmployerRegistered/EmployerRegisteredHandler';
import { EmployerRegistered } from '../../DomainEvents/EmployerRegistered/EmployerRegistered';
import { EmployerNameVO } from './ValueObjects/EmployerNameVO';
import { EmployerStateVO } from './ValueObjects/EmployerStateVO';
import { EmployerIdVO } from './ValueObjects/EmployerIdVO';
import { EmployerPhoneVO } from './ValueObjects/EmployerPhoneVO';
import { EmployerMailVO } from './ValueObjects/EmployerMailVO';
import { EmployerComercialDesignationVO } from './ValueObjects/EmployerComercialDesignationVO';
import { EmployerModified } from 'src/Dominio/DomainEvents/EmployerModified/EmployerModified';
import { EmployerModifiedHandler } from 'src/Dominio/DomainEvents/EmployerModified/EmployerModifiedHandler';
import { EmployerDescriptionVO } from './ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from './ValueObjects/EmployerLocationVO';
import { EmployerRifVO } from './ValueObjects/EmployerRifVO';

export class Employer extends AggregateRoot implements IInternalEventHandler {
  private _employerId: EmployerIdVO;
  private _name: EmployerNameVO;
  private _description: EmployerDescriptionVO;
  private _state: EmployerStateVO;
  private _location: EmployerLocationVO;
  private _rif: EmployerRifVO;
  private _phone: EmployerPhoneVO;
  private _mail: EmployerMailVO;
  private _comDesignation: EmployerComercialDesignationVO;
  constructor(
    employerId: EmployerIdVO,
    name: EmployerNameVO,
    description: EmployerDescriptionVO,
    state: EmployerStateVO,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVO,
    mail: EmployerMailVO,
    comDesignation: EmployerComercialDesignationVO,
  ) {
    super();
    
    this._employerId = employerId;
    this._name = name;
    this._description = description;
    this._state = state;
    this._location = location;
    this._rif = rif;
    this._phone = phone;
    this._mail = mail;
    this._comDesignation = comDesignation;    
  }
  protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
    handler.handle(event, this);
  }
  protected EnsureValidState(): void {
    const valid = 
      this._employerId != null && 
      this._name != null &&
      this._description != null &&
      this._state != null &&
      this._rif != null &&
      this._location != null &&
      this._phone != null &&
      this._mail != null &&
      this._comDesignation != null;

    if (!valid) {
      throw new Error('state Verification has failed , invalid state');
    }
  }

  public RegistrarEmpleado(
    Name: string,
    Description: EmployerDescriptionVO,
    State: number,
    Location: string,
    Rif: EmployerRifVO,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    console.log('RE');
    this.Apply(
      new EmployerRegistered(
        Name,
        Description,
        State,
        Location,
        Rif,
        Phone,
        Mail,
        ComDesignation,
      ),
      new EmployerRegisteredHandler(),
    );
  }
  
  public EmployerModified(    
    name: EmployerNameVO,
    description: EmployerDescriptionVO,
    state: EmployerStateVO,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVO,
    mail: EmployerMailVO,
    comDesignation: EmployerComercialDesignationVO,
  ) {
    console.log('Employer Modified');
    this.Apply(
      new EmployerModified(
        name,
        description,
        state,
        location,
        rif,
        phone,
        mail,
        comDesignation,
      ),
      new EmployerModifiedHandler(),
    );
  }

  //Getters y setters
  public get name(): EmployerNameVO {
    return this._name;
  }
  public set name(value: EmployerNameVO) {
    this._name = value;
  }

  public get description(): EmployerDescriptionVO {
    return this._description;
  }
  public set description(value: EmployerDescriptionVO) {
    this._description = value;
  }
  public get state(): EmployerStateVO {
    return this._state;
  }
  public set state(value: EmployerStateVO) {
    this._state = value;
  }
  public get location(): EmployerLocationVO {
    return this._location;
  }
  public set location(value: EmployerLocationVO) {
    this._location = value;
  }
  
  public get rif() : EmployerRifVO {
    return this._rif;
  }
  public set rif(rif : EmployerRifVO) {
    this._rif = rif;
  }
  public get phone(): EmployerPhoneVO {
    return this._phone;
  }
  public set phone(value: EmployerPhoneVO) {
    this._phone = value;
  }
  public get mail(): EmployerMailVO {
    return this._mail;
  }
  public set mail(value: EmployerMailVO) {
    this._mail = value;
  }
  public get comDesignation(): EmployerComercialDesignationVO {
    return this._comDesignation;
  }
  public set comDesignation(value: EmployerComercialDesignationVO) {
    this._comDesignation = value;
  }
}
