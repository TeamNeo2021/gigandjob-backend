import { IDomainEvent } from "../IDomainEvent";

export class MeetingModifiedEvent implements IDomainEvent {
    public readonly dateTimeOcurred: Date;

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());
    }
}

/*
import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingIDVO } from "../../AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { MeetingStateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingModifyEvent implements IDomainEvent {
    public readonly dateTimeOcurred: Date;
    public readonly id: MeetingIDVO;
    public readonly date: MeetingDateVO | undefined;
    public readonly description: MeetingDescriptionVO | undefined;
    public readonly location: MeetingLocationVO | undefined;
    public readonly state: MeetingStateVO | undefined;

    constructor(
        id: MeetingIDVO, 
        description?: MeetingDescriptionVO,
        location?: MeetingLocationVO,
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.id = id
        this.description = description;
        this.location = location;
    }
}
*/