import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { IDomainEvent } from '../IDomainEvent';

export class SuspendedCandidateDomainEvent implements IDomainEvent {
  dateTimeOcurred: Date;
  candidate_id: CandidateIdVo;

  constructor(id: CandidateIdVo) {
    this.dateTimeOcurred = new Date();
    this.candidate_id = id;
  }
}
