class ModifyMeetingDTO {
  public id: String;
  public state: string;
  public description: string;
  public date: Date;
  public location: LocationDTO;

  constructor(
    $id: String,
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
