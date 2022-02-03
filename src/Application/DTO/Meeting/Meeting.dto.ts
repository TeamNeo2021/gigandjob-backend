export class MeetingDTO {
  public candidate: CandidateDTO;
  public employer: EmployerDTO;
  public id: string;
  public state: string;
  public description: string;
  public date: Date;
  public location: LocationDTO;

  constructor(meetingData: any) {
    this.candidate = new CandidateDTO(meetingData.candidate);
    this.employer = new EmployerDTO(meetingData.employer);
    this.id = meetingData.id;
    this.state = meetingData.state;
    this.description = meetingData.description;
    this.date = meetingData.date;
    this.location = new LocationDTO(meetingData);
  }
}
