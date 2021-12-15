import { AggregateRoot } from '../AggRoots/AggregateRoot';
import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';
import { EmployerRegistered } from './EmployerRegistered';
import { Employer } from '../AggRoots/Employer/Employer';
import { EmployerNameVo } from '../AggRoots/Employer/ValueObjects/EmployerNameVo';

export class EmployerRegisteredHandler implements IDomainEventHandler {
  handle(event: EmployerRegistered, entity: Employer): void {
    entity.Name = new EmployerNameVo(event.Name);
    entity.Description = event.Description;
  }
}
