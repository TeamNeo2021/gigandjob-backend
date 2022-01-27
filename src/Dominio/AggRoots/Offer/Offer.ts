import { AggregateRoot } from '../AggregateRoot';
import { OfferIdVO } from './ValueObjects/OfferIdVO';
import { BudgetVO } from './ValueObjects/OfferBudgetVO';
import { DirectionVO } from './ValueObjects/OfferDirectionVO';
import { DescriptionVO } from './ValueObjects/OfferDescriptionVO';
import { RatingVO } from './ValueObjects/OfferRatingVO';
import { OfferCreated } from '../../DomainEvents/OfferEvents/OfferCreated';
import { SectorVO } from './ValueObjects/OfferSectorVo';
import { OfferStateVO, OfferStatesEnum } from './ValueObjects/OfferStateVo';
import { Application } from './Application/Application';
import { OfferModified } from '../../DomainEvents/OfferEvents/OfferModified';
import { PublicationDateVO } from './ValueObjects/OfferPublicationDateVO';
import { CandidateApplied } from '../../DomainEvents/CandidateEvents/CandidateApplied';
import { ApplicationId } from './Application/Value Objects/ApplicationId';
import { ApplicationState } from './Application/Value Objects/ApplicationStates';
import { ApplicationBudget } from './Application/Value Objects/ApplicationBudget';
import { ApplicationDescription } from './Application/Value Objects/ApplicationDescription';
import { ApplicationTime } from './Application/Value Objects/ApplicationTime';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';
import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { InvalidOfferState } from './Errors/InvalidOfferState.error';
import { OfferSuspended } from '../../DomainEvents/OfferEvents/OfferSuspended';
import { OfferEliminated } from '../../DomainEvents/OfferEvents/OfferEliminated';
import { OfferReactivated } from '../../DomainEvents/OfferEvents/OfferReactivated';

export class Offer extends AggregateRoot implements IInternalEventHandler {

  private OfferId: OfferIdVO;
  private State: OfferStateVO;
  private Before_State: OfferStateVO;
  private PublicationDate: PublicationDateVO;
  private Rating: RatingVO;
  private Direction: DirectionVO;
  private Sector: SectorVO;
  private Budget: BudgetVO;
  private Description: DescriptionVO;
  private application: Application[];



  constructor(
    offerId: OfferIdVO,
    state: OfferStateVO,
    publicationDate: PublicationDateVO,
    rating: RatingVO,
    direction: DirectionVO,
    sector: SectorVO,
    budget: BudgetVO,
    description: DescriptionVO,
  ) {
    super();
    this.OfferId = offerId;
    this.State = state;
    this.PublicationDate = publicationDate;
    this.Rating = rating;
    this.Direction = direction;
    this.Sector = sector;
    this.Budget = budget;
    this.Description = description;
    this.application = [];

  }

  protected When(event: IDomainEvent): void {

    switch (event.constructor) {
      case OfferCreated:
        const eventOfferCreated: OfferCreated = event as OfferCreated;
        this._State = (eventOfferCreated.State);
        this._PublicationDate = (eventOfferCreated.PublicationDate);
        this._Rating = (eventOfferCreated.Rating);
        this._Direction = (eventOfferCreated.Direction);
        this._Sector = (eventOfferCreated.Sector);
        this._Budget = (eventOfferCreated.Budget);
        this._Description = (eventOfferCreated.Description);
        break;
      case OfferModified:
         
         if (this.State.state == OfferStatesEnum.Closed) {
          throw InvalidOfferState.ChangingClosedState();
        }
        else if (this.State.state == OfferStatesEnum.Eliminated) {
          throw InvalidOfferState.ChangingEliminatadState();
        }
        break;
      
      case OfferSuspended:
        // si el estado anterior es cerrada
        if (this.State.state == OfferStatesEnum.Closed) {
          throw InvalidOfferState.ChangingClosedState();
        }
        // si el estado anterior es eliminada
        if (this.State.state == OfferStatesEnum.Eliminated) {
          throw InvalidOfferState.ChangingEliminatadState();
        }        
        // si el estado anterior es suspendida
        if (this.State.state == OfferStatesEnum.Suspended) {
          throw InvalidOfferState.SuspendingSuspendedState();
        }
        break;

      case OfferEliminated:
        // si el estado anterior es cerrada
        if (this.State.state == OfferStatesEnum.Closed) {
          throw InvalidOfferState.ChangingClosedState();
        }
        // si el estado anterior es eliminada
        if (this.State.state == OfferStatesEnum.Eliminated) {
          throw InvalidOfferState.ChangingEliminatadState();
        }        
        break;
        
        case OfferReactivated:
          // si el estado anterior es eliminada
          if (this.State.state == OfferStatesEnum.Eliminated) {
            throw InvalidOfferState.ChangingEliminatadState();
          }
          // si el estado anterior no es suspendida
          if (this.State.state != OfferStatesEnum.Suspended) {
            throw InvalidOfferState.ReactivteNotSuspendedState();
          }
          break;

      case CandidateApplied:
        const eventCandidateApplied: CandidateApplied = event as CandidateApplied;
        var _application = new Application(
          this.Apply,
          new ApplicationId(eventCandidateApplied.candidateId),
          new CandidateIdVo(),//Aggregate trespassing
          new ApplicationState(),
          new ApplicationBudget(eventCandidateApplied.budget),
          new ApplicationDescription(eventCandidateApplied.description),
          new ApplicationTime(eventCandidateApplied.time)
        )
        this.ApplyToEntity(_application, event);
        this.application.push(_application)
        break;
      default:
        break;
    }

  }

  protected EnsureValidState(): void {
    const valid = this.OfferId != null
    this.PublicationDate != null &&
      this.Rating != null &&
      this.Direction != null &&
      this.Sector != null &&
      this.Budget != null &&
      this.Description != null;
    const changes = this.GetChanges();

    //Create offer
    if (((this.State.state == OfferStatesEnum.Suspended) ||
      (this.State.state == OfferStatesEnum.Closed) ||
      (this.State.state == OfferStatesEnum.Eliminated)) &&
      (changes.length == 0)) {
      throw InvalidOfferState.BadCreatedOffer();
    }      
    
    //algunos de los VO es nulo
    if (!valid) {
      throw InvalidOfferState.FailedVerification();
    }
  }

  //Modificar oferta
  public ModifyOffer(    
    publicationDate: PublicationDateVO,
    rating: RatingVO,
    direction: DirectionVO,
    sector: SectorVO,
    budget: BudgetVO,
    description: DescriptionVO,
  ) {
    console.log('Modificar Oferta');
    this.Apply(new OfferModified());
    this.PublicationDate = publicationDate;
    this.Rating = rating;
    this.Direction = direction;
    this.Sector = sector;
    this.Budget = budget;
    this.Description = description;

    return this;
  }

  //Suspender oferta
  public SuspendOffer() {
    console.log('Suspender Oferta');
    this.Apply(new OfferSuspended());
    
    this._State = new OfferStateVO(OfferStatesEnum.Suspended);
    
    return this;
  }


  //Eliminar oferta
  public EliminateOffer() {
    console.log('Eliminar Oferta');
    this.Apply(new OfferEliminated());
    
    this._State = new OfferStateVO(OfferStatesEnum.Eliminated);
  }

  //Reactivar oferta
  public ReactivateOffer() {
    console.log('Reactivar Oferta');
    this.Apply(new OfferReactivated());
    
    this._State = new OfferStateVO(OfferStatesEnum.Active);
    
    return this;
  }
  
  //Implementacion de crearOferta con domain event
  static CreateOffer(
    State: OfferStateVO,
    PublicationDate: PublicationDateVO,
    Rating: RatingVO,
    Direction: DirectionVO,
    Sector: SectorVO,
    Budget: BudgetVO,
    Description: DescriptionVO,
    id: OfferIdVO = new OfferIdVO(),
  ) {
    console.log('Crear Oferta');
    let offer = new Offer(id, State, PublicationDate, Rating, Direction, Sector, Budget, Description,)
    offer.Apply(
      //this.Apply(
      new OfferCreated(
        State,
        PublicationDate,
        Rating,
        Direction,
        Sector,
        Budget,
        Description,
      )
    );
    return offer;
  }

  //Getters y setters
  public get _Id(): OfferIdVO {
    return this.OfferId;
  }

  public get _State(): OfferStateVO {
    return this.State;
  }
  public set _State(value: OfferStateVO) {
    this.State = value;
  }

  public get _Before_State(): OfferStateVO {
    return this.Before_State;
  }
  public set _Before_State(value: OfferStateVO) {
    this.Before_State = value;
  }

  public get _PublicationDate(): PublicationDateVO {
    return this.PublicationDate;
  }
  public set _PublicationDate(value: PublicationDateVO) {
    this.PublicationDate = value;
  }

  public get _Rating(): RatingVO {
    return this.Rating;
  }
  public set _Rating(value: RatingVO) {
    this.Rating = value;
  }

  public get _Direction(): DirectionVO {
    return this.Direction;
  }
  public set _Direction(value: DirectionVO) {
    this.Direction = value;
  }

  public get _Sector(): SectorVO {
    return this.Sector;
  }
  public set _Sector(value: SectorVO) {
    this.Sector = value;
  }

  public get _Budget(): BudgetVO {
    return this.Budget;
  }
  public set _Budget(value: BudgetVO) {
    this.Budget = value;
  }

  public get _Description(): DescriptionVO {
    return this.Description;
  }
  public set _Description(value: DescriptionVO) {
    this.Description = value;
  }

  public get _application(): Application[] {
    return this.application;
  }
  public set _application(value: Application[]) {
    this.application = value;
  }

  public createApplication(
    candidateId: string,
    budget: number,
    description: string,
    time: number): void {

    this.Apply(new CandidateApplied(
      candidateId,
      this.OfferId._value,
      budget,
      description,
      time));
  }
}
