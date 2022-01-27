import { IDomainEvent } from "../IDomainEvent";

export class MeetingScheduledEvent implements IDomainEvent {
    public readonly dateTimeOcurred: Date;

    constructor() {
        this.dateTimeOcurred = new Date(Date.now());
    }
}

/*
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { EmployerIdVO } from "../../AggRoots/Employer/ValueObjects/EmployerIdVO";
import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingIDVO } from "../../AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { MeetingStateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { IDomainEvent } from "../IDomainEvent";

export class MeetingScheduledEvent implements IDomainEvent {
    public readonly dateTimeOcurred: Date;
    public readonly id: MeetingIDVO;
    public readonly date: MeetingDateVO;
    public readonly employer: EmployerIdVO;
    public readonly candidate: CandidateIdVo;
    public readonly description: MeetingDescriptionVO;
    public readonly location: MeetingLocationVO;
    public readonly state: MeetingStateVO;

    constructor(
        id: MeetingIDVO, 
        date: MeetingDateVO,
        employer: EmployerIdVO,
        candidate: CandidateIdVo,
        description: MeetingDescriptionVO,
        location: MeetingLocationVO,
        state: MeetingStateVO
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.id = id
        this.date = date;
        this.employer = employer;
        this.candidate = candidate;
        this.description = description;
        this.location = location;
        this.state = state;
    }
}
*/