import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { IDomainEvent } from "../IDomainEvent";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { MeetingScheduled } from "./MeetingScheduled";

export class MeetingScheduledHandler implements IDomainEventHandler {
  handle(event: MeetingScheduled, aggregate: Meeting): void{
      aggregate.date = event.appointment
  }
}