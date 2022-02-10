export class LocationDTO {
  public latitude: number;

  public longitude: number;

  constructor(locationData: any) {
    this.latitude = locationData.latitude;
    this.longitude = locationData.longitude;
  }
}
