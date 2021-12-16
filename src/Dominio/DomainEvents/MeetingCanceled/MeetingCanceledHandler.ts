import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { MeetingCanceled } from "./MeetingCanceled";

export class MeetingCanceledHandler implements IDomainEventHandler {
  handle(event: MeetingCanceled, aggregate: Meeting): void{
    aggregate.state = event.state;
  }
}