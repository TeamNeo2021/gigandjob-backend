export class RejectMeeting {
  public candidateId: String;
  public meetingId: String;
  constructor(candidateId: String, meetingId: String) {
    this.candidateId = candidateId;
    this.meetingId = meetingId;
  }
}
