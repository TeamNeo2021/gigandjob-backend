import { randomUUID } from "crypto"
import { InvalidMeetingIdError } from "../../AggRoots/Meeting/Errors/InvalidMeetingId.error"
import { MeetingIDVO } from "../../AggRoots/Meeting/ValueObjects/MeetingIDVO"

describe("Meeting identity", () => {
    it("should fail when empty id is used", () => {
        expect(() => new MeetingIDVO("")).toThrowError(InvalidMeetingIdError)
    })
    it("should fail when invalid id is used", () => {
        expect(() => new MeetingIDVO("asdasfddasfa")).toThrowError(InvalidMeetingIdError) // Non UUID string
        expect(() => new MeetingIDVO("944fadf6603d-4901-958a-591b94dbdae")).toThrowError(InvalidMeetingIdError) // Invalid length: 32
        expect(() => new MeetingIDVO("944fadf6603d4901-958a-591b94dbdaec")).toThrowError(InvalidMeetingIdError) // Missing a separator
        expect(() => new MeetingIDVO("w44fadf6603d4901-958a-591b94dbdaec")).toThrowError(InvalidMeetingIdError) // Invalid hex-character: w
    })
    it("should create when no parameters are passed", () => {
        expect(new MeetingIDVO().id).not.toBe("")
    })
    it("should create when valid UUID is passed", () => {
        expect(new MeetingIDVO(randomUUID())).toBeInstanceOf(MeetingIDVO)
    })
})