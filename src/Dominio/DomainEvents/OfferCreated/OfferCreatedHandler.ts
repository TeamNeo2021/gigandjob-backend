import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { DescriptionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferStateVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVO';
import { AggregateRoot } from '../../AggRoots/AggregateRoot';
import { IDomainEvent } from '../IDomainEvent';
import { IDomainEventHandler } from '../IDomainEventHandler';
import { OfferCreated } from './OfferCreated';


export class OfferCreatedHandler implements IDomainEventHandler {
  handle(event: OfferCreated, entity: Offer): void {
    //entity.Description = new DescriptionVO(event.Description);
    entity._State = new OfferStateVO(entity._State);
  }
}