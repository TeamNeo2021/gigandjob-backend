import { EmptyMeetingLocation } from "../../AggRoots/Meeting/Errors/EmptyMeetingLocation.error"
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO"

describe("Meeting Location",()=>{
    it("should not create when value_Meeting_location is empty",()=>{
        expect(()=>new MeetingLocationVO("")).toThrowError(EmptyMeetingLocation)
    })
    it(" Create when the value_Meeting_location is not empty ",()=>{
        expect(new MeetingLocationVO("Av. Teherán, Urb. Montalbán. Universidad Católica Andrés Bello.")).toBeInstanceOf(MeetingLocationVO)
    })
})