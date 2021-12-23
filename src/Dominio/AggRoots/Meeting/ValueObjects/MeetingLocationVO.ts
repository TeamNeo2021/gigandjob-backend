import { EmptyMeetingLocation } from "../Errors/EmptyMeetingLocation.error";

export class MeetingLocationVO {

    private value: string;
    constructor(value: string) {
        if (value == '') {
            throw new EmptyMeetingLocation();
        }
        this.value = value;
    }

    getValue(){
        return this.value;
    }
}