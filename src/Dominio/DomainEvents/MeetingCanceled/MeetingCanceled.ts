import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingStateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { IDomainEvent } from "../IDomainEvent";


export class MeetingCanceled implements IDomainEvent {
  public dateTimeOcurred: Date;
  public meetingId: MeetingIDVO;
  public state: MeetingStateVO;

  constructor(meetingId: MeetingIDVO, state: MeetingStateVO) {
    this.dateTimeOcurred = new Date(Date.now());
    this.meetingId = meetingId;
    this.state = state;
  }
}