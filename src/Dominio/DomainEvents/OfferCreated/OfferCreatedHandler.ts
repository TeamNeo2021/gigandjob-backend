import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { RatingVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { SectorVO} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVO';
import { OfferStateVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVO';
import { AggregateRoot } from '../../AggRoots/AggregateRoot';
import { IDomainEvent } from '../IDomainEvent';
import { IDomainEventHandler } from '../IDomainEventHandler';
import { OfferCreated } from './OfferCreated';


export class OfferCreatedHandler implements IDomainEventHandler {
  handle(event: OfferCreated, entity: Offer): void {
    entity._State = new OfferStateVO(event.State);
    //entity._PublicationDate = new PublicationDateVO(event.PublicationDate);
    entity._Rating = new RatingVO(event.Rating);
    entity._Direction = new DirectionVO(event.Direction);
    entity._Sector = new SectorVO(event.Sector);
    entity._Budget = new BudgetVO(event.Budget);
    entity._Description = new DescriptionVO(event.Description);

  }
}