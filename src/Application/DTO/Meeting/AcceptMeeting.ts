export class AcceptMeeting {
  public candidateId: string;
  public meetingId: string;
  constructor(candidateId: string, meetingId: string) {
    this.candidateId = candidateId;
    this.meetingId = meetingId;
  }
}
