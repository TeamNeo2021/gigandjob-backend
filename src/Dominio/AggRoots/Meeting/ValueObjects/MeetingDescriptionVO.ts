export class MeetingDescriptionVO {
    public value: string;

    constructor(v: string) {
        if (v == null) {
            throw new TypeError(
                'Meeting Description cannot be empty'
            );
        }
        if (v.length >= 500) {
            throw new RangeError(
                'Meeting Description cannot have more than 500 characters'
            );
        }
        this.value = v;
    }
}