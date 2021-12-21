import { IDomainEvent } from '../../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../../DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { OfferIdVO } from './ValueObjects/OfferIdVO';
import { BudgetVO } from './ValueObjects/OfferBudgetVO';
import { DirectionVO } from './ValueObjects/OfferDirectionVO';
import { DescriptionVO } from './ValueObjects/OfferDescriptionVO';
import { RatingVO } from './ValueObjects/OfferRatingVO';
import { OfferCreatedHandler } from '../../DomainEvents/OfferCreated/OfferCreatedHandler';
import { OfferCreated } from '../../DomainEvents/OfferCreated/OfferCreated';
import { SectorVO } from './ValueObjects/OfferSectorVO';
import { OfferStateVO, OfferStatesEnum } from './ValueObjects/OfferStateVO';
import { Application } from './Application/Application';
import { OfferModified } from '../../DomainEvents/OfferModified/OfferModified';
import { OfferModifiedHandler } from '../../DomainEvents/OfferModified/OfferModifiedHadler';
import { PublicationDateVO } from './ValueObjects/OfferPublicationDateVO';

export class Offer extends AggregateRoot implements IInternalEventHandler {

    private OfferId: OfferIdVO;
    private State: OfferStateVO;
    private Before_State: OfferStateVO;
    //Necesitamos un estado de visible o no? debido a las denuncias
    //private Visible: OfferStateVO;
    private PublicationDate: PublicationDateVO;
    private Rating: RatingVO;
    private Direction: DirectionVO;
    private Sector: SectorVO;
    //Sectors es el VO de sector en la entidad de offer
    private Budget: BudgetVO;
    private Description: DescriptionVO;
    private application: Application[];

    constructor(
      offerId: OfferIdVO,
      state: OfferStateVO,
      publicationDate: PublicationDateVO,
      rating: RatingVO,
      sector: SectorVO,
      budget: BudgetVO,
      description: DescriptionVO,
      app: Application[]

    ) {
      super();
      //Por ahora ya que el id no lo he podido resolver
      //this.OfferId = offerId();
      this.OfferId = new OfferIdVO(Date().toString());
      this.State = state;
      this.PublicationDate =publicationDate;
      this.Rating = rating;
      this.Sector = sector;
      this.Budget = budget;
      this.Description = description;
      this.application = app;

    }
    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
      }

      protected EnsureValidState(): void {
        const valid = this.OfferId != null        
        this.PublicationDate != null &&
        this.Rating != null &&
        this.Sector != null &&
        this.Budget != null &&
        this.Description != null;
        
        const changes = this.GetChanges();

       //last event 
        const last_change = changes[changes.length-1]

        
        //If it is not Candidate Suspended Event, then ignore
        if (last_change instanceof OfferModified){           
        
          switch (last_change.state.state) {
            case OfferStatesEnum.Active:
                if ((this.State.state = OfferStatesEnum.Closed)&&(this.application == null)){
                    throw new Error("No se puede cerrar sin una Aplicación");
                }
                break;
            case OfferStatesEnum.Suspended:
              if (this.Before_State.state == OfferStatesEnum.Closed){
                  throw new Error("No se puede cerrar la oferta ya que está suspendida");
              }
              break;    
              case OfferStatesEnum.Closed:
                if ((this.Before_State.state == OfferStatesEnum.Active) || (this.Before_State.state == OfferStatesEnum.Suspended)){
                    throw new Error("Ya la oferta está concretada, no se puede abrir o suspender");
                }
                break; 
            default:
                break;
        }
      }

        if (!valid) {
          throw new Error('Verificacion de estado fallido');
        }
      }

      //Modificar oferta
      public ModifyOffer(       
        //Arreglar para adjuntar lo del before_state 
        state: OfferStateVO,
        publicationDate: PublicationDateVO,
        rating: RatingVO,
        direction: DirectionVO,
        sector: SectorVO,
        budget: BudgetVO,        
        description: DescriptionVO,
        application: Application[],        
      ) {
        console.log('Oferta Modificada');
        this.Apply(
          new OfferModified(
            state,
            publicationDate,
            rating,
            direction,
            sector,
            budget,
            description,            
          ),
          new OfferModifiedHandler(),
        );
      }

      //Implementacion de crearOferta con domain event
      public CreateOffer(

          State: OfferStateVO,
          PublicationDate: PublicationDateVO,
          Rating: RatingVO,
          Direction: DirectionVO,
          Sector: SectorVO,
          Budget: BudgetVO,
          Description: DescriptionVO

         /* State: number,
          PublicationDate: Date,
          Rating: number,
          Direction: string,
          Sector: number,
          Budget: number,
          Description: string,*/


      ) {
        console.log('Oferta Creada');
        this.Apply(
          new OfferCreated(
            State,
            PublicationDate,
            Rating,
            Direction,
            Sector,
            Budget,
            Description,
          ),
          new OfferCreatedHandler(),
        );
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

    //Sectors es el VO de sector en la entidad de offer
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
  }