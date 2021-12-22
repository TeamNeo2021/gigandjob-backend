import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingStates, MeetingStateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingCanceledEvent implements IDomainEvent {
  public readonly dateTimeOcurred: Date;
  public readonly state: MeetingStateVO;
  public readonly id: MeetingIDVO

  constructor(id: MeetingIDVO){
    this.id = id;
    this.dateTimeOcurred = new Date(Date.now());
    this.state = new MeetingStateVO(MeetingStates.Canceled)
  }
}