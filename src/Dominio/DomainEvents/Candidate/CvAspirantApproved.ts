import { Candidate } from '../../AggRoots/Candidate/Candidate';
import { IDomainEvent } from '../IDomainEvent';

export class CvAspirantApproved  implements IDomainEvent {
    public dateTimeOcurred: Date;
 
    constructor(public readonly Candidate:Candidate) {
        this.dateTimeOcurred = new Date(Date.now());
        console.log('DomainEvent: Se ha aprobado el CV del candidato: ',this.Candidate.Id)
        console.log('Aprobado el: ', this.dateTimeOcurred)
    }
}