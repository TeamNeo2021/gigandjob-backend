import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingScheduled implements IDomainEvent {
    public dateTimeOcurred: Date;
    public meetingId: MeetingIDVO;
    public appointment: MeetingDateVO;

    constructor(meetingId: MeetingIDVO, appointment: MeetingDateVO) {
        this.dateTimeOcurred = new Date(Date.now());
        this.meetingId = meetingId;
        this.appointment = appointment;
    }
}
