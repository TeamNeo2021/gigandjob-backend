import {InvalidMeetingLocationError} from "../Errors/InvalidMeetingLocation.error";

export class MeetingLocationVO {
    private _latitude: number;
   
    private _longitude: number;
 

    constructor(latitude: number, longitude: number) {
        if( this.checkNull(latitude) && this.checkNull(longitude) && this.checkLatitude(latitude) && this.checkLongitude(longitude) ){

            this._latitude = latitude;
            this._longitude = longitude;
        }else{
             throw new Error('Invalid Location');
        }
    }

    //getters and setters

    public get latitude(): number {
        return this._latitude;
    }
    public set latitude(value: number) {
        this._latitude = value;
    }


    public get longitude(): number {
        return this._longitude;
    }
    public set longitude(value: number) {
        this._longitude = value;
    }

    
    checkNull(coord:number){
        if(coord != undefined){
            return true
        }else{
             // throw new Error('coordinate cannot be null');
             throw InvalidMeetingLocationError.coordinateNull();
        }
    }

    checkLatitude(coord:number){
        if(coord< -90 || coord>90){
            throw InvalidMeetingLocationError.latitudeOutOfRange();
            return false;
        }else{
            return true
        }

    }checkLongitude(coord:number){
        if(coord< -180 || coord>180){
            throw InvalidMeetingLocationError.longitudeOutOfRange();
            return false;
        }else{
            return true
        }

    }



}