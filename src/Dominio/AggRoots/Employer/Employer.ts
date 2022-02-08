import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegistered } from '../../DomainEvents/EmployerEvents/EmployerRegistered';
import { EmployerNameVO } from './ValueObjects/EmployerNameVo';
import {
  EmployerStates,
  EmployerStateVO,
} from './ValueObjects/EmployerStateVo';
import { EmployerIdVO } from './ValueObjects/EmployerIdVO';
import { EmployerPhoneVO } from './ValueObjects/EmployerPhoneVo';
import { EmployerMailVO } from './ValueObjects/EmployerMailVo';
import { EmployerComercialDesignationVO } from './ValueObjects/EmployerComercialDesignationVo';
import { EmployerModified } from '../../DomainEvents/EmployerEvents/EmployerModified';
import { EmployerDescriptionVO } from './ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from './ValueObjects/EmployerLocationVO';
import { EmployerRifVO } from './ValueObjects/EmployerRifVO';
import { IDomainEvent } from '../../DomainEvents/IDomainEvent';
import { EmployerEliminated } from '../../DomainEvents/EmployerEvents/EmployerEliminated';
import { InvalidEmployerState } from './Errors/invalidEmployerState.error';
import { EmployerSuspended } from '../../DomainEvents/EmployerEvents/EmployerSuspended';
import { Offer } from '../Offer/Offer';
import { InvalidEmployerAction } from './Errors/InvalidEmployerAction.error';
import { EmployerStateModified } from 'src/Dominio/DomainEvents/EmployerEvents/EmployerStateModified';
import { EmployerReactivated } from 'src/Dominio/DomainEvents/EmployerEvents/EmployerReactivated';

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
  private _offers: Offer[];

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
    this._offers = [];
  }

  protected When(event: IDomainEvent): void {
    switch (event.constructor) {
      case EmployerRegistered:
        const eventEmployerRegistered: EmployerRegistered =
          event as EmployerRegistered;
        this.name = eventEmployerRegistered.name;
        this.description = eventEmployerRegistered.description;
        this.state = eventEmployerRegistered.state;
        this.location = eventEmployerRegistered.location;
        this.rif = eventEmployerRegistered.rif;
        this.phone = eventEmployerRegistered.phone;
        this.mail = eventEmployerRegistered.mail;
        this.comDesignation = eventEmployerRegistered.comDesignation;
        break;

      case EmployerModified:
        //si el estado anterior es eliminado
        if (this._state.value_state == EmployerStates.Eliminated) {
          throw InvalidEmployerState.ChangingEliminatedState();
        }
        break;

      case EmployerSuspended:
        //si el estado anterior es eliminado
        if (this._state.value_state == EmployerStates.Eliminated) {
          throw InvalidEmployerState.ChangingEliminatedState();
        }
        //si el estado anterior es suspendido
        if (this._state.value_state == EmployerStates.Suspended) {
          throw InvalidEmployerState.SuspendingSuspendedState();
        }
        break;

      case EmployerEliminated:
        const eventEmployerEliminated: EmployerEliminated =
          event as EmployerEliminated;
        this.state = eventEmployerEliminated.state;
        break;

      case EmployerReactivated:
        this.state = new EmployerStateVO(EmployerStates.Active);
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
    const last_change = changes[changes.length - 1];
    if (last_change) {
      switch (last_change.constructor) {
        //Eliminate Employer
        case EmployerEliminated:
          const eventEmployerEliminated: EmployerEliminated =
            last_change as EmployerEliminated;
          //se verefica el estado del ultimo evento si este fue un empleador eliminado
          switch (eventEmployerEliminated.state.value_state) {
            case EmployerStates.Eliminated:
              //si el estado anterior es eliminado y el nuevo es activo o suspendido
              if (
                this._state.value_state == EmployerStates.Active ||
                this._state.value_state == EmployerStates.Suspended
              ) {
                throw InvalidEmployerState.ChangingEliminatedState();
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
      throw InvalidEmployerState.FailedVerification();
    }
  }

  static Unsafe(
    id: string,
    name: string,
    description: string,
    state: EmployerStates,
    latitude: Number,
    longitude: Number,
    rif: string,
    phone: string,
    mail: string,
    comDesignation: string,
    offers: Offer[],
  ) {
    let newEmployer = new Employer(
      new EmployerIdVO(id),
      EmployerNameVO.Unsafe(name),
      EmployerDescriptionVO.Unsafe(description),
      new EmployerStateVO(state),
      new EmployerLocationVO(latitude, longitude),
      EmployerRifVO.Unsafe(rif),
      EmployerPhoneVO.Unsafe(phone),
      EmployerMailVO.Unsafe(mail),
      EmployerComercialDesignationVO.Unsafe(comDesignation),
    );
    newEmployer.offers = offers;
    return newEmployer;
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
    let employer = new Employer(
      id,
      name,
      description,
      state,
      location,
      rif,
      phone,
      mail,
      comDesignation,
    );
    employer.Apply(
      new EmployerRegistered(
        id,
        name,
        description,
        state,
        location,
        rif,
        phone,
        mail,
        comDesignation,
      ),
    );
    return employer;
  }

  public ModifyEmployer(
    name: EmployerNameVO,
    description: EmployerDescriptionVO,
    location: EmployerLocationVO,
    rif: EmployerRifVO,
    phone: EmployerPhoneVO,
    mail: EmployerMailVO,
    comDesignation: EmployerComercialDesignationVO,
  ) {
    console.log('Modificar Empleador');
    this.Apply(new EmployerModified());

    this.name = name;
    this.description = description;
    this.location = location;
    this.rif = rif;
    this.phone = phone;
    this.mail = mail;
    this.comDesignation = comDesignation;

    return this;
  }

  public SuspendEmployer() {
    console.log('Suspender Empleador');
    this.Apply(new EmployerSuspended());

    this.state = new EmployerStateVO(EmployerStates.Suspended);

    return this;
  }

  public EliminateEmployer(state: EmployerStateVO) {
    console.log('Eliminar Empleador');
    this.Apply(new EmployerEliminated(this._employerId, state));
    return this;
  }

  public reactivateThisEmployer() {
    if (!this.isSuspended()) {
      throw InvalidEmployerAction.notSuspended();
    }
    if (this.isActive()) {
      throw InvalidEmployerAction.alreadyActive();
    }
    if (this.isEliminated()) {
      throw InvalidEmployerAction.alreadyEliminated();
    }
    console.log(
      'Reactivating Employer #: ',
      this._employerId._guid_value,
      '\nName: ',
      this._name.value_name_employer,
    );
    this.Apply(new EmployerReactivated(this.tid));
  }

  //The following may be useless, but is for support ubiquitous language
  private isEliminated(): boolean {
    return this._state.value_state == EmployerStates.Eliminated;
  }
  private isSuspended(): boolean {
    return this._state.value_state == EmployerStates.Suspended;
  }
  private isActive(): boolean {
    return this._state.value_state == EmployerStates.Active;
  }

  //Getters y setters
  public get employerId(): EmployerIdVO {
    return this._employerId;
  }
  public set employerId(value: EmployerIdVO) {
    this._employerId = value;
  }
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

  public get rif(): EmployerRifVO {
    return this._rif;
  }
  public set rif(rif: EmployerRifVO) {
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
  public get offers(): Offer[] {
    return this._offers;
  }
  public set offers(value: Offer[]) {
    this._offers = value;
  }
}
