import { InvalidMeetingDescriptionError } from "../Errors/InvalidMeetingDescription.error";

export class MeetingDescriptionVO {
    public value: string;

    constructor(v: string) {
        if (v == null) {
            throw InvalidMeetingDescriptionError.emptyDescription();
        }
        if (v.length >= 250) {
            throw  InvalidMeetingDescriptionError.invalidDescriptionLength();
        }
        this.value = v;
    }
}