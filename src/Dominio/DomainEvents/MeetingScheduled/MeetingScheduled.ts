import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingScheduled implements IDomainEvent {
    public dateTimeOcurred: Date;
    public meeting: MeetingIDVO;
    public appointment: MeetingDateVO;

    constructor(meeting: MeetingIDVO, appointment: MeetingDateVO) {
        this.dateTimeOcurred = new Date(Date.now());
        this.meeting = meeting;
        this.appointment = appointment;
    }
}
