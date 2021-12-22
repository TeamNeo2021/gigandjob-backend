import { randomUUID } from "crypto"
import { InvalidMeetingIdError } from "../../AggRoots/Meeting/Errors/InvalidMeetingId.error"
import { MeetingIDVO } from "../../AggRoots/Meeting/ValueObjects/MeetingIDVO"

describe("Meeting identity", () => {
    it("should fail when empty id is used", () => {
        expect(() => new MeetingIDVO("")).toThrowError(InvalidMeetingIdError)
    })
    it("should fail when invalid id is used", () => {
        expect(() => new MeetingIDVO("asdaxxxdasfa")).toThrowError(InvalidMeetingIdError) // Non UUID string
        expect(() => new MeetingIDVO("666poxx6603d-7979-456a-876b21dbdae")).toThrowError(InvalidMeetingIdError) // Invalid length: 32
        expect(() => new MeetingIDVO("666poxx6603d4901-456a-876b21dbdaec")).toThrowError(InvalidMeetingIdError) // Missing a separator
        expect(() => new MeetingIDVO("696poxx6603d4901-456a-876b21dbdaec")).toThrowError(InvalidMeetingIdError) // Invalid hex-character: w
    })
    it("should create when no parameters are passed", () => {
        expect(new MeetingIDVO().id).not.toBe("")
    })
    it("should create when valid UUID is passed", () => {
        expect(new MeetingIDVO(randomUUID())).toBeInstanceOf(MeetingIDVO)
    })
})