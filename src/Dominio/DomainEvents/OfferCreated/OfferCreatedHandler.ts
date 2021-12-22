import { Application } from '../../AggRoots/Offer/Application/Application';
import { Offer } from '../../AggRoots/Offer/Offer';
import { BudgetVO } from '../../AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from '../../AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { PublicationDateVO } from '../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../AggRoots/Offer/ValueObjects/OfferRatingVO';
import { SectorVO} from '../../AggRoots/Offer/ValueObjects/OfferSectorVO';
import { OfferStateVO } from '../../AggRoots/Offer/ValueObjects/OfferStateVO';
import { AggregateRoot } from '../../AggRoots/AggregateRoot';
import { IDomainEvent } from '../IDomainEvent';
import { IDomainEventHandler } from '../IDomainEventHandler';
import { OfferCreated } from './OfferCreated';


export class OfferCreatedHandler implements IDomainEventHandler {
  handle(event: OfferCreated, entity: Offer): void {
    entity._State = (event.State);
    entity._PublicationDate = (event.PublicationDate);
    entity._Rating = (event.Rating);
    entity._Direction = (event.Direction);
    entity._Sector = (event.Sector);
    entity._Budget = (event.Budget);
    entity._Description = (event.Description);
  }
}