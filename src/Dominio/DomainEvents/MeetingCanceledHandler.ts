import { Meeting } from "../AggRoots/Meeting/Meeting";
import { IDomainEventHandler } from "./IDomainEventHandler";
import { MeetingCanceled } from "./MeetingCanceled";

export class MeetingCanceledHandler implements IDomainEventHandler {
  handle(event: MeetingCanceled, entity: Meeting): void {
    // The method to change the state of the entity must be implemented
    // event.meeting.changeState('Cancel')
  }
}
