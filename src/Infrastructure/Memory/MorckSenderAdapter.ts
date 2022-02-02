import { OfferSuspended } from 'src/Dominio/DomainEvents/OfferEvents/OfferSuspended';
import { INotificationSender } from '../../Application/Ports/INotificationSender';
import { CandidateApplied } from '../../Dominio/DomainEvents/CandidateEvents/CandidateApplied';
import { IDomainEvent } from '../../Dominio/DomainEvents/IDomainEvent';

export class MockSenderAdapter implements INotificationSender {
  public NotificatedIds: String[] = [];
  send(target: string, event: IDomainEvent): void {
    switch (event.constructor) {
      case CandidateApplied:
        console.log('Sending notification to employer: ' + target);
        this.NotificatedIds.push(target);
        break;
      case OfferSuspended:
        console.log('Sending notification offer suspended to employer: ' + target);
        this.NotificatedIds.push(target);
        break;
      default:
        throw new Error(
          `MockNotificationSender: Event doesn't exist: ${event.constructor}`,
        );
        break;
    }
  }
}
