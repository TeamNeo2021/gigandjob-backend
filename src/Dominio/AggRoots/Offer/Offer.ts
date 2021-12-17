import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { OfferIdVO } from './ValueObjects/OfferIdVO';
import { BudgetVO } from './ValueObjects/OfferBudgetVO';
import { DirectionVO } from './ValueObjects/OfferDirectionVO';
import { DescriptionVO } from './ValueObjects/OfferDescriptionVO';
import { RatingVO } from './ValueObjects/OfferRatingVO';
//import { OfferCreatedHandler } from '../../DomainEvents/OffererRegisteredHandler';
//import { OfferRegistered } from '../../DomainEvents/OffererRegistered';
import { Sectors } from './ValueObjects/offerSectorVo';

export class Offer extends AggregateRoot implements IInternalEventHandler {

    private OfferId: OfferIdVO;
    //private State: OfferStateVo;
    //private PublicationDate: PublicationDateVo;
    private Rating: RatingVO;
    private Direction: DirectionVO;
    private Sector: Sectors;
    //Sectors es el VO de sector en la entidad de offer
    private Budget: BudgetVO;
    private Description: DescriptionVO;

    constructor() {
      super();
      //Por ahora ya que no se han implementdo los value objects
      this.OfferId = new OfferIdVO(Date().toString());
    }
    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
      }
      protected EnsureValidState(): void {
        const valid = this.OfferId != null; /*&&
          
          Comentaré esto por ahora ya que no se han implementado los demás value objects
          Aqui iria ej: this.Rating != null*/
        if (!valid) {
          throw new Error('Verificacion de estado ha fallado, estado inválido');
        }
      }

      //Implementacion de crearoferta con domain event
      /*public CrearOferta(
          private OfferId: OfferIdVO;
          private State: OfferStateVo;
          private PublicationDate: PublicationDateVo;
          private Rating: RatingVO;
          private Direction: DirectionVO;
          private Sector: SectorVO;
          private Budget: BudgetVO;
          private Description: DescriptionVO;
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
          ),
          new OfferCreatedHandler(),
        );
      }*/
  
    //Getters y setters

    /*public get _State(): OfferStateVo {
      return this.State;
    }
    public set _State(value: OfferStateVo) {
      this.State = value;
    }*/
  }