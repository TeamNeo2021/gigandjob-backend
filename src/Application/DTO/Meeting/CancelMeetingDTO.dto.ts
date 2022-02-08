export class CancelMeetingDTO{
    public id: String;
    public state: String;
    constructor(id: String){
        this.id=id;
        this.state = 'Canceled';
    }
}