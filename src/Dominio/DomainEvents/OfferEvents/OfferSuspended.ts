import { IDomainEvent } from '../IDomainEvent';

export class OfferSuspended implements IDomainEvent {
  public dateTimeOcurred: Date;

  //guarda si su suspension fue debido a la suspension del empleador
  public isSuspendedEmployer: Boolean;

  constructor(isSuspendedEmployer: Boolean) {
    this.dateTimeOcurred = new Date(Date.now());
    this.isSuspendedEmployer = isSuspendedEmployer;
  }
}
