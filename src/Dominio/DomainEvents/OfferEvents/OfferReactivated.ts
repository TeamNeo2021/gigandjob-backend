import { IDomainEvent } from '../IDomainEvent';

export class OfferReactivated implements IDomainEvent {
  dateTimeOcurred: Date;

  constructor() {
    this.dateTimeOcurred = new Date(Date.now());
  }
}
