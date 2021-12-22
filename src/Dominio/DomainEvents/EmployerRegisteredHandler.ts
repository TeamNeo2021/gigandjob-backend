
import { AggregateRoot } from '../AggRoots/AggregateRoot';
import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';
import { EmployerRegistered } from './EmployerRegistered';
import { Employer } from '../AggRoots/Employer/Employer';
import { EmployerNameVo } from '../AggRoots/Employer/ValueObjects/EmployerNameVo';
import {
  EmployerStateVo,
  EmployerStates,
} from '../AggRoots/Employer/ValueObjects/EmployerStateVo';

export class EmployerRegisteredHandler implements IDomainEventHandler {
  handle(event: EmployerRegistered, entity: Employer): void {
    entity.name = new EmployerNameVo(event.Name);
    entity.description = event.Description;
    entity.state = new EmployerStateVo(event.State);
  }
}
