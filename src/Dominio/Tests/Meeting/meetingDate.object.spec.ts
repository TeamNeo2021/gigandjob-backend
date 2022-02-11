import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO"
import { InvalidMeetingDate } from "../../AggRoots/Meeting/Errors/InvalidMeetingDate.error";


describe("Meeting date", () => {
    it("should not create when date is undefined", () => {
        expect(() => MeetingDateVO.Create(undefined)).toThrowError(InvalidMeetingDate)
    })
    it("should not create when date is null", () => {
        expect(() => MeetingDateVO.Create(null)).toThrowError(InvalidMeetingDate)
    })
    it("should not create when date has already passed", () => {
        let today = new Date(Date.now()-1000);
        expect(() => MeetingDateVO.Create(today)).toThrowError(InvalidMeetingDate)
    })
    it("should create when date is valid", () => {
        expect(MeetingDateVO.Create(new Date(Date.now()+1000))).toBeInstanceOf(MeetingDateVO)
    })
})