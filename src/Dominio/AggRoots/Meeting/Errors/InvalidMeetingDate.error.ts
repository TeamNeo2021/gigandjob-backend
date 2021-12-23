export class InvalidMeetingDate extends Error {
  
    static MeetingDateExpired() {
        return new InvalidMeetingDate("Date invalid, The date entered cannot be earlier than the current date")
    }
}
