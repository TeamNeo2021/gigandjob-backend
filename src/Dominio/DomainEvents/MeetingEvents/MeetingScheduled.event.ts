import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingScheduledEvent implements IDomainEvent {
    public readonly dateTimeOcurred: Date;
    public readonly id: MeetingIDVO;
    public readonly appointment: MeetingDateVO

    constructor(id: MeetingIDVO, appointment: MeetingDateVO) {
        this.id = id;
        this.dateTimeOcurred = new Date(Date.now());
        this.appointment = appointment;
    }
}
