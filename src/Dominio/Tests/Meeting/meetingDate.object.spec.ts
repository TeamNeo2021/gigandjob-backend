import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO"
import { InvalidMeetingDate } from "../../AggRoots/Meeting/Errors/InvalidMeetingDate.error";


describe("Meeting date", () => {
    it("should not create when date is undefined", () => {
        expect(() => new MeetingDateVO(undefined)).toThrowError(InvalidMeetingDate)
    })
    it("should not create when date is null", () => {
        expect(() => new MeetingDateVO(null)).toThrowError(InvalidMeetingDate)
    })
    it("should not create when date has already passed", () => {
        let today = new Date(Date.now()-1000);
        expect(() => new MeetingDateVO(today)).toThrowError(InvalidMeetingDate)
    })
    it("should create when date is valid", () => {
        expect(new MeetingDateVO(new Date(Date.now()+1000))).toBeInstanceOf(MeetingDateVO)
    })
})