import { Candidate } from '../AggRoots/Candidate/Candidate';
import { CvAspirantApproved } from './CvAspirantApproved';
import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';


export class CvAspirantApprovedHandler implements IDomainEventHandler {
    handle(event: CvAspirantApproved, entity: Candidate): void {
        entity.Cv=event.CvAspirantApproved;
    }
}