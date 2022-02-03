import { InvalidMeetingLocationError } from "../../AggRoots/Meeting/Errors/InvalidMeetingLocation.error"
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO"

describe("Meeting Location",()=>{
    it("should fail when latitude is smaller than -90",()=>{
        expect(()=> new MeetingLocationVO(-100,56)).toThrowError(InvalidMeetingLocationError)
    }),
    it("should fail when latitude is bigger than 90",()=>{
        expect(()=> new MeetingLocationVO(100,56)).toThrowError(InvalidMeetingLocationError)
    }),
    it("should fail when longitude is smller than -180",()=>{
        expect(()=> new MeetingLocationVO(24,-200)).toThrowError(InvalidMeetingLocationError)
    }),
    it("should fail when longitude is bigger than 180",()=>{
        expect(()=> new MeetingLocationVO(24,200)).toThrowError(InvalidMeetingLocationError)
    }),
    it("should succeed when entering valid coordenates",()=>{
        expect(()=> new MeetingLocationVO(24,170))
    })

})