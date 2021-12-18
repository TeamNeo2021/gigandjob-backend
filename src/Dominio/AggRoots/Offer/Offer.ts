import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
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
import { OfferStateVO } from './ValueObjects/OfferStateVO';
import { Application } from './Application/Application';

export class Offer extends AggregateRoot implements IInternalEventHandler {

    private OfferId: OfferIdVO;
    private State: OfferStateVO;
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
        const valid = this.OfferId != null; /*&&
          
          Comentaré esto por ahora ya que no se han implementado los demás value objects
          Aqui iria ej: this.Rating != null*/
        if (!valid) {
          throw new Error('Verificacion de estado fallido');
        }
      }

     /* protected EnsureValidState(): void {
        let valid =
            this.id != null &&
            this.budget != null &&
            this.description != null &&
            this.time != null;
            switch (this.state.current) {
                case ApplicationStates.Active: 
                    if (this.previous_state.current == ApplicationStates.Inactive){
                        throw new Error("Invalid change of application state");
                    }
                    break;
                case ApplicationStates.Inactive: 
                    if (this.previous_state.current == ApplicationStates.Inactive){
                        throw new Error("Invalid change of application state");
                    }
                    break;
                default:
                    break;
            };

        if (!valid){
            throw new Error("Invalid state for application");
        }
        
     }*/

      //Implementacion de crearOferta con domain event
      public CrearOferta(
        /*
          State: OfferStateVO,
          PublicationDate: PublicationDateVO,
          Rating: RatingVO,
          Direction: DirectionVO,
          Sector: Sectors,
          //Sectors es el VO de sector en la entidad de offer
          Budget: BudgetVO,
          Description: DescriptionVO*/

          State: number,
          PublicationDate: Date,
          Rating: number,
          Direction: string,
          Sector: number,
          //Sectors es el VO de sector en la entidad de offer
          Budget: number,
          Description: string,
          application: Application[]

      ) {
        console.log('RE');
        this.Apply(
          new OfferCreated(
            State,
            PublicationDate,
            Rating,
            Direction,
            Sector,
            Budget,
            Description,
            application
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