import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegistered } from '../../DomainEvents/EmployerEvents/EmployerRegistered';
import { EmployerNameVO } from './ValueObjects/EmployerNameVO';
import { EmployerStates, EmployerStateVO } from './ValueObjects/EmployerStateVO';
import { EmployerIdVO } from './ValueObjects/EmployerIdVO';
import { EmployerPhoneVO } from './ValueObjects/EmployerPhoneVO';
import { EmployerMailVO } from './ValueObjects/EmployerMailVO';
import { EmployerComercialDesignationVO } from './ValueObjects/EmployerComercialDesignationVO';
import { EmployerModified } from '../../DomainEvents/EmployerEvents/EmployerModified';
import { EmployerDescriptionVO } from './ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from './ValueObjects/EmployerLocationVO';
import { EmployerRifVO } from './ValueObjects/EmployerRifVO';
import { IDomainEvent } from '../../DomainEvents/IDomainEvent';
import { EmployerEliminated } from '../../DomainEvents/EmployerEvents/EmployerEliminated';


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
  
  private constructor(
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
  
  protected When(event: IDomainEvent): void {     

    switch(event.constructor){
      case EmployerRegistered:
        const eventEmployerRegistered:EmployerRegistered=event as EmployerRegistered;
        this.name = (eventEmployerRegistered.name);
        this.description = (eventEmployerRegistered.description);
        this.state = (eventEmployerRegistered.state);
        this.location = (eventEmployerRegistered.location);
        this.rif = (eventEmployerRegistered.rif);
        this.phone = (eventEmployerRegistered.phone);
        this.mail = (eventEmployerRegistered.mail);
        this.comDesignation = (eventEmployerRegistered.comDesignation);
        break;
      case EmployerModified:
        const eventEmployerModified:EmployerModified=event as EmployerModified;        
        this.name = (eventEmployerModified.name);
        this.description = (eventEmployerModified.description);
        this.state = (eventEmployerModified.state);
        this.location = (eventEmployerModified.location);
        this.rif = (eventEmployerModified.rif);
        this.phone = (eventEmployerModified.phone);
        this.mail = (eventEmployerModified.mail);
        this.comDesignation = (eventEmployerModified.comDesignation);
        break;
        case EmployerEliminated:
          const eventEmployerEliminated:EmployerEliminated=event as EmployerEliminated;        
          this.state = (eventEmployerEliminated.state);
          break;
      default:
        break;
    }
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

         
    const changes = this.GetChanges();
    const last_change = changes[changes.length-1]      
    if(last_change){      
      switch(last_change.constructor){           
        //Modify Employer
        case EmployerModified:          
          const eventEmployerModified: EmployerModified = last_change as EmployerModified
          //se verefica el estado del ultimo evento si este fue un empleador modificado
          switch (eventEmployerModified.state.value_state) {
            case EmployerStates.Eliminated:
              //si el estado anterior es eliminado y el nuevo es activo o suspendido
              if ((this._state.value_state == EmployerStates.Active)||(this._state.value_state == EmployerStates.Suspended)){
                throw new Error("No se puede cambiar el estado de un Empleador Eliminado");
              }
              break;
            default:
              break;
          }
        //Eliminate Employer
        case EmployerEliminated:              
          const eventEmployerEliminated: EmployerEliminated = last_change as EmployerEliminated
          //se verefica el estado del ultimo evento si este fue un empleador eliminado
          switch (eventEmployerEliminated.state.value_state) {
            case EmployerStates.Eliminated:
              //si el estado anterior es eliminado y el nuevo es activo o suspendido
              if ((this._state.value_state == EmployerStates.Active)||(this._state.value_state == EmployerStates.Suspended)){
                throw new Error("No se puede cambiar el estado de un Empleador Eliminado");
              }
              break;
            default:
              break;
          }
          
          break;           
        default:
          break;
      }
    }

    //algunos de los VO es nulo
    if (!valid) {
      throw new Error('Verificacion de estado fallido');
    }
  }

  static RegisterEmployer(
    name: EmployerNameVO,
    description: EmployerDescriptionVO,
    state: EmployerStateVO,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVO,
    mail: EmployerMailVO,
    comDesignation: EmployerComercialDesignationVO,
    id: EmployerIdVO = new EmployerIdVO(),
  ) {
    console.log('Registrar Empleador');
    let employer = new Employer(id, name, description, state, location, rif, phone, mail, comDesignation);
    employer.Apply(
      new EmployerRegistered(
        name,
        description,
        state,
        location,
        rif,
        phone,
        mail,
        comDesignation,
      )
    );
    return employer;
  }
  
  public ModifyEmployer(    
    name: EmployerNameVO,
    description: EmployerDescriptionVO,
    state: EmployerStateVO,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVO,
    mail: EmployerMailVO,
    comDesignation: EmployerComercialDesignationVO,
  ) {
    console.log('Modificar Empleador');
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
      )
    );
    return this;
  }

  public EliminateEmployer(   
    state: EmployerStateVO,    
  ) {
    console.log('Eliminar Empleador');
    this.Apply(
      new EmployerEliminated(
        this._employerId,
        state,
      )
    );
    return this;
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

