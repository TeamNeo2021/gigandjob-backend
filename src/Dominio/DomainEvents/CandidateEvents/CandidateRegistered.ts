import { Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
import { IDomainEvent } from '../IDomainEvent';

export class CandidateRegisteredDomainEvent implements IDomainEvent {
  dateTimeOcurred: Date;

  constructor(public readonly candidate: Candidate) {
    this.dateTimeOcurred = new Date();
    console.log('DomainEvent: Se ha registrado el candidato: ', candidate.Id);
    console.log('Registrado en: ', this.dateTimeOcurred);
  }
}
