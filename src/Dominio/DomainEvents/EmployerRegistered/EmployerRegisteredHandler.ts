
import { AggregateRoot } from '../../AggRoots/AggregateRoot';
import { IDomainEvent } from '../IDomainEvent';
import { IDomainEventHandler } from '../IDomainEventHandler';
import { EmployerRegistered } from './EmployerRegistered';
import { Employer } from '../../AggRoots/Employer/Employer';
import { EmployerNameVO } from '../../AggRoots/Employer/ValueObjects/EmployerNameVO';
import {
  EmployerStateVO,
  EmployerStates,
} from '../../AggRoots/Employer/ValueObjects/EmployerStateVO';

export class EmployerRegisteredHandler implements IDomainEventHandler {
  handle(event: EmployerRegistered, entity: Employer): void {
    entity.name = event.name;
    entity.description = event.description;
    entity.state = event.state;
  }
}

