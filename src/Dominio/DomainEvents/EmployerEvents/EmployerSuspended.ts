import { IDomainEvent } from '../IDomainEvent';

export class EmployerSuspended implements IDomainEvent {
  public dateTimeOcurred: Date;

  constructor() {
    this.dateTimeOcurred = new Date(Date.now());
  }
}
