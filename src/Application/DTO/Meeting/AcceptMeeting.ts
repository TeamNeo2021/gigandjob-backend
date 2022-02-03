export class AcceptMeeting {
  public candidateId: string;
  public meetingId: String;
  constructor(candidateId: string, meetingId: String) {
    this.candidateId = candidateId;
    this.meetingId = meetingId;
  }
}
