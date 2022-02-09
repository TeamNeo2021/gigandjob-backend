import { IDomainEvent } from '../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../DomainEvents/IDomainEventHandler';

export abstract class IAction implements IDomainEvent {
  //this is used to implement decorator pattern
  //esto seria lo mismo a un Domain Service?? no estoy claro
  dateTimeOcurred: Date;

  execute(object: any): any {
    this.dateTimeOcurred = new Date(); //today**
  }
}
