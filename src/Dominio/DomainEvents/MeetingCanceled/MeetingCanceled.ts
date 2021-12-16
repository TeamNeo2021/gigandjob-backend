import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { IDomainEvent } from "../IDomainEvent";


export class MeetingCanceled implements IDomainEvent {
  public dateTimeOcurred: Date;
  public meeting: Meeting;

  constructor(meeting: Meeting) {
    this.dateTimeOcurred = new Date(Date.now());
    this.meeting = meeting;
  }

  // getMeetingId (): any /*UniqueEntityID*/ {
  //   // The correct way to get the id must be implemented
  //   // return this.meeting.id;
  // }
}
