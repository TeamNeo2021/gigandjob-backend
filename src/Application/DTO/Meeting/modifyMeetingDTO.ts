import { LocationDTO } from '../Location.dto';

export class ModifyMeetingDTO {
  public id: string;
  public state: string;
  public description: string;
  public date: Date;
  public location: LocationDTO;

  constructor(
    $id: string,
    $state: string,
    $description: string,
    $date: Date,
    $location: LocationDTO,
  ) {
    this.id = $id;
    this.state = $state;
    this.description = $description;
    this.date = $date;
    this.location = $location;
  }
}
