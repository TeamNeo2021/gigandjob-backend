export class InvalidMeetingLocationError extends Error {
    static coordinateNull() {
        return new InvalidMeetingLocationError("Coordinate cannot be null")
    }  
    static latitudeOutOfRange() {
        return new InvalidMeetingLocationError("Latitude is out of range, possible values [-90,90]")
    }  
    static longitudeOutOfRange() {
        return new InvalidMeetingLocationError("Longitude is out of range, possible values [-180,180]")
    }  
}
