import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegisteredHandler } from '../../DomainEvents/EmployerRegisteredHandler';
import { EmployerRegistered } from '../../DomainEvents/EmployerRegistered';
import { EmployerNameVo } from './ValueObjects/EmployerNameVo';
import { EmployerStateVo } from './ValueObjects/EmployerStateVo';
import { EmployerIdVO } from './ValueObjects/EmployerIdVO';
import { EmployerPhoneVo } from './ValueObjects/EmployerPhoneVo';
import { EmployerMailVo } from './ValueObjects/EmployerMailVo';
import { EmployerComercialDesignationVo } from './ValueObjects/EmployerComercialDesignationVo';
import { EmployerModified } from 'src/Dominio/DomainEvents/EmployerModified/EmployerModified';
import { EmployerModifiedHandler } from 'src/Dominio/DomainEvents/EmployerModified/EmployerModifiedHandler';
import { EmployerDescriptionVO } from './ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from './ValueObjects/EmployerLocationVO';
import { EmployerRifVO } from './ValueObjects/EmployerRifVO';

export class Employer extends AggregateRoot implements IInternalEventHandler {
  private _employerId: EmployerIdVO;
  private _name: EmployerNameVo;
  private _description: EmployerDescriptionVO;
  private _state: EmployerStateVo;
  private _location: EmployerLocationVO;
  private _rif: EmployerRifVO;
  private _phone: EmployerPhoneVo;
  private _mail: EmployerMailVo;
  private _comDesignation: EmployerComercialDesignationVo;
  constructor(
    employerId: EmployerIdVO,
    name: EmployerNameVo,
    description: EmployerDescriptionVO,
    state: EmployerStateVo,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVo,
    mail: EmployerMailVo,
    comDesignation: EmployerComercialDesignationVo,
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
    name: EmployerNameVo,
    description: EmployerDescriptionVO,
    state: EmployerStateVo,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVo,
    mail: EmployerMailVo,
    comDesignation: EmployerComercialDesignationVo,
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
  public get name(): EmployerNameVo {
    return this._name;
  }
  public set name(value: EmployerNameVo) {
    this._name = value;
  }

  public get description(): EmployerDescriptionVO {
    return this._description;
  }
  public set description(value: EmployerDescriptionVO) {
    this._description = value;
  }
  public get state(): EmployerStateVo {
    return this._state;
  }
  public set state(value: EmployerStateVo) {
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
  public get phone(): EmployerPhoneVo {
    return this._phone;
  }
  public set phone(value: EmployerPhoneVo) {
    this._phone = value;
  }
  public get mail(): EmployerMailVo {
    return this._mail;
  }
  public set mail(value: EmployerMailVo) {
    this._mail = value;
  }
  public get comDesignation(): EmployerComercialDesignationVo {
    return this._comDesignation;
  }
  public set comDesignation(value: EmployerComercialDesignationVo) {
    this._comDesignation = value;
  }
}
