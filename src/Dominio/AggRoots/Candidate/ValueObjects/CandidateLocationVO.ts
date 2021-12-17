export class CandidateLocationVO {
    private _latitude: Number;
   
    private _longitude: Number;
 

    constructor(latitude: Number, longitude: Number) {
        if( this.checkNull(latitude) && this.checkNull(longitude) && this.checkLatitude(latitude) && this.checkLongitude(longitude) ){

        
            this._latitude = latitude;
            this._longitude = longitude;
        }else{
             throw new Error('Invalid Location');
        }
    }

    //getters and setters

    public get latitude(): Number {
        return this._latitude;
    }
    public set latitude(value: Number) {
        this._latitude = value;
    }


    public get longitude(): Number {
        return this._longitude;
    }
    public set longitude(value: Number) {
        this._longitude = value;
    }

    
    checkNull(coord:Number){
        if(coord != undefined){
            return true
        }else{
             // throw new Error('coordinate cannot be null');
           console.log('coordinate cannot be null');
           return false;
        }
    }

    checkLatitude(coord:Number){
        if(coord< -90 || coord>90){
           // throw new Error('Latitude invalid, range from -90 to 90');
           console.log('Latitude invalid, range from -90 to 90');
            return false;
        }else{
            return true
        }

    }checkLongitude(coord:Number){
        if(coord< -180 || coord>180){
           // throw new Error('Longitude invalid, range from -180 to 180');
           console.log('Longitude invalid, range from -180 to 180');
            return false;
        }else{
            return true
        }

    }



}