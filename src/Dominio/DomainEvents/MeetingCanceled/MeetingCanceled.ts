import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingStateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { IDomainEvent } from "../IDomainEvent";


export class MeetingCanceled implements IDomainEvent {
  public dateTimeOcurred: Date;
  public meeting: MeetingIDVO;
  public state: MeetingStateVO;

  constructor(meeting: MeetingIDVO, state: MeetingStateVO) {
    this.dateTimeOcurred = new Date(Date.now());
    this.meeting = meeting;
    this.state = state;
  }
}