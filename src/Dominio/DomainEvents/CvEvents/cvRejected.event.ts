import { CvId } from 'src/Dominio/AggRoots/CV/ValueObjects/cvId.object';
import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';

export class CvRejectedDomainEvent implements IDomainEvent {
  dateTimeOcurred: Date;

  constructor(public readonly id: CvId) {}
}
