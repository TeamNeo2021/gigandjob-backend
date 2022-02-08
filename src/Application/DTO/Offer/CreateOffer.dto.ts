import { LocationDTO } from "../Location.dto";

export class createOfferDTO {
    State: string;
    PublicationDate: Date;
    Rating: number;
    Direction: LocationDTO;
    Sector: string;
    Budget: number;
    Description: string;
    
    constructor(
        offerData: any){

        this.State = 'Active'
        this.PublicationDate = new Date();
        this.Rating = 0;
        this.Direction = new LocationDTO(offerData.Direction);
        this.Sector = offerData.Sector;
        this.Budget = offerData.Budget;
        this.Description = offerData.Description;
    
    }
}