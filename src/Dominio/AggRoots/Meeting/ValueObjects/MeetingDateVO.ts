import { InvalidMeetingDate } from "../Errors/InvalidMeetingDate.error";

export class MeetingDateVO {
    constructor(public value: Date) {}

    public LessThan(date: MeetingDateVO): boolean{
        if (this.value < date.value){
            return true
        }
        return false
    }

    static Create(value: Date) {
        let today = new Date();
        if (today == null || today == undefined){
            throw new InvalidMeetingDate();
        }
        else if (value >= today) {
            return new MeetingDateVO(value);
        }
        else {
            throw InvalidMeetingDate.MeetingDateExpired();
        }

    }

    static Unsafe(value: Date) {
        return new MeetingDateVO(value)
    }
}