export class DashboardWebModelDTO {
  public meetings: number;
  public employers: number;
  public users: number;
  public date: Date;

  constructor(meetings: number, employers: number, users: number, date: Date) {
    this.meetings = meetings;
    this.employers = employers;
    this.users = users;
    this.date = date;
  }
}
