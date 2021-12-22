import { AggregateRoot } from '../AggregateRoot';
import { OfferIdVO } from './ValueObjects/OfferIdVO';
import { BudgetVO } from './ValueObjects/OfferBudgetVO';
import { DirectionVO } from './ValueObjects/OfferDirectionVO';
import { DescriptionVO } from './ValueObjects/OfferDescriptionVO';
import { RatingVO } from './ValueObjects/OfferRatingVO';
import { OfferCreated } from '../../DomainEvents/OfferCreated/OfferCreated';
import { SectorVO } from './ValueObjects/OfferSectorVO';
import { OfferStateVO, OfferStatesEnum } from './ValueObjects/OfferStateVO';
import { Application } from './Application/Application';
import { OfferModified } from '../../DomainEvents/OfferModified/OfferModified';
import { PublicationDateVO } from './ValueObjects/OfferPublicationDateVO';
import { threadId } from 'worker_threads';
import { CandidateApplied } from 'src/Dominio/DomainEvents/Candidate/CandidateApplied';
import { ApplicationId } from './Application/Value Objects/ApplicationId';
import { ApplicationState, ApplicationStates } from './Application/Value Objects/ApplicationStates';
import { ApplicationBudget } from './Application/Value Objects/ApplicationBudget';
import { ApplicationDescription } from './Application/Value Objects/ApplicationDescription';
import { ApplicationTime } from './Application/Value Objects/ApplicationTime';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';
import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';


export class Offer extends AggregateRoot{

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
      this.PublicationDate =publicationDate;
      this.Rating = rating;
      this.Direction = direction;
      this.Sector = sector;
      this.Budget = budget;
      this.Description = description;
      this.application = [];

    }

    protected When(event: IDomainEvent): void {     

      switch(event.constructor){
        case OfferCreated:
          const eventOfferCreated:OfferCreated=event as OfferCreated;
          this._State = (eventOfferCreated.State);
          this._PublicationDate = (eventOfferCreated.PublicationDate);
          this._Rating = (eventOfferCreated.Rating);
          this._Direction = (eventOfferCreated.Direction);
          this._Sector = (eventOfferCreated.Sector);
          this._Budget = (eventOfferCreated.Budget);
          this._Description = (eventOfferCreated.Description);
          break;
        case OfferModified:
          const eventOfferModified:OfferModified=event as OfferModified;
          this._State = (eventOfferModified.state);
          this._PublicationDate = (eventOfferModified.publicationDate);
          this._Rating = (eventOfferModified.rating);
          this._Direction = (eventOfferModified.direction);
          this._Sector = (eventOfferModified.sector);
          this._Budget = (eventOfferModified.budget);
          this._Description = (eventOfferModified.description);
          break;
        case CandidateApplied:
            const eventCandidateApplied: CandidateApplied = event as CandidateApplied;
            var _application = new Application(
              this.Apply,
              new ApplicationId(event.candidateId), 
              new CandidateIdVo(),//Aggregate trespassing
              new ApplicationState(),
              new ApplicationBudget(event.budget),
              new ApplicationDescription(event.description),
              new ApplicationTime(event.time)
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
        this.Direction!= null &&
        this.Sector != null &&
        this.Budget != null &&
        this.Description != null;
        const changes = this.GetChanges();

        //Create offer
            
          if (((this.State.state == OfferStatesEnum.Suspended) || 
              (this.State.state == OfferStatesEnum.Closed) || 
              (this.State.state == OfferStatesEnum.Eliminated))&&
              (changes.length == 0))
              {
            throw new Error("La oferta recién creada solo puede ser activa");
              } 
       //Modify offer 
      else{
        const last_change = changes[changes.length-1]      
        if (last_change instanceof OfferModified){           
          //se verifica el estado del ultimo evento si este fue una oferta modificada
          switch (last_change.state.state) {
            case OfferStatesEnum.Active:
              //si el estado anterior es activa y el nuevo es cerrada y no tiene aplicaciones
              if ((this.State.state == OfferStatesEnum.Closed)&&(this.application.length == 0)){
                  throw new Error("No se puede cerrar sin una Aplicación");
              }
              break;
            case OfferStatesEnum.Suspended:
              //si el estado anterior es suspendida y el nuevo es cerrada
              if (this.State.state == OfferStatesEnum.Closed){
                  throw new Error("No se puede cerrar la oferta ya que está suspendida");
              }
              break;    
            case OfferStatesEnum.Closed:
              //si el estado anterior es cerrada y el nuevo es activa o suspendida
              if ((this.State.state == OfferStatesEnum.Active) || (this.State.state == OfferStatesEnum.Suspended)){
                throw new Error("Ya la oferta está concretada, no se puede abrir o suspender");
              }
              break;
            case OfferStatesEnum.Eliminated:
              //si el estado anterior es eliminada no puede cambiar su estado de nuevo
              if ((this.State.state == OfferStatesEnum.Active) ||
                  (this.State.state == OfferStatesEnum.Suspended)|| 
                  (this.State.state == OfferStatesEnum.Closed)){
                  throw new Error("Ya la oferta está eliminada, no puede cambiar su estado, jamás");
              }
              break; 
            default:
              break;
          } 
        }else {     
          //si el evento anterior es oferta creada y el nuevo estado es cerrada sin aplicaciones
          if ((this.State.state == OfferStatesEnum.Closed)&&(this.application.length == 0)){
            throw new Error("No se puede cerrar sin una Aplicación");
          }
        } 
      }
      //algunos de los VO es nulo
      if (!valid) {
        throw new Error('Verificacion de estado fallido');
      }
    }

      //Modificar oferta
      public ModifyOffer(       
        
        state: OfferStateVO,
        publicationDate: PublicationDateVO,
        rating: RatingVO,
        direction: DirectionVO,
        sector: SectorVO,
        budget: BudgetVO,        
        description: DescriptionVO,        
      ) {
        console.log('Modificar Oferta');
        this.Apply(
          new OfferModified(
            state,
            publicationDate,
            rating,
            direction,
            sector,
            budget,
            description,            
          )
        );
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
        let offer = new Offer(id, State,PublicationDate,Rating,Direction,Sector,Budget,Description,)
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