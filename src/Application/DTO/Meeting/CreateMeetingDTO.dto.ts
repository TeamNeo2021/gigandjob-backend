import { LocationDTO } from "../Location.dto";

export class CreateMeetingDTO {
  public candidate: string;
  public employer: string;
  public id: string;
  public state: string;
  public description: string;
  public date: Date;
  public location: LocationDTO;

  constructor(meetingData: any) {
    this.candidate = (meetingData.candidate);
    this.employer = (meetingData.employer);
    this.id = meetingData.id;
    this.state = meetingData.state;
    this.description = meetingData.description;
    this.date = meetingData.date;
    this.location = new LocationDTO(meetingData.location);
  }
}