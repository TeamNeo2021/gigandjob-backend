import { InvalidMeetingDate } from "../Errors/InvalidMeetingDate.error";

export class MeetingDateVO {
    value: Date;
    constructor(value: Date) {
        let today = new Date();
        if (Date == null || Date == undefined){
            throw  new InvalidMeetingDate();
        }
        else if (value >= today){
            this.value = value
        }
        else {
            throw InvalidMeetingDate.MeetingDateExpired();
        }
    }
}