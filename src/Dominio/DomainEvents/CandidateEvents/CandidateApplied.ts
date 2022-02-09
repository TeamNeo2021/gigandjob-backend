import { IDomainEvent } from '../IDomainEvent';

export class CandidateApplied implements IDomainEvent {
  dateTimeOcurred: Date;

  candidateId: string;
  offerId: string;
  budget: number;
  description: string;
  time: number;

  constructor(
    candidateId: string,
    offerId: string,
    budget: number,
    description: string,
    time: number,
  ) {
    this.dateTimeOcurred = new Date();
    (this.candidateId = candidateId), (this.offerId = offerId);
    this.budget = budget;
    this.description = description;
    this.time = time;
  }
}
