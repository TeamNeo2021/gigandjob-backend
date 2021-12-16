export class MeetingDateVO {
    value: Date;
    constructor(value: Date) {
        let today = new Date();
        if (value >= today){
            this.value = value
        }
        else {
            throw new Error("The date entered cannot be earlier than the current date");
        }
    }
}