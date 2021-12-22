import { IInternalEventHandler } from '../IInternalEventHandler';
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
      //this.OfferId = offerId();
      this.OfferId = new OfferIdVO(Date().toString());
      this.State = state;
      this.PublicationDate =publicationDate;
      this.Rating = rating;
      this.Direction = direction;
      this.Sector = sector;
      this.Budget = budget;
      this.Description = description;
      this.application = [];

    }
    protected When(event: any): void {
        //handler.handle(event, this);

        switch(event.constructor){
          case OfferCreated:
            this._State = (event.State);
            this._PublicationDate = (event.PublicationDate);
            this._Rating = (event.Rating);
            this._Direction = (event.Direction);
            this._Sector = (event.Sector);
            this._Budget = (event.Budget);
            this._Description = (event.Description);
            break;
          case OfferModified:
            this._State = (event.State);
            this._PublicationDate = (event.PublicationDate);
            this._Rating = (event.Rating);
            this._Direction = (event.Direction);
            this._Sector = (event.Sector);
            this._Budget = (event.Budget);
            this._Description = (event.Description);
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
          //se verifira el estado del ultimo evento si este fue una oferta modificada
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
        console.log('Crear Oferta');
        this.Apply(
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
  }