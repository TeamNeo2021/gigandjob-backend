export class DashboardWebModelDTO{
    public meetings: number;
    public employers: number;
    public users: number;

    constructor(
        meetings: number,
        employers: number,
        users: number)
    {
        this.meetings = meetings;
        this.employers = employers;
        this.users = users;
    }
}