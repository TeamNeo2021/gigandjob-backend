import { IDomainEvent } from '../IDomainEvent';

export class MeetingAccepted implements IDomainEvent {
  public dateTimeOcurred: Date;
  public MeetingId: String;
  public CandidateId: String;

  constructor(MeetingId: String, CandidateId: String) {
    this.dateTimeOcurred = new Date(Date.now());
    this.MeetingId = MeetingId;
    this.CandidateId = CandidateId;
  }
}
