import { InvalidOfferDirection } from "../Errors/InvalidOfferDirection.error";

export class OfferLocationVO {
  
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
      
    checkNull(coord:Number){
        if(coord != undefined){
            return true
        }else{
             // throw new Error('coordinate cannot be null');
             throw InvalidOfferDirection.coordinateNull();
        }
    }

    checkLatitude(coord:Number){
        if(coord< -90 || coord>90){
            throw InvalidOfferDirection.latitudeOutOfRange();
            return false;
        }else{
            return true
        }

    }checkLongitude(coord:Number){
        if(coord< -180 || coord>180){
            throw InvalidOfferDirection.longitudeOutOfRange();
            return false;
        }else{
            return true
        }

    }
}