import { InvalidMeetingDate } from "../Errors/InvalidMeetingDate.error";

export class MeetingDateVO {
    value: Date;
    constructor(value: Date) {
        let today = new Date();
        let clean_today = new Date(today.getFullYear(),today.getMonth(), today.getDay())
        if (Date == null || Date == undefined){
            throw  new InvalidMeetingDate();
        }
        else if (value >= clean_today){
            this.value = value
        }
        else {
            throw InvalidMeetingDate.MeetingDateExpired();
        }
    }

    public LessThan(date: MeetingDateVO): boolean{
        if (this.value < date.value){
            return true
        }
        return false
    }
}