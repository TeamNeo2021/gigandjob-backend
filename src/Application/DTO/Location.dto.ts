class LocationDTO{ 


    public latitude: Number;
   
    public longitude: Number;

    constructor(
        locationData: any
    ){
        this.latitude = locationData.latitude;
        this.longitude = locationData.longitude;
    }
  
 
}